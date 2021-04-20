// @ts-nocheck
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig((params) => {
  // const { command, mode } = params;
  // command: serve | build
  // mode: development | production

  return {
    // root: process.cwd(),
    base: './',
    // mode: params.mode,
    // define: ,
    plugins: [vue()],
    // publicDir: 'public',
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, 'src'),
        '/@/types': path.resolve(__dirname, 'types'),
      },
      // dedupe: [],
      // conditions: [],
      // mainFields: [],
      // extensions: [],
    },
    css: {
      // modules
      // postcss
      // preprocessorOptions: {
      //   less: {
      //     javascriptEnabled: true,
      //     additionalData: '@import "./src/assets/style/theme.less";', // 全局 style 引入主题变量
      //   },
      // },
    },
    json: {
      // namedExports
      // stringify
    },
    // esbuild
    // assetsInclude
    // logLevel
    // clearScreen
    server: {
      host: 'localhost',
      port: 3000,
      strictPort: false,
      // https: true,
      open: false, // boolean | string
      proxy: {
        '^/api/.*': {
          target: 'http://127.0.0.1:4000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
      // cors: true,
      // force: false,
      // hmr: true,
      // watch: {},
    },
    build: {
      // target: 'modules',
      // polyfillDynamicImport: true,
      // outDir: 'dist',
      // assetsDir: 'assets',
      // assetsInlineLimit: 4096,
      // cssCodeSplit: true,
      sourcemap: false,
      // rollupOptions: {},
      // commonjsOptions: {},
      // lib: {},
      // manifest: false,
      // minify: 'terser',
      // terserOptions: {},
      // cleanCssOptions: {},
      // write: true,
      // emptyOutDir: true,
      // brotliSize: true,
      // chunkSizeWarningLimit: 500,
    },
    optimizeDeps: {
      // entries: [],
      // exclude: [],
      // include: [],
    },
  };
});
