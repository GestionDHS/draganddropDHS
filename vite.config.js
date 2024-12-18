import { defineConfig } from "vite";
import { resolve } from "path";
const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
/*saco la base
root:"src"
outDir:"../dist"
*/
export default defineConfig({
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "/index.html",
        act01: "/pages/act001/act.html",
      },
    },
  },
  assetsDir: "img",
//   assetsInclude: [
//     "./interprete/acorn.js",
//     "./interprete/interpreter.js",
//     "**/*.css?type=text/css",
//   ],
});
