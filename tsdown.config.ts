import { defineConfig } from 'tsdown';

export default defineConfig({
  shims: true,
  skipNodeModulesBundle: true,
  minify: true,
  dts: true,
  platform: 'browser',
  target: 'es2020',
  entry: ['./src/index.tsx', './src/maps/*.ts'],
  format: 'esm'
});
