// 引入mongoose
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// 定义一个Schema数据模型
const DomainSchema = new Schema({
  domainName: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    default: 0
  },
  remark: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Domain = mongoose.model("domains", DomainSchema)
