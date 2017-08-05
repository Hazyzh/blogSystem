const axios = require('axios'),
      tokenFuc = require('./testToken.js'),
      AppKey = '1475313306',
      AppSecret = '824fe5b7300f80e8654937dbcd7d80e0'


const getInfo = (req, res) => {
    var code = req.query.code,
        state = req.query.state
    // 如果没有就退出
    if(!code || !state) {
        res.json({
            code: -1,
            content: 'login err',
            message: 'err'
        })
    }

    var type = state.split(',')[0],
        uri = state.split(',')[1]

    if (type == 'weibo') {
        axios('https://api.weibo.com/oauth2/access_token', {
            method: 'post',
            params: {
                client_id: AppKey,
                client_secret: AppSecret,
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://www.hazyzh.com/oauth'
            }
        }).then(data=> {
            var { access_token, uid } = data.data
            axios('https://api.weibo.com/2/users/show.json', {
                params: {
                    access_token,
                    uid
                }
            }).then(data => {
                var content = data.data
                if(!content.error) {
                    let userInfo = {
                        name: content.name,
                        description: content.description,
                        headUrl: content.profile_image_url,
                        profileUrl: 'https://weibo.com/' + content.profile_url,
                        userSource: type,
                        userUID: content.id
                    }

                    let token = tokenFuc.getToken(userInfo)
                    console.log(token, type, uri)
                    res.cookie('token', token, { maxAge: 1000 * 3600 * 24 * 7, httpOnly: true })
                    res.redirect(uri)
                } else {
                    res.json({
                        code: -1,
                        content: '',
                        message: content.error
                    })
                }
            }).catch(err => {
                console.log(err)
                res.json({
                    code: -1,
                    content: '',
                    message: '用户信息信息获取失败'
                })
            })

        }).catch(err=> {
            console.log(err)
            res.json({
                code: -1,
                content: '',
                message: 'access_token获取失败'
            })
        })
    }

}

module.exports = getInfo
