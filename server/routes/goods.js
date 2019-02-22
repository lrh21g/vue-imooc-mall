var express = require('express');
var router = express.Router(); // 拿到 express框架 的路由
var mongoose = require('mongoose')
var Goods = require('../models/goods');

// connect 用于创建数据库连接
// 指定用户连接: mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
mongoose.connect('mongodb://127.0.0.1:27017/dumall');
// 如果是带有账号密码的，则为：mongodb://root:123qwe@127.0.0.1:27017/dumall

// 连接成功
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success!");
})

// 连接异常
mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail!");
})

// 连接断开
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected!");
})

router.get("/", function (req, res, next) {
  // 使用Mongoose来查找文档很容易，有3种方法可供选择: find()、findById()、findOne()
  // find()
  // > 第一个参数表示查询条件，
  // > 第二个参数用于控制返回的字段，
  // > 第三个参数用于配置查询参数，
  // > 第四个参数是回调函数，
  // > 回调函数的形式为 function(err,docs) {}
  Goods.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router;
