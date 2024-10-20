const webpack = require('webpack');

module.exports = {
  devServer: {
    port: 5119,
    proxy: {
      '/ecommerce': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        timeout: 5000,
        proxyTimeout: 5000,
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Add this line
      }),
    ],
  },
};