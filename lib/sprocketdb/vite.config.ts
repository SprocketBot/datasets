import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://sprocket-public-datasets.nyc3.cdn.digitaloceanspaces.com/datasets/public/pages/assets/sprdb",
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
