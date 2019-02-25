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

// 获取购物车列表数据
router.get('/cartList', function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

router.post('/cartEdit', function (req, res, next) {
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked;
  // update 文档更新
  // Model.update(conditions, doc, [options], [callback])
  // > conditions 为查询条件
  // > doc 为需要修改的数据
  // > options 为控制选项
  // > callback 为回调函数
  // 数组修改器
  // $pull 向数组中删除指定元素
  User.update({
    'userId': userId,
    'cartList.productId': productId
  }, {
    'cartList.$.productNum': productNum, // $ 为一个占位符
    'cartList.$.checked': checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

// 购物车删除功能
router.post('/cartDel', function (req, res, next) {
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

// 购物车全选与取消全选
router.post('/editCheckAll', function (req, res, next) {
  var userId = req.cookies.userId,
      checkAll = req.body.checkAll ? '1': '0';
  User.findOne({
    userId: userId
  }, function (userErr, userDoc) {
    if (userErr) {
      res.json({
        status: '1',
        msg: userErr.message,
        result: ''
      })
    } else {
      if (userDoc) {
        userDoc.cartList.forEach((item) => {
          item.cheked = checkAll
        })
        userDoc.save(function (saveErr, saveDoc) {
          if (saveErr) {
            res.json({
              status: '1',
              msg: saveErr.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
    }
  })
})
module.exports = router;
