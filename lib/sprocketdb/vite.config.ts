import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://f004.backblazeb2.com/file/sprocket-artifacts/public/pages/assets/sprdb",
  build: {
    lib: {
      entry: "./src/index.ts",
      formats: ["es"],
      fileName: "sprdb",
    },
    emptyOutDir: true,

    outDir: "../../assets/sprdb",
  },
});
