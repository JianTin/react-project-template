const {dir, join, distFolderName} = require('./paths')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const {HotModuleReplacementPlugin} = require('webpack')

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        open: true,
        openPage: 'index.html',
        hot: true,
        host: 'localhost',
        port: 9000,
        proxy: {
            '/api': 'http://localhost:4000'
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
