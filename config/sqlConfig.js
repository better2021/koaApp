const Sequelize = require("sequelize")

// import mysql2 from "mysql2"
// if (options.dialect === "mysql") {
//   options.dialectModule = mysql2
// }
// new Sequelize(options)

//  连接数据库的config配置
const config = {
  host: "localhost", // 主机名
  username: "root", // 用户名
  password: "709463253", // 口令
  port: 3306, // 端口号，MySQL默认3306
  database: "test" // 使用哪个数据库
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql", // /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' 之一 */ 数据库类型
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

module.exports = sequelize
