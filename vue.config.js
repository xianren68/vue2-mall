// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave:false,//关闭语法检查
  productionSourceMap:false,
  devServer:{
    proxy:{
      '/api':{
        target:"http://gmall-h5-api.atguigu.cn"
      }
    }
  }
}
