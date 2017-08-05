var jwt = require('jsonwebtoken')
const secret = 'haidai'
const options = {
    expiresIn: '7 days',
    audience: 'reader',
    subject: 'hazyzh'
}
// 生成token
function getToken(data) {
    let token = jwt.sign(
        data,
        secret,
        options
    )
    return token
}

// 获取token
function getData(token) {
    try {
        var decoded = jwt.verify(token, secret, options)
    } catch(err) {
        return null
    }
    return decoded
}

exports.getToken = getToken
exports.getData = getData
