import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: "index.html",
        sw: "sw.ts", // Service Worker are un entry separat
      },
      output: {
        entryFileNames: "[name].js", // JS fără hash
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]", // CSS și alte asset-uri fără hash
      },
    },
    outDir: "dist",
  },
  plugins: [
    deno(),
    preact(),
  ],
})
