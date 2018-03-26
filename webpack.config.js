const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// css 打包出来
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLESS = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true
})

// 自己博客的路径
const myblogPath = path.resolve('/Users/harry.hou/Desktop/hazyzh/myblog/hazy')

module.exports = {
    entry: {
        bundle: './blog/src/index.js',
        homePage: './blog/home/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: myblogPath,
        publicPath: '/'
    },
    resolve:{
        alias: {
            Utils: path.resolve(__dirname, './blog/utils')
        }
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'antd': 'antd'
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, './public')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({  // 用于压缩输出js代码
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        extractLESS,
        new webpack.BannerPlugin("Copyright Hazyzh All rights reserved.")
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /.less$/,
                use: extractLESS.extract({
                fallback: 'style-loader',
                  use: [
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require('autoprefixer')({browsers: ['last 5 versions']})
                            ]
                        }
                    },
                    'less-loader'
                  ]
                })
            },
            {
                test: /.(png|jpg|svg|gif)$/i,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ],
            }
        ]
    }
}
