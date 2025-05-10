import { appTools, defineConfig } from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
import { koaPlugin } from '@modern-js/plugin-koa';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  bff: {
    enableHandleWeb: process.env.NODE_ENV === 'production',
  },
  server: {
    port: 8890,
  },
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    bffPlugin(),
    koaPlugin(),
    polyfillPlugin(),
    tailwindcssPlugin(),
  ],
  tools: {
    sass: {
      sassOptions: {
        silenceDeprecations: ['global-builtin', 'import'],
      },
    },
    rspack(config, context) {
      context.appendPlugins([
        new SemiRspackPlugin({
          theme: '@semi-bot/semi-theme-automap',
          cssLayer: true,
        }),
      ]);
    },
  },
});
