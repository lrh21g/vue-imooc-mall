var express = require('express');
var router = express.Router();
var User = require('../models/user.js'); // 引入 User 模型
require('./../util/util');  // 引入时间格式化函数工具

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

// 获取地址列表接口
router.get('/addressList', function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({
    userId: userId
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
        result: doc.addressList
      })
    }
  })
})

// 设置默认地址接口
router.post('/setDefault', function (req, res, next) {
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'address is null',
      result: ''
    })
  } else {
    User.findOne({
      userId: userId
    }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        var addressList = doc.addressList;
        addressList.forEach((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        })
        doc.save(function (saveErr, saveDoc) {
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
              result: ''
            })
          }
        })
      }
    })
  }
})

// 删除地址接口
router.post('/delAddress', function (req, res, next) {
  var userId = req.cookies.userId,
      addressId  = req.body.addressId;
  User.update({
    userId: userId
  }, {
    $pull: {
      'addressList': {
        'addressId': addressId
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
        result: ''
      })
    }
  })
})

// payMent
router.post('/payMent', function (req, res, next) {
  var userId = req.cookies.userId,
      addressId = req.body.addressId, // 订单地址ID
      orderTotal = req.body.orderTotal; // 订单地址总金额
  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var address = {},
          goodsList = [];
      // 获取当前用户地址信息
      doc.addressList.forEach((item) => {
        if (addressId === item.addressId) {
          address = item;
        }
      })
      // 获取当前用户购物车购买商品
      doc.cartList.filter((item) => {
        if (item.checked === '1') {
          goodsList.push(item);
        }
      })
      // 创建订单ID
      var platform = '622'; // 平台系统架构码
      var r1 = Math.floor(Math.random() * 10);
      var r2 = Math.floor(Math.random() * 10);
      var sysDate = new Date().Format('yyyyMMddhhmmss');
      var orderId = platform + r1 + sysDate + r2;
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      };
      doc.orderList.push(order);
      doc.save(function (saveErr, saveDoc) {
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
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })
    }
  })
})

// 根据订单ID获取订单信息
router.get('/orderDetail', function (req, res, next) {
  var userId = req.cookies.userId,
      orderId = req.query.orderId;
  User.findOne({
    userId: userId
  }, function (err, userInfo) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var orderList = userInfo.orderList; // 用户订单列表
      if (orderList.length > 0) {
        var orderTotal = 0;
        orderList.forEach((item) => {
          // 根据订单ID获取订单总金额
          if (item.orderId === orderId) {
            orderTotal = item.orderTotal
          }
        });
        if (orderTotal > 0) {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        } else {
          res.json({
            status: '120002',
            msg: '无此订单',
            result: ''
          })
        }
      } else {
        res.json({
          status: '120001',
          msg: '当前用户未创建订单',
          result: ''
        })
      }
    }
  })
})

module.exports = router;
