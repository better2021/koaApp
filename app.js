const koa = require("koa")
const Router = require("koa-router")
const mongoose = require("mongoose")
const bodyParser = require("koa-bodyparser")
const passport = require("koa-passport")
const cors = require("koa-cors")
const koaBody = require("koa-body")
// 实例化koa
const app = new koa()
const router = new Router()

app.use(bodyParser()) // 处理post请求获取参数
app.use(passport.initialize())
app.use(passport.session())
app.use(cors()) // 设置允许跨域

app.use(
  koaBody({
    multipart: true, // 是否支持 multipart-formdate 的表单
    formidable: {
      maxFieldsSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认为2M
    }
  })
)

// 回调到config文件中，passport.js
require("./config/passport")(passport)

// 引入users.js
const users = require("./routes/api/users")
// 引入domains.js
const domains = require("./routes/api/domains")
// 引入comment.js
const comments = require("./routes/api/comments")
// 引入uploadFile.js
const upload = require("./routes/api/uploadFile")

// 配置路由地址
router.use("/api/users", users) //localhost:5000/api/users
router.use("/api/domains", domains) //localhost:5000/api/domains
router.use("/api/comments", comments) //localhost:5000/api/comments
router.use("/api/uploadFile", upload) // localhost:5000/api/uploadFile

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 5000

const options = {
  useNewUrlParser: true,
  poolSize: 2,
  promiseLibrary: global.Promise
}

// 连接数据库mongoDB
mongoose
  .connect(
    // 27017
    "mongodb://localhost:27017/db",
    options
  )
  .then(() => {
    console.log("mongoDB数据库已连接!")
  })
  .catch(err => {
    console.log(err)
  })

// 路由
router.get("/", async ctx => {
  ctx.body = { msg: "Hello koa2" }
})

app.listen(port, () => {
  console.log(`listen to ${port}`)
})
