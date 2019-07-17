// 引入路由
const Router = require("koa-router")
const router = new Router()

const Product = require("../../sqlModels/Product")
/**
 * @route GET sqlApi/product/list
 * @desc 列表接口地址
 * @access 接口是公开的
 */

router.get("/list", async ctx => {
  console.log(ctx.query, "查询传来的参数") // ctx.query 获取get请求传来的参数
  const data = await Product.findAll({})

  ctx.body = {
    type: "success",
    status: 200,
    message: "请求成功",
    list: data
  }
})

/**
 * @route POST sqlApi/product/create
 * @desc 创建接口列表
 * @access 接口是公开的
 */
router.post("/create", async ctx => {
  console.log(ctx.request.body, "----")
  const now = Date.now()
  const data = await Product.create({
    id: "id-" + now,
    product_name: ctx.request.body.name,
    product_price: ctx.request.body.price
  })

  ctx.body = {
    type: "success",
    status: 200,
    message: "创建成功",
    list: data
  }
})

// 暴露API接口
module.exports = router.routes()
