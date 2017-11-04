var express = require('express');
var app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multer = require('multer')

    // zidingyi
var connection = require('./blog/mysqlForServer.js'),
    socket = require('./blog/blogSocket.js'),
    getLoginInfo = require('./blog/loginOauth.js'),
    blogComment = require('./blog/blogComment.js'),
    blogHomepage = require('./blog/homePage.js')



if(process.env.NODE_ENV == 'development') {
    var webpack = require('webpack')
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        config = {}


    if(!process.env.NODE_HOME){
        config = require('./webpack.dev.config.js')
        config.entry.unshift("webpack-hot-middleware/client")
        var compiler = webpack(config)
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath,
            filename: 'b/170727133506',
            headers: { 'Content-type': 'text/html; charset=utf-8' },
            mimeTypes: { "text/html": [ " " ] }
        }))
    } else {
        config = require('./webpack.home.config.js')
        config.entry.unshift("webpack-hot-middleware/client")
        var compiler = webpack(config)

		app.use((req, res, next) => {
			console.log(req.path)
			if (req.path.startsWith('/blog')) req.url = '/blog'
			next()
		})

        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath,
            filename: '/blog',
            headers: { 'Content-type': 'text/html; charset=utf-8' },
            mimeTypes: { "text/html": [ " " ] }
        }))
    }
    app.use(webpackHotMiddleware(compiler))
}
// cookie
app.use(cookieParser())
// body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static('public',{
    setHeaders: headFunction
}))

function headFunction(res, pathname) {
    if (path.dirname(pathname) == path.join(__dirname, './public/b')) {
        res.setHeader('Content-type', 'text/html; charset=utf-8')

        var blogId = pathname.match(/\d+$/)[0],
            sql = 'UPDATE myblog SET readNumber = readNumber + 1 WHERE blogId = ?;'
        connection.query(sql, [blogId])
        console.log(blogId)
    }
}


// 获取文章目录列表
app.get('/get_catalog/:blogId', (req, res) => {
    let blogId = req.params.blogId
    var sql = 'select catalog, readNumber from myblog where blogId = ?'
    connection.query(sql, [blogId], (err, results) => {
        res.json(results && results[0])
    })
})


app.get('/oauth', getLoginInfo)

app.get('/blog_comment/:blogId', blogComment.get)
app.post('/blog_comment', blogComment.post)
app.delete('/blog_comment', blogComment.delete)
// 博客首页
app.get('/get_lastest_blog', blogHomepage.getLastest)
// 博客标签
app.get('/get_tags_info', blogHomepage.getTagsinfo)
// tags 页获取数据
app.get('/tags_blogs_list', blogHomepage.getTagsBlogsList)
app.get('/*', (req, res) => {
    res.send('404 !!')
})

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

socket(server)
