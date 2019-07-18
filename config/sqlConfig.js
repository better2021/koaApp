const Sequelize = require("sequelize")

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
    host: config.host, // 自定义链接地址，可以是ip或者域名，默认本机：localhost
    dialect: "mysql", // /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' 之一 */ 数据库类型
    // 数据库默认参数,全局参数
    define: {
      charset: "utf8", // 默认为utf-8的编码
      timestamps: false // 关闭Sequelize的自动添加timestamp的功能
    },
    pool: {
      // 连接池设置
      max: 5, // 最大连接数
      min: 0, // 最下连接数
      acquire: 30000,
      idle: 10000
    }
  }
)

module.exports = sequelize
