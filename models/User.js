const mongoose = require("mongoose")
const Schema = mongoose.Schema

// 实例化数据模板(Schema数据库的模型)
const UserSchema = new Schema({
  name: {
    type: String,
    required: true // 必填
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now // 默认
  }
})

module.exports = User = mongoose.model("users", UserSchema)
