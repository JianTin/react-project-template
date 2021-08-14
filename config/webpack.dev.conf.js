const {dir, join, distFolderName} = require('./paths')
const {getDevPost} = require('./assets')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const {HotModuleReplacementPlugin} = require('webpack')

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        open: true,
        openPage: 'index.html',
        hot: true,
        host: getDevPost(),
        port: 9000,
        proxy: {
            '/api': 'http://...'
        },
        contentBase: join(dir, distFolderName),
        compress: true,
        watchOptions: {
            ignored: /dist/
        },
        historyApiFallback: true
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ]
})
