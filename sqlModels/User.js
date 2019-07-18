const Sequelize = require("sequelize")
const sequelize = require("../config/sqlConfig") // 连接数据库的配置

// User数据模型
const User = sequelize.define(
  "users", // 数据库的users表
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, // 自增
      primaryKey: true // 主键
    },
    userName: {
      type: Sequelize.STRING,
      require: true
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: {
          msg: "邮箱格式不正确"
        }
      }
    },
    tel: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [11],
          msg: "手机号应为11位"
        }
      }
    },
    address: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [2, 30],
          msg: "产品名应为2至30位"
        }
      }
    },
    createTime: Sequelize.DATE
  }
)

module.exports = User
