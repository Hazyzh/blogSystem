const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: [ 'antd/dist/antd.less', './blog/home/index.js'],
    output: {
        filename: 'js/home-bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    resolve:{
        alias: {
            Utils: path.resolve(__dirname, './blog/utils')
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, './public')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'hello world',
            inline: true,
            color: true,
            template: path.resolve(__dirname, './public/blog/index0.html'),
            filename: 'blog'
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development') }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(), // 按照引用程度来排序各个模块，引用的越频繁id就越短，达到减小文件大小的效果
        new webpack.BannerPlugin("Copyright Hazyzh All rights reserved.")
    ],
    module: {
        rules: [
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
                test: /.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
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
