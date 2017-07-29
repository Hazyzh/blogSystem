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
    externals: {
        'react': 'React',
        'react-dom':'ReactDOM'
    },
    // devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, './public')
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'hello world',
        //     inline: true,
        //     color: true,
        //     // template: path.resolve(__dirname, './public/b/170720113848')
        //     // template: path.resolve(__dirname, './blog/template.html')
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(), // 按照引用程度来排序各个模块，引用的越频繁id就越短，达到减小文件大小的效果
        new webpack.optimize.UglifyJsPlugin({  // 用于压缩输出js代码
            compress: {
                warnings: false,
                drop_console: true
            }
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
            }
        ]
    }
}
