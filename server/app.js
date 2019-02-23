var createError = require('http-errors'); // 在访问一个站点的时候，如果访问的地址不存在（404），或服务器内部发生了错误（500），往往会展示给我们某个特定的页面
var express = require('express');
var path = require('path'); // node path（路径模块） 用于处理文件与目录的路径
var cookieParser = require('cookie-parser'); // cookie-parser是 Express 的中间件，用来实现cookie的解析
var logger = require('morgan'); // morgan 是 Express 默认的日志中间件，日志输出
var ejs = require('ejs')

var indexRouter = require('./routes/index'); // index 路由
var goodsRouter = require('./routes/goods'); // goods 路由
var usersRouter = require('./routes/users'); // users 路由

var app = express(); // 创建一个 express 实例

// view engine setup
// app.set(name, value) 给 name 设置项赋 value 值，name 是 Application settings 中属性的一项
app.set('views', path.join(__dirname, 'views')); // 告诉 Express 你的视图存在于一个名为 views 的文件夹中
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); // 告诉 Express 你将使用 ejs 模板引擎
// app.set('view engine', 'jade'); // 告诉 Express 你将使用 jade 模板引擎

app.use(logger('dev')); // 使用 Morgan 进行日志记录
// express.json([options]) 用于取代body-parser，基于body-parser用以解析传入的请求为JSON格式
// 函数返回只解析JSON的中间件,并且只作用于Content-Type请求头与type选项匹配的请求。
app.use(express.json()); // 设置用户表单提交动作信息的中间件，所有信息会保存在 req.body 里
// express.urlencoded([options]) 基于body-parser解析传入的请求为urlencoded格式
// 返回只解析urlencoded的中间件,而且只解析请求头的Content-Type与type匹配的请求。
app.use(express.urlencoded({ extended: false })); // 设置用户表单提交动作信息的中间件，所有信息会保存在 req.body 里
app.use(cookieParser()); // 用来实现cookie的解析
// express.static(root,[options]) 基于serve-static构建，用于提供静态文件
// 把应用目录下的`public`文件夹中的内容作为静态内容的方法
// 所有的请求通过这个中间件，如果没有文件被找到的话会继续前进
app.use(express.static(path.join(__dirname, 'public')));

// 捕获登陆状态
app.use(function (req, res, next) {
  // 引用cookie-parser 中间件：var cookieParser = require('cookie-parser')
  // req.cookies：当使用 cookie-parser 中间件时，此属性是一个由请求中的 cookie 信息构建的对象。如果请求中没有cookie，其值为 {}
  // 如果 cookie 有签名，则需要使用 req.signedCookies
  if (req.cookies.userId) {
    next();
  } else {
    // req.originalUrl：在中间件函数中，req.originalUrl 是 req.baseUrl 和 req.path 的组合
    // 示例：GET 'http://www.example.com/admin/new'
    // req.originalUrl --> '/admin/new'
    // req.baseUrl --> '/admin'
    // req.path --> '/new'
    if (req.originalUrl == '/users/login' || req.originalUrl == 'users/logout' || req.originalUrl.indexOf('goods/list') > -1) {
      // 未登录时可以点击 登录login、登出logout 和 查看商品列表
      next();
    } else {
      res.json({
        status: '1001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
})

// 一级路由
app.use('/', indexRouter); // 为指定的路径指定中间件函数，当请求的路径与之匹配时，中间件函数将会被执行。
app.use('/goods', goodsRouter)
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // 发送错误信息 404
});

// error handler
// 错误处理中间件需要接受四个参数，使用时必须传入四个参数以证明当前中间件时错误处理中间件。
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); // 设置状态码，默认为 500
  res.render('error');
});

module.exports = app;
