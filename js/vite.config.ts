import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    compilerOptions: { customElement: true }
  })],
  build: {
    lib: {
      entry: "./src/lib/index.js",
      formats: ["es"],
      fileName: "lib"      
    },
    assetsDir: "../assets/dist",
    emptyOutDir: true,

    outDir: "../assets/dist"
  }
})
