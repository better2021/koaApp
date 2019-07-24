const Sequelize = require("sequelize")
const sequelize = require("../config/sqlConfig") // 连接数据库的配置

// User数据模型
const Film = sequelize.define(
  "films", // 数据库的films表
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, // 自增
      primaryKey: true // 主键
    },
    filmName: {
      type: Sequelize.STRING(255),
      require: true
    },
    year: {
      type: Sequelize.INTEGER,
      require: true
    },
    actor: {
      type: Sequelize.STRING,
      require: true
    },
    desc: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [2, 100],
          msg: "产品名应为2至100位"
        }
      }
    },
    createTime: Sequelize.DATE
  }
)

module.exports = Film
