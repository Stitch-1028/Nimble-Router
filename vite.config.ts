import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath, URL } from "node:url";
import path from "path";
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_APP_BASE,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~/": `${path.resolve(__dirname, "src")}/`,
      },
    },
    server: {
      host: "0.0.0.0",
    },
  };
});
