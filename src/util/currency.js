const digitsRE = /(\d{3})(?=\d)/g
// (?=exp)也叫零宽度正预测先行断言，它断言自身出现的位置的后面能匹配表达式exp。
//  可以理解为 ?= 是一个狂妄的预言家，假设有正则 /abc?=xxx/，它预言自己出现的位置后面一定、肯定、必须、只能是 xxx，如果不是，那它会以死明志的(就是匹配失败)。
// 那么：
// 1. (?=[^$]) 会匹配除字符除末尾所有的位置
// 2. /(\d{3})(?=[^$])/ 会匹配连续的三个数字，并且这三个数字不能在字符串的末尾

/**
 * [currency 金额格式化函数]
 * @param  {[type]} value    [传进来的值]
 * @param  {[type]} currency [货币符号]
 * @param  {[type]} decimals [小数位数]
 * @return {[type]}          [description]
 */
export function currency (value, currency, decimals) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  // isFinite() 函数用来判断被传入的参数值是否为一个【有限数值】
  // 如果参数是 NaN，正无穷大或者负无穷大，会返回false，其他返回 true。
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  // console.log('stringified', stringified)
  // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
  // _int 获取整数部分。例如: 15984.00 --> 15984
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  // console.log('_int', _int)
  // slice() 方法可从已有的数组中返回选定的元素。
  var i = _int.length % 3
  // 示例：15984  head 为 15,
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  // console.log('head', head)
  // _float 获取小数部分。例如：15984.00 --> .00
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  // console.log('_float', _float)
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}
