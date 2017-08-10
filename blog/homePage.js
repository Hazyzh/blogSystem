var connection = require('./mysqlForServer.js'),
    moment = require('moment')

const getResInfo = (code, content, message) => {
    return {
        code,
        content,
        message
    }
}

const get_lastest_blog = (req, res) => {
    let sql = 'SELECT blogId,title,tags,time,catalog,readNumber FROM myblog ORDER BY time DESC LIMIT 10;'
    connection.query(sql, (err,results) =>  {
        if (err) {
            res.json(getResInfo(-1, '', '数据库异常'))
        } else {
            results.forEach(d=> d.nowtime = moment(d.time).format('MM月DD日 HH:mm:ss'))
            res.json(getResInfo(0, results, '查询成功'))
        }
    })
}

const get_tags_info = (req, res) => {
    let sql = 'SELECT tagsInfo FROM tagsinfo where id = 1'
    connection.query(sql, (err,results) =>  {
        if (err) {
            res.json(getResInfo(-1, '', '数据库异常'))
        } else {
            res.json(getResInfo(0, results[0], '查询成功'))
        }
    })
}

module.exports = {
    getLastest: get_lastest_blog,
    getTagsinfo: get_tags_info
}
