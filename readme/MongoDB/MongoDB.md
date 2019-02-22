# MongoDB

## 1. 优点

+ 高可扩展性
+ 分布式存储
+ 低成本
+ 解构灵活

## 2. window 下安装 MongoDB

参考：<http://www.imooc.com/article/18438>

### 2.1 [下载 MongoDB 安装包](https://www.mongodb.com/download-center/community)

### 2.2 添加 MongoDB 存储和日志存储文件夹

+ 在 C盘 穿件 MongoDB 文件夹（文件名可随意）
+ 目录结构如下

  ``` javascript
  | - MongoDB
      | - data
      | - logs
          | - mongo.log
      | - etc
          | - mongo.conf
  ```

+ 修改 mongo.conf 内容

  ``` text
  # 数据库路径
  dbpath = c:\MongoDB\data\
  # 日志输出文件路径
  logpath = c:\MongoDB\logs\mongodb.log
  # 错误日志采用追加模式，配置这个选项后 MongoDB 的日志会追加到现有的日志文件，而不是重新创建一个新文件
  logappend = true
  # 启用日志文件，默认启用
  journal = true
  # 过滤掉一些无用的日志信息，若需要调试使用请设置为false
  quiet = false
  # 端口号 默认为27017
  port = 27017
  # 指定存储引擎（默认先不加此引擎，如果报错了，在加进去）
  storageEngine = mmapv1
  ```

+ 备注

  以上是通过配置的形式，来启动我们的MongoDB,也可以把参数直接在启动的时候，传递进去如下：

  ``` shell
  mongod --dbpath c:\MongoDB\data --logpath c:\MongoDB\logs\mongo.log  --journal
  ```

### 2.3 通过在命令中传参的形式启动 MongoDB

+ 以管理员身份运行 CMD
+ 进入安装 MongoDB 文件夹中的 bin 目录（示例：C:\Program Files\MongoDB\Server\4.0\bin）
+ 输入下面命令，启动 mongo

  ``` shell
  mongod --dbpath c:\MongoDB\data
  ```

  如果出现 waiting for connections on port 27017 等，说明启动成功；可在浏览器中输入 <http://localhost:27017> 进行测试。

+ 再次以管理员身份运行 CMD，进入安装 MongoDB 文件夹中的 bin 目录下，输入 `mongo` ，回车，查看是否进入 mongo 命令中。

### 2.4 通过配置文件的形式启动 MongoDB，同时安装到window 服务当中

+ 进入安装 MongoDB 文件夹中的 bin 目录中，输入命令，启动 mongo

  ``` shell
  # 添加 MongoDB 服务到 window 服务中
  mongod --config c:\MongoDB\etc\mongo.conf --install --serviceName "MongoDB"
  #删除 MongoDB 服务命令
  mongod --config c:\MongoDB\etc\mongo.conf --remove
  ```

### 2.4 配置环境变量，启动 Mongo

将安装 MongoDb 文件夹下的 bin 目录 `C:\Program Files\MongoDB\Server\3.2\bin` ，添加到系统环境变量（path）中即可

## 3. MongoDB 给数据库创建用户

参考：<http://www.imooc.com/article/18439>

### 3.1 以 非授权/授权 的模式启动 MongoDB

+ 以非授权的模式启动 MongoDB
  + `mongod --config c:\mongodb\etc\mongo.conf` ( /mongodb/etc/mongo.conf 为 mongo 配置文件所在的地址)
  + `net start` (前提为：MongoDB 安装到了服务里面)
+ 以授权的模式启动 MongoDB：`mongod -f /mongodb/etc/mongo.conf --auth`
  + --auth代表授权启动，需要帐号密码才能访问
  + auth=true 可以加到 mongo.conf 配置文件里面去进行统一管理

### 3.2 创建管理员

+ 通过非授权的方式启动 MongoDB
+ 创建 admin 数据库：`use admin`
+ 添加管理员用户：`db.createUser({user:"admin",pwd:"123456",roles:["root"]})`(用户名和密码可随意)
+ 认证：`db.auth("admin", "123456")`

