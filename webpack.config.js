const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: ['./blog/src/index.js'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
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
        new ExtractTextPlugin({
          filename: path.resolve(__dirname,'css/[name].[contenthash].css')
        }),
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
                use: [
                    'style-loader',
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
