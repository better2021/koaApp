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
    product_price: {
      type: Sequelize.INTEGER,
      defaultValue: 0, //  默认值是0
      validate: {
        // 只允许数字
        isNumeric: {
          msg: "价格只能为数字"
        }
      }
    },
    product_name: {
      type: Sequelize.STRING,
      required: true,
      validate: {
        len: {
          args: [2, 20],
          msg: "产品名应为2至20位"
        }
      }
    },
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE
  }
)

module.exports = Product