### 3.3 以授权的方式启动 MongoDB ,给使用的数据库添加用户

+ 切换数据库：`use test`
+ 创建用户：`db.createUser({user: "root", pwd: "123456", roles: [{ role: "dbOwner", db: "test" }]})`
+ 通过客户端连接test数据库

## 4.MongoDB 基本命令

参考：<https://jspang.com/post/mongodb.html>

+ 查看存在数据库命令：`show dbs`
+ 查看数据库版本命令：`db.version()`
+ 显示数据库中的集合：`show collections`
+ 显示当前使用的数据库名称：`db`
+ 建立数据库：`use [数据库名]`

  当数据库存在，则进入数据库；不存在则建立数据库，但没有集合前，默认为空。成功则会显示：switched to db admin

+ 新建数据集合和插入文件（数据）：`db.[集合].insert()`
  
  当不集合存在时，会新建一个集合，并向里边插入数据，eg：`db.user.insert({"name":lrh})`

+ 查询所有数据：`db.[集合].find()`
+ 查询第一个文件数据：`db.[集合].findOne()`
+ 修改文件数据：`db.[集合].update({查询},{修改})`
  
  可以多加文件数据项，eg：`db.user.update({"name":"xiaoming"},{"name":"xiaoming","age":"18"})`

+ 删除文件数据：`db.[集合].remove(条件)` (eg：`db.user.remove({"name":"小明"})`)
+ 删除整个集合：`db.[集合].drop()`
+ 删除整个数据库：`db.dropDatabase()`
  
  在删除库时，一定要先进入数据库，然后再删除

## 5. 用 JavaScript 写 MongoDB 命令

``` javascript
// goTask.js
var userName = "lrh"; // 声明一个登录名
var timeStamp = Date.parse(new Date());     //声明登录时的时间戳  
var jsonDdatabase = {"loginUnser": userName, "loginTime": timeStamp}; //组成JSON字符串
var db = connect('log');   //链接数据库 相当于 use log
db.login.insert(jsonDdatabase);  //插入数据 新建 login 数据集合并插入数据
print('[demo]log  print success');  //没有错误显示成功
```

``` shell
>>> # 执行 goTask.js 文件
mongo goTask.js

>>> # 或者进入 MongoDB 执行环境，使用 load('./goTask.js') 执行 goTask.js 文件
>>> mongo
>>> load(./goTask.js)
```

## 6. 批量插入比循环插入具有更优的性能体验

+ 注意：MongoDB 3.2以前的版本基本都需要在 Insert 前加一个 batc
  
  eg：`db.test.batchInsert([{"_id":1}, {"_id":2}, {"_id":3}])`

  eg：`db.test.insert([{"_id":1}, {"_id":2}, {"_id":3}])`

## 7. 修改

`db.[集合].update({查询},{修改})`

### 7.1 update常见错误

使用 update 修改的时候，通过第一个参数查找到数据，修改时，第二个参数需要将全部的数据写入，而不是只写入修改的某项数据

``` shell
>>> use test # 新建test数据库
>>> db.user.insert({"name": "lrh", "age": 18}) # 新建user集合并插入数据

>>> # 错误update更新方法
>>> db.user.update({"name": "lrh"}, {"age": 21})
>>> # 错误update的输出
>>> db.user.find() # {"age": 21}

>>> # 正确update更新方法
>>> db.user.update({"name": "lrh"}, {"name": "lrh", "age": 21})
>>> # 正确update的输出
>>> db.user.find() # {"name": "lrh", "age": 21}
```

### 7.2 update修改器

