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
  // req.param可以获取客户端传过来的参数
  let page = parseInt(req.query.page); // 获取请求页数
  let pageSize = parseInt(req.query.pageSize); // 获取请求每页请求数据条数
  let priceLevel = req.query.priceLevel; // 获取价格区间标识
  let sort = req.query.sort; // 获取排序字段
  let skip = (page - 1) * pageSize; // 跳过的数据条数，用于分页
  var priceGt = '', priceLte = ''; // 用于数据筛选，大于priceGt，小于priceLte
  var params = {};
  if (priceLevel && priceLevel != 'all') {
    // 通过价格区间标识 priceLevel，筛选出对应价格区间
    switch (priceLevel) {
      case '0': priceGt = 0; priceLte = 100; break;
      case '1': priceGt = 100; priceLte = 500; break;
      case '2': priceGt = 500; priceLte = 1000; break;
      case '3': priceGt = 1000; priceLte = 5000; break;
    }
    params = {
      salePrice: {
        $gt: priceGt, // 大于
        $lte: priceLte // 小于
      }
    }
  }
  // 使用Mongoose来查找文档很容易，有3种方法可供选择: find()、findById()、findOne()
  // find()
  // > 第一个参数表示查询条件，
  // > 第二个参数用于控制返回的字段，
  // > 第三个参数用于配置查询参数，
  // > 第四个参数是回调函数，
  // > 回调函数的形式为 function(err,docs) {}
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize); // 实现分页功能
  // Goods.find(params): 查询所有数据符合筛选条件的数据
  // skip(skip) 跳过 skip 个，显示其他
  // limit(pageSize): 显示 pageSize 个
  goodsModel.sort({'salePrice': sort}); // 对价格进行升序或者降序
  // sort(): 排序方式，从小到大排序使用 1，从大到小排序使用 -1
  goodsModel.exec(function (err, doc) {
    // 数据进行分页排序等一系列链式操作之后，通过 exec() 进行调用方法，不能通过 find
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
});

module.exports = router;
