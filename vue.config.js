// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api/h5': {
        // target: 'http://localhost:10008', // 本地后端测试地址
        target: 'xxxxxxx', // 线上后端地址
        changeOrigin: true,
        secuer: false
      },
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? "/lottery" : "/"
}
