import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

const DIR = __dirname;

export default defineConfig({
  root: ".",
  base: "",
  plugins: [
    react({
      include: "**/*.{ts,tsx}",
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      "@api": resolve(DIR, "src/api/"),
      "@components": resolve(DIR, "src/components/"),
      "@hooks": resolve(DIR, "src/hooks/"),
      "@pages": resolve(DIR, "src/pages/"),
      "@scss": resolve(DIR, "src/sass/"),
      "@typing": resolve(DIR, "src/typing/"),
    },
  },
});
