var fs = require('fs'),
    moment = require('moment'),
    connection = require('./mysql.js'),
    title = process.argv[2] || 'a new blog',
    nowtime = moment(),
    time = nowtime.format('YYYY年MM月DD日 HH:ss:mm'),
    fileName = nowtime.format('YYMMDDHHssmm'),
    sqltime = nowtime.format('YYYY-MM-DD HH:ss:mm')




connection.connect()
// 生成md文件
function generationFile() {
    var config = `{\n"title":"${title}",\n"keywords":"",\n"tags":"",\n"relationBlog":"",\n"time":"${time}"\n}\n\n`
    var sql = 'insert into myblog (title, blogId, time, generateFlag) VALUES (?, ?, ?, ?)'
    connection.query(sql, [title, fileName, sqltime, 0], (err, results, fields) => {
        if(err) throw err;
        // 写入文件
        fs.writeFile(`./md/${fileName}.md`, config, function(err) {
            if (!!err) {
                console.log('err!!!', err)
            } else {
                console.log(`\n************************************\n generation success !\n frist words is config for this blog \n open "md" dir, write you words in ${fileName}.md!\n hazyzh support.. Good luck to you\n At.${time}\n************************************\n`)
            }
        })

    })
    connection.end()
}

// 判断文件是否存在
fs.stat('./md', (err, stat) => {
    if (err) {
        console.log('there is no dir "md", now making .......')
        fs.mkdirSync('md')
    } else {
        if (!stat.isDirectory()) {
            fs.mkdirSync('md')
        }
    }
    generationFile()
})
