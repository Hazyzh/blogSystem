var mysql = require('mysql')

var connection = mysql.createConnection({
        host: 'rm-wz9q5gati5vm67726o.mysql.rds.aliyuncs.com',
        user: 'root',
        password: 'Hou19910325',
        database: 'hazyzh'
    })

module.exports = connection