``` shell
>>> use user # 新建user数据库
>>> # 新建info集合并插入数据
>>> db.info.insert([
      {"name": "lrh01", "age": 18, "skill": {"skillOne": "HTML+CSS", "skillTwo": "JavaScript"}},
      {"name": "lrh02", "age": 21, "skill": {"skillOne": "AE", "skillTwo": "PS"}}
    ])

>>> # $set —— 用来修改一个指定的键值(key)
>>> db.info.update({"name": "lrh01"}, {$set: {"age": 20}})
>>> db.info.findOne() # {"name": "lrh01", "age": 20, "skill": {"skillOne": "HTML+CSS", "skillTwo": "JavaScript"}}
>>> # $set —— 修改嵌套内容
>>> db.info.update({"name": "lrh01"}, {$set: {"skill.skillOne": "HTML5+CSS3"}})
>>> db.info.findOne() # {"name": "lrh01", "age": 20, "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript"}}

>>> # $unset —— 用于删除指定key和键
>>> db.info.update({"name": "lrh01"}, {$unset: {"age": ""}})
>>> db.info.findOne() # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript"}}

>>> # $inc —— 对数字进行计算。对value值的修改，修改的必须是数字，字符串是不起效果的
>>> db.info.update({"name": "lrh01"}, {$set: {"age": 22}}) # 添加 age，注意：此时的age在该数据的最后一项
>>> db.info.update({"name": "lrh01"}, {$inc: {"age": -2}}) # 对 age 进行计算
>>> db.info.findOne() # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript"}, "age": 20,}

>>> # multi选项 —— multi是有ture和false两个值，true代表全部修改，false代表只修改一个（默认值）
>>> db.info.update({}, {$set: {"interset": []}}, {multi: true}) # 给info集合中的数据，都添加上 interset
>>> db.info.find()
>>> # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript"}, "age": 20, "interset": [ ]}
>>> # {"name": "lrh02", "age": 21, "skill": {"skillOne": "AE", "skillTwo": "PS"}, "interset": [ ]}

>>> # upsert选项 —— upsert是在找不到值的情况下，直接插入这条数据
>>> # upsert有两个值：true代表没有就添加，false代表没有不添加(默认值)
>>> db.info.update({"name": "lrh03"}, {$set: {"age": "24"}}, {upsert: true})
>>> db.info.find()
>>> # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript"}, "age": 20, "interset": [ ]}
>>> # {"name": "lrh02", "age": 21, "skill": {"skillOne": "AE", "skillTwo": "PS"}, "interset": [ ]}
>>> # {"name": "lrh03", "age": 24}

>>> # $push —— 追加数组/内嵌文档值
>>> db.info.update({"name": "lrh01"}, {$push: {interset: "draw"}})
>>> db.info.findOne() # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript"}, "age": 20, "interset": ["draw"]}
>>> # $push —— 为内嵌文档增加值
>>> db.info.update({"name": "lrh01"}, {$push: {"skill.skillThree": "draw"}})
>>> # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript", "skillThree": "draw"}, "age": 20, "interset": ["draw"]}

>>> # $ne —— 查找是否存在。检查一个值是否存在，如果不存在再执行操作，存在就不执行
>>> db.info.update({"name": "lrh01", "interset": {$ne: "palyGame"}}, {$push: {"interset": "Game"}}) # 如果 interset 中不存在 palyGame，则执行 $push 为 interset数组 添加 Game
>>> db.info.findOne() # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript", "skillThree": "draw"}, "age": 20, "interset": ["draw", "Game"]}

>>> # $addToSet —— 升级版的 $ne,所以工作中比 $ne 常用
>>> db.info.update({"name": "lrh01"}, {$addToSet: {interset: "readBook"}})
>>> db.info.findOne() # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript", "skillThree": "draw"}, "age": 20, "interset": ["draw", "Game", "readBook"]}

>>> # $each —— 批量追加。可以传入一个数组，一次增加多个值进去，相当于批量操作。
>>> db.info.update({"name": "lrh01"}, {$addToSet: {interset: {$each: ["Sing", "Dance", "Code"]}}})
>>> db.info.findOne() # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript", "skillThree": "draw"}, "age": 20, "interset": ["draw", "Game", "readBook", "Sing", "Dance", "Code"]}

>>> # $pop —— 删除数组值。只删除一次，并不是删除所有数组中的值。两个选项，1 （从数组末端进行删除）和 -1 （从数组开端进行删除）
>>> db.info.update({"name": "lrh01"}, {$pop: {interset: 1}})
>>> db.info.findOne() # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript", "skillThree": "draw"}, "age": 20, "interset": ["draw", "Game", "readBook", "Sing", "Dance"]}

>>> # 数组定位修改
>>> db.info.update({"name": "lrh01"}, {$set: {"interset.2": "code"}})
>>> db.info.findOne() # {"name": "lrh01", "skill": {"skillOne": "HTML5+CSS3", "skillTwo": "JavaScript", "skillThree": "draw"}, "age": 20, "interset": ["draw", "Game", "code", "Sing", "Dance"]}
```

