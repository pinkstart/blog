const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'blogdata',
    user: 'root',
    password: 'root'
});

// 把当前模块中创建的conn数据库连接对象，暴露出去
module.exports = conn