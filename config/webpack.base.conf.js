const {getCssLoader} = require('./assets')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  CopyPlugin  =  require ( "copy-webpack-plugin" )
const {join, dir, distFolderName, publicFolderName} = require('./paths')
const  DuplicatePackageCheckerPlugin  =  require ( "duplicate-package-checker-webpack-plugin" ) ; 
const {DefinePlugin, IgnorePlugin} = require('webpack')
const tsconfigPathPlugin = require('tsconfig-paths-webpack-plugin')

// 配置
module.exports = {
    target: 'web',
    entry: {
        main: {
            import: join(dir, '/src', '/main.'),
            dependOn: ['assetsReact']
        },
        'assetsReact': ['react', '@hot-loader/react-dom']
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: join(dir, distFolderName),
        chunkFilename: 'js/chunk/[name].[contenthash].js',
        publicPath: '',
        clean: true
    },
    resolve: {
        alias: {
            '_src': join(dir, '/src'),
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 获取 tsconfig.json baseUrl、paths 进行路径编译
        plugins: [new tsconfigPathPlugin({
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        })]
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: 'assets/[hash][ext]'
                }
            },
            {
                test: /\.css/,
                use: getCssLoader(false)
            },
            {
                test: /\.less/,
                use: getCssLoader(true)
            },
            {
                test: /\.(ts|tsx)$/,
                use:[
                    'babel-loader',
                    'ts-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // 生成html
        new HtmlWebpackPlugin({
            inject: 'body',
            filename: join(dir, distFolderName, 'index.html'),
            template: join(dir, publicFolderName, 'index.html')
        }),
        // 复制静态资源
        new CopyPlugin({
            patterns: [
                {from: join(dir, publicFolderName, 'favicon.ico'), to: join(dir, distFolderName, 'favicon.ico')}
            ]
        }),
        // 警告重复
        new DuplicatePackageCheckerPlugin(),
        // 注入环境编码
        new DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        // 去除 moment 语言
        new IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment/,
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        }
    }
}