### 7.3 状态返回与安全

在操作数据库时，对数据的修改是需要有足够的安全措施的。

在实际工作中，使用 `db.[集合].update` 并不多，在修改时,更多选择使用 `findAndModify`，它可以给我们返回来一些必要的参数。

+ 非应答式写入：操作完数据库后，并没有给予任何回应和返回值
+ 应答式写入：直接返回结果（报表），结果中包含很多项，可以通过所包含的项，进行程序的控制和安全机制的处理

#### 7.3.1 db.runCommand()

数据库运行命令的执行器，执行命令首选就要使用它，因为它在Shell和驱动程序间提供了一致的接口。（几乎操作数据库的所有操作，都可以使用 runCommand 来执行）

+ db.listCommands()：查看所有的Commad命令
+ db.runCommand({ping:1})：查看是否和数据库链接成功，返回 `ok：1` 就代表链接正常。

``` javascript
// goTask.js

db.info.update({"name": "lrh01"}, {$set: {money: 1000}}, false, true)
// false：是upsert的简写，代表没有此条数据时不增加。
// true：是multi的简写，代表修改所有。
var resultMessage = db.runCommand({getLastError: 1})
// getLastError:1 —— 表示返回功能错误。更多从参数可以自行查找
printjson(resultMessage)
// printjson：表示以json对象的格式输出到控制台
```

``` shell
>>> # 执行 goTask.js 文件
>>> mongo
>>> load('./goTask.js')
>>> # 返回结果
>>> # {
>>> #    "connectionId" : 1,
>>> #    "updatedExisting" : true,
>>> #    "n" : 2,
>>> #    "syncMillis" : 0,
>>> #    "writtenTo" : null,
>>> #    "err" : null,
>>> #    "ok" : 1
>>> # }
```

#### 7.3.2 findAndModify —— 查找并修改

`findAndModify` 是查找并修改的意思。配置它可以在修改后返回修改的结果。

`findAndModify` 的性能没有直接使用 `db.[集合].update` 的性能好，但是在实际工作中都是使用它，毕竟要商用的程序安全性比较重要的。

findAndModify属性值

+ `query`：需要查询的条件/文档
+ `sort`：进行排序
+ `remove`：[boolean]是否删除查找到的文档，值填写true，可以删除。
+ `new`：[boolean]返回更新前的文档还是更新后的文档。
+ `fields`：需要返回的字段
+ `upsert`：没有这个值是否增加。

``` javascript
// goTask.js
var myModify = {
    findAndModify: "info",
    query: {name: 'lrh01'}, // 需要查询的条件/文档
    update: {$set: {age: 18}},
    new: true // 更新完成，查看结果。如果为 false 不进行结果查看
};
var ResultMessage = db.runCommand(myModify);
printjson(ResultMessage); // 以json对象的格式输出到控制台
```

``` shell
>>> # 执行 goTask.js 文件
>>> mongo
>>> load('./goTask.js')
```

## 8. 查询 (db.[集合].find())

### 8.1 find的不等修饰符

+ 简单查询

  ``` shell
  >>> # 在 workmate 集合中，查询 skill.sillOne 为 HTML+CSS 的数据
  >>> db.workmate.find({"skill.skillOne": "HTML+CSS"})
  ```

+ 筛选字段
  
  使用简单查询，会返回对应数据的所有数据项。可以通过筛选字段显示所需要插件的数据项

  ``` shell
  >>> # 在 workmate 集合中，查询 skill.sillOne 为 HTML+CSS 的数据，只显示查询到数据的 姓名 以及 第一技能 项，隐藏 ID字段，同时也可以使用 1 / 0 进行 true / false 的表示
  >>> db.workmate.find(
        {"skill.skillOne":"HTML+CSS"},
        {name: true, "skill.skillOne": true, _id: false}
      )
  ```

