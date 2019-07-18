// 引入路由
const Router = require("koa-router")
const router = new Router()

// 引入user数据模型
const User = require("../../sqlModels/User")

/**
 * @route GET sqlApi/user/list
 * @desc user列表接口
 * @access 接口是公开的
 * 想要只选择某些属性,可以使用 attributes 选项
 * findAll({ attributes: ["userName", "tel"] })
 */

router.get("/list", async ctx => {
  console.log(ctx.query, "--")
  const data = await User.findAll()

  ctx.body = {
    type: "success",
    status: 200,
    message: "请求成功",
    list: data
  }
})

/**
 * @route POST sqlApi/user/create
 * @desc 创建user接口
 * @access 接口是公开的
 */
router.post("/create", async ctx => {
  console.log(ctx.request.body, "---")

  const findResult = await User.findAll({
    where: { email: ctx.request.body.email }
  })
  // 此邮箱已有
  if (findResult.length > 0) {
    ctx.body = {
      type: "error",
      status: 400,
      message: "此邮箱已占用"
    }
    return false
  }

  const userList = {
    userName: ctx.request.body.userName,
    email: ctx.request.body.email,
    tel: ctx.request.body.tel,
    address: ctx.request.body.address
  }

  const data = await User.create(userList)

  ctx.body = {
    type: "success",
    status: 200,
    message: "创建成功",
    list: data
  }
})

/**
 * @route PUT sqlApi/user/update
 * @desc 更新user接口
 * @access 接口是公开的
 */

router.put("/update", async ctx => {
  console.log(ctx.request.body, "---")
  // 修改的数据集合
  const values = {
    userName: ctx.request.body.userName,
    email: ctx.request.body.email,
    tel: ctx.request.body.tel,
    address: ctx.request.body.address
  }
  // where用于限制修改的数据的条件
  const opts = {
    where: { id: ctx.request.body.id }
  }

  await User.update(values, opts)

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
  // 删除条件
  const opts = {
    where: {
      id: ctx.request.body.id
    }
  }
  await User.destroy(opts)

  ctx.body = {
    type: "success",
    status: 200,
    message: "删除成功"
  }
})
// 暴露API接口
module.exports = router.routes()
