var connection = require('./mysqlForServer.js'),
    moment = require('moment')

const getResInfo = (code, content, message, ...args) => {
    return Object.assign({
        code,
        content,
        message
    }, ...args)
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

const get_tags_blogs_info = (req, res) => {
	let { tags, pageNum = 1 } = req.query
	let searchTags = tags ?  'where ' + tags.split(',').map(d => `tags like '%${d}%'`).join('and ') : ''
	let sql = 'SELECT blogId,title,tags,time,catalog,readNumber FROM myblog ' + searchTags +'ORDER BY time DESC LIMIT ' + (pageNum - 1) * 10 + ',10;'
	let sql2 = 'SELECT count(blogId) AS total FROM myblog ' + searchTags
	connection.query(sql, (err,results) =>  {
		if (err) {
			console.log(err)
			res.json(getResInfo(-1, '', '数据库异常'))
		} else {
			connection.query(sql2, (err,results2) =>  {
				if (err) {
					console.log(err)
					res.json(getResInfo(-1, '', '数据库异常'))
				} else {
					console.log(results2[0])
					results.forEach(d=> d.nowtime = moment(d.time).format('MM月DD日 HH:mm:ss'))
					res.json(getResInfo(0, results, '查询成功', results2[0], req.query))
				}
			})
		}
	})
}

module.exports = {
    getLastest: get_lastest_blog,
    getTagsinfo: get_tags_info,
	getTagsBlogsList: get_tags_blogs_info
}