+ 不等修饰符
  + $lt：小于。(less-than)
  + $lte：小于等于。(less-than-equal)
  + $gt：大于。(greater-than)
  + $gte：大于等于。(greater-than-equal)
  + $ne：不等于。(not-equal)

  ``` shell
  >>> # 查找年龄项小于30，大于25的数据
  >>> db.workmate.find(
        {age: {$lte: 30,$gte: 25}},
        {name: true, age: true, "skill.skillOne": true, _id: false}
      )
  ```

+ 日期查找

  ``` shell
  >>> # 查询日期项大于2018年1月10日的数据
  >>> var startDate= new Date('01/01/2018');
  >>> db.workmate.find(
        {regeditTime: {$gt: startDate}},
        {name: true, age: true, "skill.skillOne": true, _id: false}
      )
  ```

### 8.2 find的多条件查询

``` shell
>>> # $in —— 一键多值的查询
>>> # 查询 age 在 [25, 33] 范围内的数据
>>> db.workmate.find(
      {age: {$in: [25, 33]}},
      {name: 1, "skill.skillOne": 1, _id: 0}
    )

>>> # $nin —— 查询除了 $in 条件以为的值
>>> # 查询 age 在 [25, 33] 范围以外的数据
>>> db.workmate.find(
      {age: {$nin: [25, 33]}},
      {name: 1, "skill.skillOne": 1, _id: 0}
    )

>>> # $or —— 查询多个键值
>>> # 查询 age大于30 或者 第一技能项为PHP 的数据
>>> db.workmate.find(
      {
        $or: [
          {age: {$gte: 30}},
          {"skill.skillThree":'PHP'}
        ]
      },
      {
        name: 1, "skill.skillThree": 1, age: 1, _id: 0
      }
    )

>>> # $and —— 查询多个key值都满足的情况
>>> # 查询 age大于30 并且 第一技能项为PHP 的数据，两个条件同时满足的数据
>>> db.workmate.find(
      {
        $and: [
          {age: {$gte: 30}},
          {"skill.skillThree": 'PHP'}
        ]
      },
      {name: 1, "skill.skillThree": 1, age: 1, _id: 0}
    )

>>> # $ont —— 查询除条件之外的值
>>> # 查询 age大于20并且小于30 以外的数据
>>> db.workmate.find(
      {
        age: {
          $not: {
            $lte: 30,
            $gte: 20
          }
        }
      },
      {name: 1, "skill.skillOne": 1, age: 1, _id: 0}
    )
```

### 8.3 find的数组查询

``` shell
>>> # 基础查询
>>> # 使用 中括号[] 则表示完全匹配，需要兴趣中与查询的兴趣完全相同，不能多也不能少，才能匹配到
>>> db.workmate.find(
      {interest: ['画画', '聚会', '看电影']},
      {name: 1, interest: 1, age: 1, _id: 0}
    )
>>> # 如果需要查询兴趣中包含 '看电影' 的数据，需要去掉 中括号[]
>>> db.workmate.find(
      {interest: '看电影'},
      {name: 1, interest: 1, age: 1, _id: 0}
    )

>>> # $all —— 数组的多项查询
>>> # 查询 interset数组中，包含'看电影'，'看书'的数据
>>> db.workmate.find(
      {
        interest: {$all: ["看电影", "看书"]}
      },
      {name: 1, interest: 1, age: 1, _id: 0}
    )

>>> # $in —— 数组的或者查询
>>> # 查询 interset数组中，包含'看电影'或者'看书'的数据
>>> db.workmate.find(
      {
        interest:{$in: ["看电影", "看书"]}
      },
      {name: 1, interest: 1, age: 1, _id: 0}
    )

>>> # $size —— 数组个数查询，可以根据数组的数量查询出结果
>>> # 查询 interset数组 数量为5个的数据
>>> db.workmate.find(
      {
        interest:{$size: 5}
      },
      {name: 1, interest: 1, age: 1, _id: 0}
    )

>>> # $slice —— 显示选项
>>> # 显示 interset数组 中，数组的前两项
>>> db.workmate.find(
      {},
      {name: 1, interest: {$slice: 2}, age: 1, _id: 0}
    )
>>> # 显示 interset数组 中，数组的最后一项
>>> db.workmate.find(
      {},
      {name: 1,interest: {$slice: -1}, age: 1, _id: 0}
    )
```

