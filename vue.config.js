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
  }
}
