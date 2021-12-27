const path = require('path');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@assets': path.resolve(__dirname, 'src/assets'),
      },
    },
    devServer: {
      proxy: {
        '^/wearherApi': {
          target: 'http://flash.weather.com.cn/wmaps/xml',
          pathRewrite: {
            '^/wearherApi': '',
          },
          changeOrigin: true,
        },
      },
    },
  },
};
