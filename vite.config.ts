import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'


// const pwa =  VitePWA({
//   registerType: 'autoUpdate',

//   devOptions: {
//     enabled: true,
//   }
// })

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // pwa,
    deno(),
    preact(),
  ],
})
