const Sequelize = require("sequelize")
const sequelize = require("../config/sqlConfig") // 连接数据库的配置

// 数据模型
const Product = sequelize.define(
  "product_info", // 自定义的数据库表名
  {
    id: {
      type: Sequelize.STRING(32)
    },
    num: {
      type: Sequelize.INTEGER,
      autoIncrement: true, //自增(注意：设置为自增的项必须为主键且类型为INTEGER数字型)
      primaryKey: true //主键
    },
    product_price: Sequelize.INTEGER,
    product_name: Sequelize.STRING,
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE
  },
  {
    timestamps: false // 关闭Sequelize的自动添加timestamp的功能
  }
)

module.exports = Product
