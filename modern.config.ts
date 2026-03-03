import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';

export default defineConfig({
  bff: {
    enableHandleWeb: process.env.NODE_ENV === 'production'
  },
  server: {
    port: 8890
  },
  source: {
    include: [/node_modules[\\/](i18next|react-i18next|i18next-browser-languagedetector)[\\/]/]
  },
  plugins: [appTools(), bffPlugin(), polyfillPlugin()],
  tools: {
    sass: {
      sassOptions: {
        silenceDeprecations: ['global-builtin', 'import']
      }
    },
    rspack: {
      plugins: [
        new SemiRspackPlugin({
          theme: '@semi-bot/semi-theme-automap'
        })
      ]
    }
  },
  output: {
    polyfill: 'ua'
  }
});
