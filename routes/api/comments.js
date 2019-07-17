// 引入路由
const Router = require("koa-router")
const router = new Router()

// 引入Comment数据模型
const Comment = require("../../models/Comment")

/**
 * @route GET api/comments/list
 * @desc 列表接口地址
 * @access 接口是公开的
 */

router.get("/list", async ctx => {
  ctx.status = 200
  console.log(ctx.query, "--") // ctx.query 获取get请求传来的参数
  let findResult
  if (!Object.keys(ctx.query).length) {
    findResult = await Comment.find({}).sort({ _id: -1 }) // 返回全部数据,默认为正序，设置 sort({ _id: -1 }) 则为倒序
  } else {
    findResult = await Comment.find({
      // 查询条件
      userName: { $regex: ctx.query.userName, $options: "$i" } // $regex 用于模糊查询;$options: "$i"用于忽略大小写
    })
  }

  ctx.body = {
    type: "success",
    status: 200,
    message: "请求成功",
    list: findResult
  }
  // console.log(findResult)
})

/**
 * @route POST api/comments/create
 * @desc 创建列表接口地址
 * @access 接口是公开的
 */
router.post("/create", async ctx => {
  console.log(ctx.request.body, "body")
  const newComment = new Comment({
    userName: ctx.request.body.userName,
    avatar: ctx.request.body.avatar,
    desc: ctx.request.body.desc
  })

  //  存储到数据库
  await newComment
    .save()
    .then(res => {
      console.log(res, "666")
      ctx.body = res
    })
    .catch(err => {
      console.log(err)
    })
})

/**
 * @route PUT api/comments/update
 * @desc 更新接口地址
 * @access 接口是公开的
 */
router.put("/update", async ctx => {
  console.log(ctx.request.body, "--")
  //更新条件
  const conditions = { _id: ctx.request.body.id }
  // 需要更新的数据
  const update = {
    userName: ctx.request.body.userName,
    avatar: ctx.request.body.avatar,
    desc: ctx.request.body.desc
  }
  if (!ctx.request.body.id) {
    ctx.body = {
      type: "error",
      status: 401,
      message: "缺少参数id"
    }
    return false
  }
  await Comment.updateOne(conditions, update, err => {
    if (err) throw Error(err)
    ctx.body = {
      type: "success",
      status: 200,
      message: "更新成功"
    }
  })
})

/**
 * @route DELETE api/comments/delete
 * @desc 删除接口地址
 * @access 接口是公开的
 */
router.delete("/delete", async ctx => {
  console.log(ctx.request.body, "---")
  const id = ctx.request.body.id
  if (!id) {
    ctx.body = {
      status: 400,
      type: "error",
      message: "缺少必要参数id"
    }
    return false
  }
  await Comment.deleteOne({ _id: id }, err => {
    if (err) throw Error(err)
    ctx.body = {
      status: 200,
      type: "success",
      message: "删除成功"
    }
  })
})

//  暴露API接口
module.exports = router.routes()
