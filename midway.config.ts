// eslint-disable-next-line node/no-unpublished-import
import vue from '@vitejs/plugin-vue';
import { defineConfig } from '@midwayjs/hooks-kit';

export default defineConfig({
  source: './app',
  vite: {
    server: {
      host: '0.0.0.0',
    },
    plugins: [vue()],
  },
});
