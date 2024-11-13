import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf("node_modules") !== -1) {
            const basic = id.toString().split("node_modules/")[1];
            const sub1 = basic.split("/")[0];
            if (sub1 !== ".pnpm") {
              return sub1.toString();
            }
            const name2 = basic.split("/")[1];
            return name2.split("@")[name2[0] === "@" ? 1 : 0].toString();
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});