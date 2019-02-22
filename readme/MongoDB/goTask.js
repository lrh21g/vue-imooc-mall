// MongoDB JavaScript运行文件 用于学习MongoDB

// 建立 MongoDB 数据库 test
// var = jsonDdatabase([
//   {"name": "lrh01", "age": 18, "skill": {"skillOne": "HTML+CSS", "skillTwo": "JavaScript"}},
//   {"name": "lrh02", "age": 21, "skill": {"skillOne": "AE", "skillTwo": "PS"}}
// ])
// var db = connect('test');   //链接数据库 相当于 use test
// db.info.insert(jsonDdatabase);  //插入数据 新建 info 数据集合并插入数据
// print('[demo]info  print success');  //没有错误显示成功

// db.runCommand() - 数据库运行命令的执行器
// db.info.update({"name": "lrh02"}, {$set: {money: 1000}}, false, true)
// false：是upsert的简写，代表没有此条数据时不增加。
// true：是multi的简写，代表修改所有。
// getLastError:1 —— 表示返回功能错误。更多从参数可以自行查找
// printjson(resultMessage)
// printjson：表示以json对象的格式输出到控制台

// findAndModify - 查找并修改
// var myModify = {
//   findAndModify: "info",
//   query: {name: 'lrh01'}, // 需要查询的条件/文档
//   update: {$set: {age: 18}},
//   new:true // 更新完成，查看结果。如果为 false 不进行结果查看
// };
// var ResultMessage = db.runCommand(myModify);
// printjson(ResultMessage); // 以json对象的格式输出到控制台

