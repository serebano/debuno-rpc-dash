import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import preact from '@preact/preset-vite'
// import config from "./src/config.ts";
import pkg from './deno.json' with {type: 'json'}

import { build } from './manifest.ts'
await build()

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    open: true,
    port: 4522 // dev => 4 5 22 
  },
  esbuild: {
    define: {
      DASH_VERSION: `"${pkg.version}"`,
      RPC_ENV: `"${process.env.RPC_ENV || "prod"}"`
    }
  },
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