### 8.4 find的参数使用方法

+ query：这个就是查询条件，MongoDB 默认的第一个参数。
+ fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
+ limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
+ skip：跳过多少个显示，和limit结合可以实现分页。
+ sort：排序方式，从小到大排序使用 1，从大到小排序使用 -1

``` shell
>>> # 分页
>>> # 每页显示两个，并且按照年龄从小到大的顺序排列
>>> db.workmate.find(
      {},
      {name: true, age: true, _id: false}
    ).limit(0).skip(2).sort({age:1});
```

``` shell
>>> # $where
>>> # 查询 age大于30岁 的数据
>>> db.workmate.find(
      {$where: "this.age>30"},
      {name: true, age: true, _id: false}
    )
>>> # this指向的是 workmate（查询集合）本身
>>> # 这种查询对于数据库的压力和安全性都会变重，所以在工作中尽量减少$where修饰符的使用
```

### 8.5 find如何在js文本中使用

+ hasNext循环结果

``` javascript
var db = connect("company")  // 链接对应的集合collections
var result = db.workmate.find() // 声明变量result，并把查询结果赋值给result
// 利用游标的 hasNext() 进行循环输出结果
while(result.hasNext()){
  printjson(result.next())  //用json格式打印结果
}
// 在终端中进行load(),执行JavaScript代码
```

+ forEach循环

``` javascript
var db = connect("company")  // 链接对应的集合collections
var result = db.workmate.find() // 声明变量result，并把查询结果赋值给result
// 利用游标的 hasNext() 进行循环输出结果
result.forEach(function(result){
  printjson(result)
})
// 在终端中进行load(),执行JavaScript代码
```

## 9. 索引

索引的性能提现必须要有大量数据才能看出来。

### 9.1 构造百万数据

``` javascript
// 构造百万级数据
// 1. 生成随机数
function GetRandomNum(min, max) {
  let range = max - min; // 得到随机数区间
  let rand = Math.random(); // 得到随机值
  return (min + Math.round(rand * range)); // 最小值+随机数取整
}
// console.log(GetRandomNum(10000,99999));
// 2. 生成随机用户名
function GetRadomUserName(min, max) {
  let tempStringArray = "123456789qwertyuiopasdfghjklzxcvbnm".split(""); //构造生成时的字母库数组
  let outPuttext = ""; // 最后输出的变量
  // 进行循环，随机生产用户名的长度，这里需要生成随机数方法的配合
  for (let i = 1; i < GetRandomNum(min, max); i++) {
    // 随机抽取字母，拼装成需要的用户名
    outPuttext = outPuttext + tempStringArray[GetRandomNum(0, tempStringArray.length)]
  }
  return outPuttext;
}
// console.log(GetRadomUserName(7,16))
// 3. 插入200万数据
var db = connect('company');
db.randomInfo.drop();
var tempInfo = [];
for (let i = 0; i < 2000000; i++) {
  tempInfo.push({
    username: GetRadomUserName(7, 16),
    regeditTime: new Date(),
    randNum0: GetRandomNum(100000, 999999),
    randNum1: GetRandomNum(100000, 999999),
    randNum2: GetRandomNum(100000, 999999),
    randNum3: GetRandomNum(100000, 999999),
    randNum4: GetRandomNum(100000, 999999),
    randNum5: GetRandomNum(100000, 999999),
    randNum6: GetRandomNum(100000, 999999),
    randNum7: GetRandomNum(100000, 999999),
    randNum8: GetRandomNum(100000, 999999),
    randNum9s: GetRandomNum(100000, 999999),
  })
}
db.randomInfo.insert(tempInfo);
```

