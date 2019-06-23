const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')

app.use('/node_modules', express.static('node_modules'))


app.get('/', (req, res) => {
    res.render('index', {})
})

// 注册
app.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})

//登录
app.get('/login', (req, res) => {
    res.render('./user/login.ejs', {})
})


// 注册新用户
app.post('/register', (req, res) => {
    // 1.接受前端发送的post请求信息
    // 2.对前端发送的参数进行解析
    // 3.对参数进行校验，合法性，是否重复
    // 4.往数据库添加用户名
})

app.listen(3000, () => {
    console.log("服务器运行成功……")
})