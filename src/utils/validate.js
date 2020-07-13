/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}
/**
 * 验证是否整数
 * @param {*} s
 */
export function isInteger (rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'))
  }
  setTimeout(() => {
    if (!Number(value)) {
    callback(new Error('请输入正整数'))
  } else {
    const re = /^[0-9]*[1-9][0-9]*$/
    const rsCheck = re.test(value)
    if (!rsCheck) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }
}, 1000)
}
/**
 * 验证是否是[0-1]的小数
 * @param {*} s
 */
export function isDecimal (rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
    callback(new Error('请输入数字'));
  } else {
    if (value < 0 || value > 1) {
      callback(new Error('请输入(0,1]之间的数字'));
    } else {
      callback();
    }
  }
}, 1000);
}