``` javascript
// 普通查询
var startTime = new Date().getTime() // 得到程序运行的开始时间
var db = connect('company') // 链接数据库
var rs = db.randomInfo.find({
  username: "763k2xe78s7"
}) // 根据用户名查找用户
rs.forEach(rs => {
  printjson(rs)
}) // 循环输出
var runTime = new Date().getTime() - startTime; // 得到程序运行时间
print('[SUCCESS]This run time is:' + runTime + 'ms') //打印出运行时间 [SUCCESS]This run time is:1613ms
```

### 9.1 索引

+ 建立索引

``` shell
>>> # 为用户名（username）建立索引
>>> db.randomInfo.ensureIndex({username: 1})

>>> # 查看现有索引
>>> db.randomInfo.getIndexes()
>>> [
      {
        "v" : 2,
        "key" : { "_id" : 1 },
        "name" : "_id_",
        "ns" : "company.randomInfo"
      },
      {
        "v" : 2,
        "key" : { "username" : 1 },
        "name" : "uername_1",
        "ns" : "company.randomInfo"
      }
    ]
```

+ 建立索引进行查询，可以缩短查询时间。
+ 无论是在关系型数据库还是文档数据库，建立索引都是非常重要的。
+ 索引是要消耗硬盘和内存资源的，所以要根据程序需要进行建立了。MongoDB只允许建立64个索引值。

### 9.2 不需要使用索引的情况

+ 数据不超万条时，不需要使用索引。性能的提升并不明显，而大大增加了内存和硬盘的消耗。
+ 查询数据超过表数据量30%时，不要使用索引字段查询。实际证明会比不使用索引更慢，因为它大量检索了索引表和我们原表。
+ 数字索引，要比字符串索引快的多，在百万级甚至千万级数据量面前，使用数字索引是个明确的选择。
+ 把经常查询的数据做成一个内嵌数据（对象型的数据），然后集体进行索引。

### 9.3 复合索引

复合索引就是两条以上的索引。

+ 两条索引同时查询

``` javascript
var startTime = new Date().getTime();
var db = connect('company');
var rs = db.randomInfo.find({
  username: '763k2xe78s7',
  randNum0: 565509
});
rs.forEach(rs => {
  printjson(rs)
});
var runTime = new Date().getTime() - startTime;
print('[Demo]this run time is ' + runTime + 'ms');

// MongoDB的复合查询是按照我们的索引顺序进行查询的。就是用db.randomInfo.getIndexes()查询出的数组。
```

+ 指定索引查询（hint）

数字索引比字符串索引快。可以通过 hint() 打破索引表的查询顺序，使用指定的索引优先查询。

``` javascript
var startTime = new Date().getTime();
var db = connect('company');
var rs = db.randomInfo.find({
  username: '7xwb8y3',
  randNum0: 565509
}).hint({
  randNum0: 1
});
rs.forEach(rs => {
  printjson(rs)
});
var runTime = new Date().getTime() - startTime;
print('[Demo]this run time is ' + runTime + 'ms');
```

+ 删除索引 —— dropIndex()
  + 当索引性能不佳或起不到作用时，需要删除索引，删除索引的命令是dropIndex()。
  + 删除时填写的值，并不是字段名称（key），而是索引查询表中的 name 值

  ``` shell
  >>> # 索引的唯一ID
  >>> db.randomInfo.dropIndex('randNum0_1');
  ```

### 9.4 全文索引

使用情形：如果文章每篇都在万字以上，需要搜索关键字是非常不容易的，MongoDB 提供了全文索引

+ 建立全文索引

  ``` shell
  >>> db.info.insert({contextInfo:"I am a programmer, I love life, love family. Every day after work, I write a diary."})
  >>> db.info.insert({contextInfo:"I am a programmer, I love PlayGame, love drink. Every day after work, I playGame and drink."}
  >>> # 建立全文索引
  >>> # 注意：使用 text关键词 来代表全文索引
  >>> db.info.ensureIndex({contextInfo: 'text'})
  ```

