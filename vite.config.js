import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";
import { exec } from "child_process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sitemap(), react(), splitVendorChunkPlugin()],
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
});

function sitemap() {
  exec("npm run sitemap", (_, output, err) => {
    if (output) console.log(output);
    if (err) console.log(err);
  });
}