# VisionForge - Personalized AI Photo Generation Platform

Transform your photos with the power of AI! Vision Forge is your ultimate solution for creating/generating professional AI-generated photos, similar to the popular PhotoAI platform. Perfect for LinkedIn headshots, Instagram content, dating profile pictures, and professional portraits. Train AI model on your personal images and generate stunning, high-quality AI-generated photos within minutes.



#### ⭐DO NOT FORGET TO STAR THIS REPO⭐

## 🚀 Key Features  


- 🛠️ Complete SaaS built in modern Next.js
- 💻 Beautiful landing page included
- 🤖 Train AI model on your personal images
- 🖥️ Clean & intuitive event monitoring dashboard
- 🎯 AI-Powered Professional Photo Generation
- 🎨 Custom AI Model Training
- 💼 Professional LinkedIn Headshots
- 🌟 Clean, modern UI on top of shadcn-ui
- 📱 Social Media Content Generation
- 🎁 ...much more


## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI Integration:** Replicate AI API
- **Language:** TypeScript

## 🚀 Setup Instructions

### 1. Clone this Repository

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory. Check `.env.example` for required variables.

### 4. Supabase Database Setup

1. Create a new Supabase project
2. Create a new storage bucket named `generated_images`
3. Execute the SQL queries from `supabase-queries.md` in your Supabase SQL editor (You can also follow the tutorial video to setup the database)
4. Set up the database triggers and functions
5. Make sure to setup the right RLS policies (You can also follow the tutorial video to setup the RLS policies)

### 5. AI Model Links

Visit these links to set up your AI models:
- [Flux Dev LORA model trainer](https://replicate.com/ostris/flux-dev-lora-trainer/train)
- [Flux Dev Model](https://replicate.com/black-forest-labs/flux-dev)
- [Flux Schnell Model](https://replicate.com/black-forest-labs/flux-schnell)

### 6. Model Training Requirements

When training your custom model, ensure:
- 10-15 images in total
- Recommended breakdown for 12 images:
  - 6 face closeups
  - 3-4 half body closeups
  - 2-3 full body shots
- No accessories on face/head
- Different expressions, clothing, backgrounds
- 1:1 resolution (1048x1048 or higher)
- Images under 45MB total size

### 8. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see your app.

## 📦 Project Structure

```
├── app/                 # Next.js 15 app directory
├── components/         # React components
├── lib/               # Utility, Supabase & Stripe functions
├── public/            # Static assets
└── globals.css            # Global styles
```

If you have any question or want a custom build for your business, you can reach out to me via:

- E-mail : jayadithyareddy@gmail.com
