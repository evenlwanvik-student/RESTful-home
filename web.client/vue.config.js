module.exports = {
    configureWebpack:{
    }, 
    // Set up proxy to avoid CORS error when doing cross-domain requests
    devServer:{
        proxy: {
            '^/hue.api/*':{ //everything from root
                target: 'http://service.controller.hue',
                // Remove the hue.api prefix
                pathRewrite: {
                    '^/hue.api' : ''
                }
            },
        }
    }
  }