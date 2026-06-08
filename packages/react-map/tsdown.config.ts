import { defineConfig } from "tsdown";

export default defineConfig({
  minify: true,
  dts: true,
  platform: "browser",
  target: "es2020",
  entry: ["./src/index.tsx", "./src/maps/*.ts"],
  format: "esm",
});
