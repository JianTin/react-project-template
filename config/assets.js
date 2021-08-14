const  MiniCssPlugin = require('mini-css-extract-plugin')
const {networkInterfaces} = require('os')
// 是否是 production
function modeEnvIsPro(){
    return process.env.NODE_ENV === 'production'
}

// 获取css的loader
exports.getCssLoader = function(isLess){
    const loaderUse = [
        modeEnvIsPro() ? {
            loader: MiniCssPlugin.loader,
            options:{ publicPath: '../' } 
        } : 'style-loader',
        {
            loader: 'css-loader',
            options: { importLoaders: 1 }
        }, 
        'postcss-loader'
    ]
    isLess ? loaderUse.push('less-loader') : ''
    return loaderUse
}

// 获取dev环境的post
exports.getDevPost = function(){
    let post = 'localhost'
    // 去除网络接口 key，合并为一个数组，去除多维数组
    const networkArray = Object.values(networkInterfaces()).flat()
    for(let key in networkArray){
        const {address, family} = networkArray[key]
        if(address !== '127.0.0.1' && family === 'IPv4'){
            post = address
            break
        }
    }
    return post
}