// 查询
// var workmate1 = {
//   name: 'JSPang',
//   age: 33,
//   sex: 1,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//     skillThree: 'PHP'
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate2 = {
//   name: 'ShengLei',
//   age: 31,
//   sex: 1,
//   job: 'JAVA后端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'J2EE',
//     skillThree: 'PPT'
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate3 = {
//   name: 'MinJie',
//   age: 18,
//   sex: 0,
//   job: 'UI',
//   skill: {
//     skillOne: 'PhotoShop',
//     skillTwo: 'UI',
//     skillThree: 'PPT'
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate4 = {
//   name: 'XiaoWang',
//   age: 25,
//   sex: 1,
//   job: 'UI',
//   skill: {
//     skillOne: 'PhotoShop',
//     skillTwo: 'UI',
//     skillThree: 'PPT'
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate5 = {
//   name: 'LiangPeng',
//   age: 28,
//   sex: 1,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate6 = {
//   name: 'HouFei',
//   age: 25,
//   sex: 0,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate7 = {
//   name: 'LiuYan',
//   age: 35,
//   sex: 0,
//   job: '美工',
//   skill: {
//     skillOne: 'PhotoShop',
//     skillTwo: 'CAD',
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate8 = {
//   name: 'DingLu',
//   age: 20,
//   sex: 0,
//   job: '美工',
//   skill: {
//     skillOne: 'PhotoShop',
//     skillTwo: 'CAD',
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate9 = {
//   name: 'JiaPeng',
//   age: 29,
//   sex: 1,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//     skillThree: 'PHP'
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var workmate10 = {
//   name: 'LiJia',
//   age: 26,
//   sex: 0,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//     skillThree: 'PHP'
//   },
//   regeditTime: new Date(),
//   interest: []
// }
// var db = connect('company'); // 连接数据库 相当于 company
// var workmateArray = [workmate1, workmate2, workmate3, workmate4, workmate5, workmate6, workmate7, workmate8, workmate9, workmate10];
// db.workmate.insert(workmateArray); // 插入数据  新建 workmate 数据集合并插入数据库
// print('[SUCCESS]：The data was inserted successfully'); //没有错误显示成功

// 数组查询数据
// var workmate1 = {
//   name: 'JSPang',
//   age: 33,
//   sex: 1,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//     skillThree: 'PHP'
//   },
//   regeditTime: new Date(),
//   interest: ['看电影', '看书', '吃美食', '钓鱼', '旅游']
// }
// var workmate2 = {
//   name: 'ShengLei',
//   age: 31,
//   sex: 1,
//   job: 'JAVA后端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'J2EE',
//     skillThree: 'PPT'
//   },
//   regeditTime: new Date(),
//   interest: ['篮球', '看电影', '做饭']
// }
// var workmate3 = {
//   name: 'MinJie',
//   age: 18,
//   sex: 0,
//   job: 'UI',
//   skill: {
//     skillOne: 'PhotoShop',
//     skillTwo: 'UI',
//     skillThree: 'PPT'
//   },
//   regeditTime: new Date(),
//   interest: ['做饭', '画画', '看电影']
// }
// var workmate4 = {
//   name: 'XiaoWang',
//   age: 25,
//   sex: 1,
//   job: 'UI',
//   skill: {
//     skillOne: 'PhotoShop',
//     skillTwo: 'UI',
//     skillThree: 'PPT'
//   },
//   regeditTime: new Date(),
//   interest: ['写代码', '篮球', '画画']
// }
// var workmate5 = {
//   name: 'LiangPeng',
//   age: 28,
//   sex: 1,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//   },
//   regeditTime: new Date(),
//   interest: ['玩游戏', '写代码', '做饭']
// }
// var workmate6 = {
//   name: 'HouFei',
//   age: 25,
//   sex: 0,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//   },
//   regeditTime: new Date(),
//   interest: ['化妆', '读书', '做饭']
// }
// var workmate7 = {
//   name: 'LiuYan',
//   age: 35,
//   sex: 0,
//   job: '美工',
//   skill: {
//     skillOne: 'PhotoShop',
//     skillTwo: 'CAD',
//   },
//   regeditTime: new Date(),
//   interest: ['画画', '聚会', '看电影']
// }
// var workmate8 = {
//   name: 'DingLu',
//   age: 20,
//   sex: 0,
//   job: '美工',
//   skill: {
//     skillOne: 'PhotoShop',
//     skillTwo: 'CAD',
//   },
//   regeditTime: new Date(),
//   interest: ['美食', '看电影', '做饭']
// }
// var workmate9 = {
//   name: 'JiaPeng',
//   age: 29,
//   sex: 1,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//     skillThree: 'PHP'
//   },
//   regeditTime: new Date(),
//   interest: ['写代码', '篮球', '游泳']
// }
// var workmate10 = {
//   name: 'LiJia',
//   age: 26,
//   sex: 0,
//   job: '前端',
//   skill: {
//     skillOne: 'HTML+CSS',
//     skillTwo: 'JavaScript',
//     skillThree: 'PHP'
//   },
//   regeditTime: new Date(),
//   interest: ['玩游戏', '美食', '篮球']
// }
// var db = connect('company');
// var workmateArray = [workmate1, workmate2, workmate3, workmate4, workmate5, workmate6, workmate7, workmate8, workmate9, workmate10];
// db.workmate.insert(workmateArray);
// print('[SUCCESS]：The data was inserted successfully');

// 构造百万级数据
// 生成随机数
// function GetRandomNum(min, max) {
//   let range = max - min; //得到随机数区间
//   let rand = Math.random(); //得到随机值
//   return (min + Math.round(rand * range)); //最小值+随机数取整
// }
// // console.log(GetRandomNum(10000,99999));
// // 生成随机用户名
// function GetRadomUserName(min, max) {
//   let tempStringArray = "123456789qwertyuiopasdfghjklzxcvbnm".split(""); //构造生成时的字母库数组
//   let outPuttext = ""; // 最后输出的变量
//   // 进行循环，随机生产用户名的长度，这里需要生成随机数方法的配合
//   for (let i = 1; i < GetRandomNum(min, max); i++) {
//     // 随机抽取字母，拼装成需要的用户名
//     outPuttext = outPuttext + tempStringArray[GetRandomNum(0, tempStringArray.length)]
//   }
//   return outPuttext;
// }
// // console.log(GetRadomUserName(7,16))
// var startTime = (new Date()).getTime();
// var db = connect('company');
// db.randomInfo.drop();
// var tempInfo = [];
// for (let i = 0; i < 2000000; i++) {
//   tempInfo.push({
//     username: GetRadomUserName(7, 16),
//     regeditTime: new Date(),
//     randNum0: GetRandomNum(100000, 999999),
//     randNum1: GetRandomNum(100000, 999999),
//     randNum2: GetRandomNum(100000, 999999),
//     randNum3: GetRandomNum(100000, 999999),
//     randNum4: GetRandomNum(100000, 999999),
//     randNum5: GetRandomNum(100000, 999999),
//     randNum6: GetRandomNum(100000, 999999),
//     randNum7: GetRandomNum(100000, 999999),
//     randNum8: GetRandomNum(100000, 999999),
//     randNum9: GetRandomNum(100000, 999999)
//   })
// }
// db.randomInfo.insert(tempInfo);
// var endTime = (new Date()).getTime() - startTime;
// print("[dome]:---------->" + endTime + "ms");

// 普通查询200万条数据 - 性能
// var startTime = new Date().getTime() //得到程序运行的开始时间
// var db = connect('company') //链接数据库
// var rs = db.randomInfo.find({
//   username: "763k2xe78s7"
// }) //根据用户名查找用户
// rs.forEach(rs => {
//   printjson(rs)
// }) //循环输出
// var runTime = new Date().getTime() - startTime; //得到程序运行时间
// print('[SUCCESS]This run time is:' + runTime + 'ms') //打印出运行时间

// 两个索引同时查询
// var startTime = new Date().getTime();
// var db = connect('company');
// var rs = db.randomInfo.find({
//   username: '7xwb8y3',
//   randNum0: 565509
// });
// rs.forEach(rs => {
//   printjson(rs)
// });
// var runTime = new Date().getTime() - startTime;
// print('[Demo]this run time is ' + runTime + 'ms');

// 指定索引查询（hint）
// var startTime = new Date().getTime();
// var db = connect('company');
// var rs = db.randomInfo.find({
//   username: '7xwb8y3',
//   randNum0: 565509
// }).hint({
//   randNum0: 1
// });
// rs.forEach(rs => {
//   printjson(rs)
// });
// var runTime = new Date().getTime() - startTime;
// print('[Demo]this run time is ' + runTime + 'ms');