+ 全文索引查找
  + $text：表示在全文索引中查东西
  + $search：表示所要查找的内容

  ``` shell
  >>> db.info.find({$text: {$search: "programmer"}})
  ```

+ 查找多个词

  ``` shell
  >>> # 全文索引是支持多个词的查找，比如查找数据中有programmer，family，diary，drink的数据（这是或的关系），所以两条数据都会出现
  >>> db.info.find({$text: {$search:"programmer family diary drink"}})
  
  >>> #不查找出来有 drink 这个词的记录，我们可以使用 "-" 减号来取消
  >>> db.info.find({$text: {$search:"programmer family diary -drink"}})
  ```

+ 转义符

  ``` shell
  >>> # 全文搜索中是支持转义符的，比如搜索的是两个词（love PlayGame和drink），这时候需要使用 \斜杠 来转意。
  >>> db.info.find({$text:{$search:"\"love PlayGame\" drink"}})
  ```

## 10. 管理

### 10.1 用户的创建、删除与修改

+ 创建用户：`db.createUser()`

  ``` shell
  >>> db.createUser({
        user: "lrh",
        pwd: "123123",
        customData: {
          name: '21g',
          email: '837233792@qq.com',
          age: 21,
        },
        roles:['read']
      })
  
  >>> # 单独配置一个数据库的权限，比如：配置compay数据库的权限为读写
  >>> db.createUser({
        user: "lrh",
        pwd: "123123",
        customData: {
          name: '21g',
          email: '837233792@qq.com',
          age: 21,
        },
        roles:[
          {
            role:"readWrite",
            db:"company"
          },
          'read'
        ]
      })
  ```

+ 内置角色：
  + 数据库用户角色：read、readWrite；
  + 数据库管理角色：dbAdmin、dbOwner、userAdmin;
  + 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManage；
  + 备份恢复角色：backup、restore；
  + 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
  + 超级用户角色：root
  + 内部角色：__system

+ 查找、删除等操作

  ``` shell
  >>> # 查找用户信息
  >>> db.system.users.find()

  >>> # 删除用户
  >>> db.system.users.remove({user:"lrh"})

  >>> # 建权
  >>> # 验证用户的用户名密码是否正确，需要用到MongoDB提供的健全操作。也算是一种登录操作，MongoDB 把这叫做建权。
  >>> db.auth("lrh","123132") # 正确返回1，错误返回0。（Error：Authentication failed。）

  >>> # 启动健权
  >>> # 重启 MongoDB 服务器，然后设置必须使用建权登录
  >>> mongod --auth

  >>> # 登录
  >>> # 在配置用户之后，用户想登录，可以使用 mongo 的形式，不过需要配置用户名密码
  >>> mongom -u lrh -p 12313 127.0.0.1:27017/admin
  ```

### 10.2 备份和还原

+ 数据备份

  ``` shell
  >>> # mongodump备份的基本格式：
  >>> mongodump
        --host 127.0.0.1
        --port 27017
        --out D:/databack/backup
        --collection myCollections
        --db test
        --username username
        --password password
  
  >>> # 备份所有 MongoDB 里的库到 D盘的databack文件夹 下
  >>> mongodump --host 127.0.0.1 --port 27017 --out D:/databack/
  ```

+ 数据恢复

  ``` shell
  >>> # 数据恢复基本格式
  >>> mongorestore
        --host 127.0.0.1
        --port 27017
        --username username
        --password password
        <path to the backup>
  
  >>> db.randomInfo.drop() # 删除 randomInfo 集合
  >>> mongorestore --host 127.0.0.1 --port 27017 D:/databack/ # 数据恢复
  ```

## 11. 通过命令行进行数据导入
  
  注意：运行 mongoexport 和 mongoimport 的时候必须退出当前mongo环境。

  ``` shell
  mongoimport -d [连接的数据库名] -c [集合名] --file [文件地址]
  -d 表示连接的数据库
  -c 表示连接数据库中的集合
  --file 表示导入的文件路径
  ```
