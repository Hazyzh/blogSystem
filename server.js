var express = require('express');
var app = express(),
    path = require('path')

app.use(express.static('public',{
    setHeaders: headFunction
}))

function headFunction(res, pathname) {
    if (path.dirname(pathname) == path.join(__dirname, './public/b')) {
        res.setHeader('Content-type', 'text/html; charset=utf-8')
    }
}


app.get('*', (req, res) => {
    res.send('404 !!')
})

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
