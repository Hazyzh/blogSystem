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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'hello world',
            inline: true,
            color: true,
            template: path.resolve(__dirname, './public/b/170720113848')
        }),
        new webpack.HotModuleReplacementPlugin(),
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
            }
        ]
    }
}
