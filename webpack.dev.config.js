const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: ['./blog/src/index.js'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, './public')
    },
    plugins: {
        new HtmlWebpackPlugin({
            title: 'hello world',
            inline: true,
            color: true,
            template: path.resolve(__dirname, './public/b/170727133506')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(), // 按照引用程度来排序各个模块，引用的越频繁id就越短，达到减小文件大小的效果
        new webpack.BannerPlugin("Copyright Hazyzh All rights reserved.")
    },
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
                                require('autoprefixer')({browsers: ['last 2 versions']})
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
            }
        ]
    }
}
