# 基于 Node.js 开发商品列表接口

## 1. 安装 MongoDB 数据库，并进行相关环境配置

可参考 [挑战全栈 MongoDB基础视频教程 - 认识和安装MongoDB](https://jspang.com/post/mongodb.html#toc-6ff)

## 2. 创建 dumall 数据库，导入相关数据库文件

文件存放于 [./dumall数据库](./dumall数据库) 文件夹中

+ MongoDB相关操作可以参考 [MongoDB安装等相关操作](./readme/MongoDB/MongoDB.md)、[挑战全栈 MongoDB基础视频教程(技术胖)](https://jspang.com/post/mongodb.html#toc-6ff)

``` shell
  >>> # 导入命令
  >>> mongoimport -d [连接的数据库名] -c [集合名] --file [文件地址]
  >>> # -d 表示连接的数据库
  >>> # -c 表示连接数据库中的集合
  >>> # --file 表示导入的文件路径
```

## 3. 安装 Mongoose

安装：`npm install mongoose --save`

Mongoose 是在 Node.js 环境下对 MongoDB 进行便捷操作的对象模型工具。

Mongoose 相关操作可参考：[一篇文章带你入门 Mongoose](https://segmentfault.com/a/1190000012095054#articleHeader31)、[Mongoose 基础操作](https://blog.csdn.net/o_Mario_o/article/details/80221386)

## 4. 开发商品列表接口

### 4.1 创建 model

定义商品模型model —— [server/models/goods.js](../server/models/goods.js)

``` javascript
  // server/models/goods.js
  var mongoose = require('mongoose');
  // Mongoose 是在 node.js 环境下对 MongoDB 进行便捷操作的对象模型工具

  // Schema 主要用于定义 MongoDB 中集合 Collection 里文档 document（数据记录行 / 文档） 的结构,
  // > 可以理解为 mongoose 对表结构的定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)
  // > 每个 schema 会映射到 mongodb 中的一个 collection，schema不具备操作数据库的能力
  // 使用：通过 mongoose.Schema 来调用 Schema，然后使用 new方法 来创建 schema
  var Schema = mongoose.Schema;
  var productSchema = new Schema({
    'productId':String, // 商品id。（或者可以使用 'productId':{type:String}）
    'productName':String, // 商品名
    'salePrice':Number, // 商品价格
    'productImage':String, // 商品图片

    // 在商品列表页，对相应商品点击加入购车时，会获取对应商品数据，
    // 然后给该商品添加 checked 和 productNum 属性，
    // 再将该商品添加到购物车列表中，Schema中不定义属性的话是添加不了的
    "checked":String, // 商品是否选中
    "productNum":Number // 商品数量
  })

  // Model是由 Schema 编译而成的假想（fancy）构造器，具有抽象属性和行为。
  // Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作。
  // 简单说就是：Model是由 Schema 生成的模型，可以对数据库的操作。使用 model() 方法，将 Schema 编译为 Model
  // 使用：mongoose.model(`文档名称`, Schema)
  module.exports = mongoose.model('good', productSchema) // // 输出(导出)
  // Mongoose 会将集合名称设置为模型名称的小写版。
  // > 如果名称的最后一个字符是【字母】，则会变成复数； -->  如果模型名称为 "MyModel"，则集合名称为 "mymodels"
  // > 如果名称的最后一个字符是【数字】，则不变；  -->  如果模型名称为 "Model1"，则集合名称为 "model1"
  // 这个模型定义的是数据库 dumall 的 goods 集合数据，所以这个 model 取名 good 是对应这个集合，连接数据库之后，这个模型会根据名字的复数形式 "goods" 来查找数据集合。
  // module.exports = mongoose.model('good',produtSchema,'goods'); 也可以后面注明链接的是数据库的 goods 集合
```

### 4.2 创建路由

在 server/routes 文件夹中，创建 `goods.js` 文件，在文件内定义二级路由。并在 server/app.js 中，引入 goods路由

``` javascript
  // server/app.js
  var goodsRouter = require('./routes/goods'); // goods 路由
  app.use('/goods', goodsRouter) // 一级路由
```

``` javascript
  // server/routes/goods.js
  var express = require('express');
  var router = express.Router(); // 拿到 express框架 的路由
  var mongoose = require('mongoose')
  var Goods = require('../models/goods'); // 引入goods模型

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

  // 二级路由
  // 获取商品列表接口
  router.get("/list", function (req, res, next) {
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
```
