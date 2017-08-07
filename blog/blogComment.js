var tokenFuc = require('./testToken.js'),
    connection = require('./mysqlForServer.js'),
    moment = require('moment')
// 添加blog
const addBlogComment = (req, res) => {
    var token = req.cookies.token || '',
        userInfo = tokenFuc.getData(token),
        comment = req.body.comment,
        blogId = req.body.blogId,
        pid = req.body.pid,
        time = moment().format('YYYY-MM-DD HH:ss:mm')

    if (!userInfo) {
        res.json({
            code: -1,
            content: '',
            message: '您还没有登录信息，暂时无法评论。请在右侧登录后再评论。'
        })
    } else {
        let { name, description, headUrl, profileUrl, userSource, userUID } = userInfo

        let sql = 'INSERT INTO blogcomment (pid, blogId, commentUser, commentUserHead, commentUserUrl, commentUserDes, commentContent, userSource, userUID, createTime) VALUES (?,?,?,?,?,?,?,?,?,?);'
        connection.query(sql, [pid, blogId, name, headUrl, profileUrl, description, comment, userSource, userUID, time], (err, results) => {
            if (err) {
                res.json({
                    code: -1,
                    content: '',
                    message: 'sql_err'
                })
            } else {
                res.json({
                    code: 0,
                    content: '',
                    message: '添加成功'
                })
            }
        })
    }
}
// 获取blog
const getBlogComment = (req, res) => {
    var token = req.cookies.token || '',
        userInfo = tokenFuc.getData(token),
        blogId = req.params.blogId

    var sql = 'SELECT id, pid, commentUser, commentUserHead, commentUserUrl, commentUserDes, commentContent, userSource, userUID, createTime FROM blogcomment WHERE blogId = ? order by id DESC;'
    connection.query(sql, [blogId], (err, results) => {
        if (err) {
            res.json({
                code: -1,
                content: '',
                message: 'sql_err'
            })
        } else {
            results.map(d=> Object.assign(d, {
                isUser: userInfo && d.userUID == userInfo.userUID && d.userSource == userInfo.userSource,
                createdate: d.createTime,
                createTime: moment(d.createTime).format('YYYY年MM月DD日 HH:mm:ss')
            }))
            res.json({
                code: 0,
                content: results,
                message: '查询评论信息成功'
            })
        }
    })
}

// 删除评论
const deleteCommnet = (req, res) => {
    var token = req.cookies.token || '',
        userInfo = tokenFuc.getData(token)
        if(!userInfo) {
            res.json({
                code: -1,
                content: '',
                message: '没有登录'
            })
        }

    let id = req.query.id

    var sql = 'select count(id) as numbers from blogcomment where pid = ?'
    var sql2 = 'DELETE FROM blogcomment WHERE id = ? and userUID = ?;'
    connection.query(sql, [id], (err ,result) => {
        if(result.numbers) {
            res.json({
                code: -1,
                content: '',
                message: '该评论下已经有其他评论，暂时无法删除'
            })
        } else {
            connection.query(sql2, [id, userInfo.userUID], (err, result) => {
                if(result.affectedRows) {
                    res.json({
                        code: 0,
                        content: '',
                        message: '删除成功'
                    })
                } else {
                    res.json({
                        code: -1,
                        content: '',
                        message: '暂无数据'
                    })
                }
            })
        }
    })
}

module.exports = {
    get: getBlogComment,
    post: addBlogComment,
    delete: deleteCommnet
}
