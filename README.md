<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/22a510cd-9ba6-4825-9d33-8b22ea34f16e

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (optional)
3. Run the app:
   `npm run dev`

## Deploy to Vercel

This repository is pre-configured for Vercel deployment with [vercel.json](vercel.json), SPA client-side routing, and Vercel Analytics & Speed Insights.

### Option 1: Via Vercel CLI (Quickest)
```bash
# Preview deployment
npm run deploy

# Production deployment
npm run deploy:prod
```

### Option 2: Via GitHub / Vercel Dashboard
1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the `khatti-cafe` repository.
4. Framework Preset will be automatically detected as **Vite**.
   - Build Command: `vite build`
   - Output Directory: `dist`
5. Click **Deploy**.

