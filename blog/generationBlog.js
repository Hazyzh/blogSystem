var fs = require('fs'),
    ejs = require('ejs'),
    marked = require('marked'),
    connection = require('./mysql.js'),
    renderer = new marked.Renderer()

    marked.setOptions({
        highlight: function (code) {
            return require('highlight.js').highlightAuto(code).value;
        },
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    })


var mds = fs.readdirSync('md'),
    template = fs.readFileSync('./blog/template.html', 'utf-8'),
    fileLength = 0

    // console.log(mds)

// 判断文件是否存在
function gendir(name, callback) {
    fs.stat('./public', (err, stat) => {
        if (err) {
            console.log('there is no dir "public", now making .......')
            fs.mkdirSync('public')
            fs.mkdirSync('public/b')
        } else {
            if (!stat.isDirectory()) {
                fs.mkdirSync('public')
                fs.mkdirSync('public/b')
            } else {
                if(!fs.existsSync('./public/b')){
                    fs.mkdirSync('public/b')
                }
            }
        }
        callback(name)
    })
}

// 生成文件
function generationHtml(fileName) {
    fileLength--
    let newstate = fileLength
    // mard 渲染标题规则
    let headInfo = [],
        index1 = 0,
        index2 = 0,
        count = 0
    renderer.heading = function(text, level) {
        if(level == 3) {
            headInfo.push({
                id: `#hazyzh-h3-${++index1}`,
                text: text,
                children: []
            })
        } else if (level == 4) {
            let last = headInfo[headInfo.length - 1]
            last && last.children.push({
                id: `#hazyzh-h4-${++index2}`,
                text: text
            })
        } else {
            return `<h${level}>${text}</h${level}>`
        }
        return `<h${level} id="hazyzh-h${level + '-' + (level == 3 ? index1 : index2)}">${text}</h${level}>`
    }

    fs.readFile('./md/'+fileName, 'utf-8', (err, data) => {
        let reg = /^{(.|\n)*?}/
        var config = JSON.parse(reg.exec(data)[0]),
            mdStr = data.replace(reg, ''),
            content = marked(mdStr, {renderer: renderer}),
            output = ejs.render(template, {
                content,
                config
            }),
            catalog = JSON.stringify(headInfo)

        let mysql = 'update myblog set title=?,keywords=?,tags=?,relationBlog=?,generateFlag=1,catalog=? where blogId=?'
        connection.query(mysql, [config.title, config.keywords, config.tags, config.relationBlog, catalog, fileName.split('.')[0]], (err, results) => {
            if(err) throw err
            console.log('mysql has change ****', newstate)
            if(newstate == 0) {connection.end()}
        })

        fs.writeFile(`./public/b/${fileName.split('.')[0]}`, output, (err) => {
            if(!err) {
                console.log(`${fileName} has parsed !`)

            } else {
                console.log(err)
            }
        })
    })
}


// 数据库查询
connection.connect()

var sql = 'select blogId from myblog where id = 4'
// var sql = 'select blogId from myblog'

connection.query(sql, (err, results) => {
    if(err) throw err

    // console.log(results, mds)

    var execSql = results.map(d=> d.blogId)
    var execMds = mds.filter(d => execSql.indexOf(d.split('.')[0]) !== -1 )

    fileLength = execMds.length
    console.log(`here has ${fileLength} file need parse........`);
    if(fileLength==0) {connection.end()}

    execMds.forEach(d=>{
        // console.log(d)
        gendir(d, generationHtml)
    })
})
