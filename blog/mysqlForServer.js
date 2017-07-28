var mysql = require('mysql')
var connection

function handleError () {
    connection = mysql.createConnection({
        host: 'rm-wz9q5gati5vm67726o.mysql.rds.aliyuncs.com',
        user: 'root',
        password: 'Hou19910325',
        database: 'hazyzh',
        port: 3306
    });

    //连接错误，2秒重试
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });
}

handleError();

module.exports = connection
