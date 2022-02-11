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
        '^/myApi': {
          target: 'http://20.205.107.234:8002',
          // target: 'http://localhost:8002',
          pathRewrite: {
            '^/myApi': '',
          },
          changeOrigin: true,
        },
      },
    },
    optimization: {
      // chunkIds: 'natural', // 文件名称尽可能短，也会是序号类型
      splitChunks: {
        chunks: 'all',
        minSize: 20000, // 拆分的每个包不小于20kb
        maxSize: 20000, // 体积大于设置的值的包要去拆分开包
        minChunks: 1, // 包如果要拆分，则必须要至少引用一次
        cacheGroups: {
          syVendors: {
            test: /[\\/]node_modules[\\/]/, // 对目录内文件进行单独打包拆分，且放入一个文件中 vender
            filename: 'js/[id]_verdor.js', // 最终名字
            priority: -10, // 都满足时候的优先级，越高月用
          },
        },
      },
    },
  },
};
