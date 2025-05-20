import { appTools, defineConfig } from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
import { koaPlugin } from '@modern-js/plugin-koa';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';
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
  source: {
    include: [
      /node_modules[\\/](i18next|react-i18next|i18next-browser-languagedetector)[\\/]/,
    ],
  },
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
    bffPlugin(),
    koaPlugin(),
    polyfillPlugin(),
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
        }),
      ]);
    },
  },
  output: {
    polyfill: 'ua',
  },
});
