var express = require('express');
var app = express(),
    path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.config'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    connection = require('./blog/mysqlForServer.js')


config.entry.unshift("webpack-hot-middleware/client")
var compiler = webpack(config)
// console.log(config)



app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static('public',{
    setHeaders: headFunction
}))

function headFunction(res, pathname) {
    if (path.dirname(pathname) == path.join(__dirname, './public/b')) {
        res.setHeader('Content-type', 'text/html; charset=utf-8')
    }
}

// 获取文章目录列表
app.get('/get_catalog/:blogId', (req, res) => {
    let blogId = req.params.blogId
    var sql = 'select catalog from myblog where blogId = ?'
    connection.query(sql, [blogId], (err, results) => {
        res.send(results[0].catalog)
    })
})



app.get('/*', (req, res) => {
    res.send('404 !!')
})




var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
