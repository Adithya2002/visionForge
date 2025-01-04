import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
    try {

        //checking for replicate token
        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error("Replicate api token not present")
        }

        //connecting with supabase and checking if user is logged in 
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json(
                {
                    error: "Unauthorised user"
                },
                {
                    status: 401
                }
            )
        }

        //getting form data which was passed in the POST request
        const formData = await request.formData()

        //storing it in a input variable
        const input = {
            fileKey: formData.get("fileKey") as string,
            modelName: formData.get("modelName") as string,
            gender: formData.get("gender") as string
        }
        if (!input.fileKey || !input.modelName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        //using supabase to create a signed URL for a file already existing in supabase and removing the "training_data/" from file name
        const fileName = input.fileKey.replace("training_data/", "")
        const { data: fileUrl } = await supabaseAdmin.storage.from("training_data").createSignedUrl(fileName, 3600)
        if (!fileUrl?.signedUrl) {
            throw new Error("failed to get new URL")
        }

        //create and access replicate
        const modelId = `${user.id}_${Date.now()}_${input.modelName.toLowerCase().replace(/ /g, "_")}`
        console.log(modelId)

        await replicate.models.create("adithya2002", modelId, {
            hardware: "gpu-a100-large",
            visibility: "private"
        })
        const training = await replicate.trainings.create(
            "ostris",
            "flux-dev-lora-trainer",
            "e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497",
            {
              destination: `adithya2002/${modelId}`,
              input: {
                steps: 800,
                resolution: "1024",
                input_images: fileUrl.signedUrl,
                trigger_word: "hdsht"
              }
            }
          );

        return NextResponse.json(
            { success: true },
            { status: 201 }
        )
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to start model training", },
            { status: 500 }
        )

    }



}