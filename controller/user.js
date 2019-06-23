const moment = require('moment')
    // 导入数据库操作
const conn = require('../db/index.js')

// 注册
const showRegisterPage = (req, res) => {
    res.render('./user/register.ejs', {})
}

// 登录
const showLoginPage = (req, res) => {
    res.render('./user/login.ejs', {})
}

// 注册新用户的请求处理函数
const reg = (req, res) => {
    // TOOD:判断用户注册的业务逻辑
    const body = req.body
    console.log(body);

    // 判断用户输入的数据是否完整
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请填写完整的表单数据后再注册用户！', status: 501 })
    }

    // 查询用户名是否重复
    const sql1 = 'select count(*) as count from users where username=?'

    conn.query(sql1, body.username, (err, result) => {
        // 如果查询失败，则告知客户端失败
        if (err) return res.send({ msg: '用户查询失败', statue: 502 })
            // console.log(result);

        if (result[0].count !== 0) return res.send({ msg: '请更新其他用户名后重新注册!', status: 503 })

        // 执行注册的业务逻辑
        body.ctime = moment().format('YYY--MM--DD HH:mm:ss')
        const sql2 = 'insert into users set ?'
        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '注册新用户失败！', status: 504 })
            if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败！', status: 505 })
            res.send({ msg: '注册新用户成功', status: 200 })
        })
    })

}

// 登录的请求处理函数
const login = (req, res) => {
    // 1.获取到表单中的数据
    const body = req.body

    // 2.执行sql语句，查询用户是否存在
    const sql1 = 'select * from users where username=? and password=?'
    conn.query(sql1, [body.username, body.password], (err, result) => {

        // 如果查询期间，执行sql语句失败，则认为登录失败
        if (err) return res.send({ msg: '用户登录失败', status: 501 })

        // 如果查询的结果，记录条数不为1，则证明查询失败
        if (result.length !== 1) return res.send({ msg: '用户登录失败', status: 502 })
            // 查询成功
        return res.send({ msg: 'ok', status: 200 })
    })
}

module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    login
}