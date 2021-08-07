const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const  MiniCssPlugin = require('mini-css-extract-plugin')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        environment: {
            arrowFunction: false,
            destructuring: false,
            const: false,
            forOf: false
        }
    },
    plugins: [
        // 体积包大小管擦
       // new BundleAnalyzerPlugin(),
       new MiniCssPlugin({
            filename: 'styles/[name].[contenthash].css'
        })
    ]
})