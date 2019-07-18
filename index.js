const koa = require("koa")
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const sequelize = require("./config/sqlConfig") // 连接数据库的配置
const app = new koa()
const router = new Router()

const port = process.env.PORT || 3000
app.use(bodyParser()) // 处理post请求获取参数

// 引入product.js
const product = require("./routes/mysqlApi/product")
// 引入user.js
const user = require("./routes/mysqlApi/user")

// 配置路由地址
router.use("/sqlApi/product", product) //localhost:3000/sqlApi/product
router.use("/sqlApi/user", user) //localhost:3000/sqlApi/user

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

// 与数据库建立连接
sequelize
  .authenticate()
  .then(() => {
    console.log("MYSQL数据库连接成功")
  })
  .catch(err => {
    console.error("MYSQL数据库连接失败", err)
  })

// 路由
router.get("/", async ctx => {
  ctx.body = { msg: "MYSQL koa2" }
})

app.listen(port, () => {
  console.log(`listen to ${port}`)
})
