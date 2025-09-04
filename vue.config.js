// vue.config.js
module.exports = {
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: "http://39.97.33.178",
        changeOrigin: true,
        allowedHosts:'all'
      }  
    }
  }
}

