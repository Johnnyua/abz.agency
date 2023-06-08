import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
        target: 'es2020'
    },
    optimizeDeps: {
        esbuildOptions : {
            target: "es2020"
        }
    },
    plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["md-linedivider"].includes(tag),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/variables.scss";`,
      },
    },
  },
});
