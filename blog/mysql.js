var mysql = require('mysql')

var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'hou123',
        database: 'hazyzh'
    })

module.exports = connection
