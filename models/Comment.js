// 引入mongoose
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// 定义一个Schema数据模型
const CommentSchema = new Schema({
  // 用户名
  userName: {
    type: String,
    require: true
  },
  // 头像的url地址
  avatar: {
    type: String,
    default: "https://github.githubassets.com/images/icons/emoji/octocat.png"
  },
  // 评论内容
  desc: {
    type: String,
    require: true
  },
  // 创建日期
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Comment = mongoose.model("comments", CommentSchema)
