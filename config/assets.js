const  MiniCssPlugin = require('mini-css-extract-plugin')
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
