"use server"

import { array, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageGenerationformSchema } from "@/components/image-generation/Configurations"
import Replicate from "replicate";
import { createClient } from "@/lib/supabase/server";
import { Database } from "../../../database.types";
import { imageMeta } from "image-meta"
import { randomUUID } from "crypto";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  useFileOutput: false
});

interface ImageResponse {
  error: string | null,
  data: any | null,
  success: boolean
}

export async function generateImageAction(input: z.infer<typeof ImageGenerationformSchema>): Promise<ImageResponse> {

  const modelInput = {
    prompt: input.prompt,
    go_fast: true,
    guidance: input.guidance,
    megapixels: "1",
    num_outputs: input.num_outputs,
    aspect_ratio: input.aspect_ratio,
    output_format: input.output_format,
    output_quality: input.output_quality,
    prompt_strength: 0.8,
    num_inference_steps: input.num_inference_steps
  };

  try {
    const output = await replicate.run(input.model as `${string}/${string}`, { input });
    return {
      success: true,
      error: null,
      data: output
    }
  }
  catch (error: any) {
    return {
      error: error.message || 'Failed to generate image',
      success: false,
      data: null
    }
  }
}

export async function imgUrlToBlob(url: string) {
  const response = fetch(url);
  const blob = (await response).blob();
  return (await blob).arrayBuffer();
}

type storeImageInput = { url: string } & Database["public"]["Tables"]["generated_images"]["Insert"]


export async function storeImages(data: storeImageInput[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: 'Unauthorised',
      success: false,
      data: null
    }
  }
  const uploadResults = []
  for (const img of data) {
    const arrayBuffer = await imgUrlToBlob(img.url);
    const { width, height, type } = imageMeta(new Uint8Array(arrayBuffer))

    const fileName = `image${randomUUID()}.${type}`
    const filePath = `${user.id}/${fileName}`

    const { } = await supabase.storage.from('generated_images').upload(
      filePath, arrayBuffer, {
      contentType: `image/${type}`,
      cacheControl: '3600',
      upsert: false
    }
    )
    //storage error


    await supabase.from('generated_images').insert([{
      user_id: user.id,
      model: img.model,
      prompt: img.prompt,
      aspect_ratio: img.aspect_ratio,
      guidance: img.guidance,
      num_inference_steps: img.num_inference_steps,
      output_format: img.output_format,
      image_name: fileName,
      width,
      height
    }]).select()

  }
}

export async function getImages(limit?: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: 'Unauthorised',
      success: false,
      data: null
    }
  }
  let query = await supabase.from('generated_images').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  // if(limit){
  //   query = await query.limit(limit)
  // }


  const { data, error } = await query;

  if (error) {
    return {
      error: error.message || 'Failed to fetch images',
      success: true,
      data: null
    }
  }

  const imageWithUrls = await Promise.all(
    data?.map(async (image: Database["public"]["Tables"]["generated_images"]["Row"]) => {
      const { data } = await supabase.storage.from('generated_images').createSignedUrl(`${user.id}/${image.image_name}`, 3600)
      return {
        ...image,
        url: data?.signedUrl
      }
    })
  )

  if (!error) {
    return {
      error: null,
      success: true,
      data: imageWithUrls || null
    }
  }

}

export async function deleteImage(id: number, image_name:string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: 'Unauthorised',
      success: false,
      data: null
    }
  }
  const {data,error} = await supabase.from('generated_images').delete().eq('id',id);
  if(error){
    return {
      error:error.message,
      success:false,
      data:null
    }
  }
await supabase
  .storage
  .from('avatars')
  .remove([`${user.id}/${image_name}`])

  //implement deletion from storage
  //await supabase.storage.from('generated_images').remove([`${user.id}/${fileName}`])



  return{
    error:null, success:true, data:data
  }
}
