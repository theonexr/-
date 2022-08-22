module.exports = {
  css:{
    loaderOptions:{
      css:{},
      postcss:{
        Plugins:[ 
          require('postcss-px2rem')({
            remUnit:37.5
          })
        ] 
      }
    }
  }
}