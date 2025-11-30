import { defineConfig } from 'electron-vite';
import { defineConfig as defineViteConfig } from 'vite';
import { resolve } from 'path';
import viteCp from 'vite-plugin-cp';
import unpluginOxlint from 'unplugin-oxlint/vite';
import viteZipPack from 'unplugin-zip-pack/vite';
import Plugin from './package.json';

const SRC_DIR = resolve(__dirname, './src');
const OUTPUT_DIR = resolve(__dirname, './dist');

const BaseConfig = defineViteConfig({
  root: __dirname,
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
});

const ConfigBuilder = (type: 'main' | 'preload') => defineViteConfig({
  ...BaseConfig,

  plugins: [
    unpluginOxlint({
      includes: ['src/**/*.js', 'src/**/*.ts'],
      fix: true,
    }),
  ],
  build: {
    minify: true,
    outDir: resolve(OUTPUT_DIR, `./${type}`),
    lib: {
      entry: resolve(SRC_DIR, `./${type}/index.ts`),
      formats: [ 'cjs' ],
      fileName: () => 'index.js',
    },
  },
});

export default defineConfig({
  main: ConfigBuilder('main'),
  preload: ConfigBuilder('preload'),
  renderer: defineViteConfig({
    ...BaseConfig,

    plugins: [
      unpluginOxlint({
        includes: ['src/**/*.js', 'src/**/*.ts'],
        fix: true,
      }),
      viteCp({
        targets: [
          { src: './package.json', dest: 'dist' },
          { src: './src/settings/static/icon.svg', dest: 'dist/static' },
        ],
      }),
      viteZipPack({
        in: OUTPUT_DIR,
        out: resolve(__dirname, `./${Plugin.name}.zip`),
      }),
    ],
    build: {
      minify: 'esbuild',
      outDir: resolve(OUTPUT_DIR, './renderer'),
      lib: {
        entry: resolve(SRC_DIR, './renderer/index.ts'),
        formats: [ 'cjs' ],
        fileName: () => 'index.js',
      },
      rollupOptions: {
        input: resolve(SRC_DIR, './renderer/index.ts'),
      },
    },
  }),
});