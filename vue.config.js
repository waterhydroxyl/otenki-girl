const path = require('path');
module.exports = {
  configureWebpack: {
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
