var express = require('express');
var router = express.Router();
var User = require('../models/user.js'); // 引入 User 模型

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录接口
router.post('/login', function (req, res, next) {
  var param = { // 查询条件
    userName: req.body.userName, // 用户名
    userPwd: req.body.userPwd // 用户密码
  }
  User.findOne(param, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        // res.cookie(name, value [, options])：设置cookie，name 的值为 value，options 为设置的参数
        // res.cookie()做的事情其实就是设置了 Set-Cookie 头中对应的信息
        res.cookie('userId', doc.userId, {
          path: '/', // cookie的路径，默认为 '/'
          maxAge: 100 * 60 * 60 // 以 ms(毫秒) 格式设置的 cookie 过期时间
        });
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})

// 登出接口
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: "/",
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

// 检查是否登录接口
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

module.exports = router;
