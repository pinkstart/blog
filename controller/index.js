// 展示首页页面
const showIndexPage = (req, res) => {
    // 使用render函数之前，一定要保证安装和配置了ejs模板引擎
    res.render('index', {})
}

module.exports = {
    showIndexPage
}