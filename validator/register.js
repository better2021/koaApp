const validator = require("validator")
const isEmpty = require("./isEmpty")

module.exports = function validatorRegister(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ""
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""
  data.password2 = !isEmpty(data.password2) ? data.password2 : ""

  if (validator.isEmpty(data.name)) {
    errors.msg = "名字不能为空"
  }

  if (!validator.isEmail(data.email)) {
    errors.msg = "邮箱格式不正确"
  }
  if (validator.isEmpty(data.email)) {
    errors.msg = "邮箱不能为空"
  }

  if (validator.isEmpty(data.password)) {
    errors.msg = "密码不能为空"
  }

  if (validator.isEmpty(data.password2)) {
    errors.msg = "password2密码不能为空"
  }

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.msg = "名字的长度不能小于2位，且不能超过30位"
  }

  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.msg = "password的长度不能小于6位，且不能超过20位"
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.msg = "两次输入的密码不一致"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
