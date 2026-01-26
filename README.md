# Omotailor 3D Fashion E-Commerce MVP

A premium, interactive 3D fashion demo built with Next.js, React Three Fiber, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Customization Guide

### 1. Replacing Images
All images are located in the `public/assets` directory.
- **Logo**: Replace `public/assets/logo.png`.
- **Products**: Replace images in `public/assets/images/`. The filenames should match those referenced in `src/data/products.ts`.
- **Optimization Tip**: Use WebP format for fast loading times.

### 2. Swapping 3D Models
The 3D viewer supports `.glb` and `.gltf` files.
- Update the `model3D` field in `src/data/products.ts` with the path to your new model (either a URL or a local path in `public/assets/models/`).
- The `<Product3DViewer>` component in `src/components/Product3DViewer.tsx` can be adjusted for scale, lighting, and initial rotation.

### 3. Customizing Colors & Fonts
This project uses **Tailwind CSS v4**. Customization is handled in `src/app/globals.css` within the `@theme` block:
- **Colors**: Update `--color-gold`, `--color-charcoal`, etc.
- **Typography**: Change the `--font-heading` and `--font-body` variables.
- **CSS Variables**: Global variables for background and foreground are in the `:root` block.

## 🚀 Next Steps for Production
To transform this MVP into a full-scale production application, consider the following:
1. **Backend Integration**: Replace the dummy `products.ts` with a real API (e.g., Next.js Route Handlers + Database like Supabase or PostgreSQL).
2. **Authentication**: Implement user accounts and order history (using NextAuth.js or Clerk).
3. **Payment Processing**: Integrate Stripe or PayPal into the Checkout flow.
4. **CMS Integration**: Use a headless CMS (Sanity, Contentful) to manage product listings and 3D assets dynamically.
5. **Real 3D Avatars**: Integrate AI tools to generate 3D models of the users themselves for "Virtual Try-On".

## 📦 Deployment
The easiest way to deploy is using [Vercel](https://vercel.com):
1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. It will automatically detect Next.js and deploy your site.

---
*Created for the Omotailor client presentation Demo.*
