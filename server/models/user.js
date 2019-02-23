var mongoose = require('mongoose');
// Mongoose 是在 node.js 环境下对 MongoDB 进行便捷操作的对象模型工具

// Schema 主要用于定义 MongoDB 中集合 Collection 里文档 document（数据记录行 / 文档） 的结构,
// > 可以理解为 mongoose 对表结构的定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)
// > 每个 schema 会映射到 mongodb 中的一个 collection，schema不具备操作数据库的能力
// 使用：通过 mongoose.Schema 来调用 Schema，然后使用 new方法 来创建 schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
  'userId': String, // 用户ID(或者 'userId':{type:String})
  'userName': String, // 用户名
  'userPwd': String, // 用户密码
  'orderList': Array, // 订单列表
  'cartList': [{ // 购物车列表
    "productId": String, // 商品ID
    "productName": String, // 商品名
    "salePrice": Number, // 商品价格
    "productImage": String, // 商品图片
    "checked": String, // 商品是否选中
    "productNum": String // 商品数量
  }],
  "addressList": [{ // 地址列表
    "addressId": String, // 地址ID
    "userName": String, // 收货人
    "streetName": String, // 地址
    "postCode": Number, // 邮编
    "tel": Number, // 电话
    "isDefault": Boolean // 是否默认选择
  }]
})

// Model是由 Schema 编译而成的假想（fancy）构造器，具有抽象属性和行为。
// Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作。
// 简单说就是：Model是由 Schema 生成的模型，可以对数据库的操作。使用 model() 方法，将 Schema 编译为 Model
// 使用：mongoose.model(`文档名称`, Schema)
module.exports = mongoose.model('user', userSchema) // // 输出(导出)
// Mongoose 会将集合名称设置为模型名称的小写版。
// > 如果名称的最后一个字符是【字母】，则会变成复数； -->  如果模型名称为 "MyModel"，则集合名称为 "mymodels"
// > 如果名称的最后一个字符是【数字】，则不变；  -->  如果模型名称为 "Model1"，则集合名称为 "model1"
// 这个模型定义的是数据库 dumall 的 goods 集合数据，所以这个 model 取名 good 是对应这个集合，连接数据库之后，这个模型会根据名字的复数形式 "goods" 来查找数据集合。
// module.exports = mongoose.model('good',produtSchema,'goods'); 也可以后面注明链接的是数据库的 goods 集合
