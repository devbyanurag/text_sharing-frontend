import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

// Define the manifest file with the correct type
const manifestFile: Partial<VitePWAOptions> = {
  registerType: "prompt", // this is valid
  includeAssets: ["favicon.ico", "apple-touch-icon.png"],
  manifest: {
    name: "My PWA App",
    short_name: "My PWA",
    description: "My amazing Progressive Web App!",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },

      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#181818",
    background_color: "#c2edcf",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      ...manifestFile,
      devOptions: {
        enabled: true, // Ensure PWA is enabled in development mode
        // You can add more options if needed
      },
    }),
  ],
});
