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

/**
 * @route PUT sqlApi/product/update
 * @desc 更新接口列表
 * @access 接口是公开的
 */
router.put("/update", async ctx => {
  console.log(ctx.request.body, "---")
  // 修改的数据集合
  const values = {
    product_name: ctx.request.body.name,
    product_price: ctx.request.body.price
  }
  // where用于限制修改的数据的条件
  const opts = {
    where: { num: ctx.request.body.num }
  }

  const data = await Product.update(values, opts)
  console.log(data, "----666")
  ctx.body = {
    type: "success",
    status: 200,
    message: "更新成功"
  }
})

/**
 * @route DELECT sqlApi/product/delete
 * @desc 删除商品接口
 * @access 接口是公开的
 */
router.delete("/delete", async ctx => {
  console.log(ctx.request.body, "---")
  // 删除的条件
  const opts = {
    where: { num: ctx.request.body.num }
  }
  const data = await Product.destroy(opts)
  console.log(data, "---")
  ctx.body = {
    type: "success",
    status: 200,
    message: "删除成功"
  }
})

// 暴露API接口
module.exports = router.routes()
