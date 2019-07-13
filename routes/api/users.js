const Router = require("koa-router")
const router = new Router()

const gravatar = require("gravatar")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const password = require("koa-passport")
const tools = require("../../config/tools")

// 引入User
const User = require("../../models/User")

// 引入验证
const validatorRegister = require("../../validator/register")

/**
 * @route GET api/users/list
 * @desc 查询接口地址
 * @access 接口是公开的
 */
router.get("/list", async ctx => {
  ctx.status = 200
  console.log(ctx.query, "--") // ctx.query 获取get请求传来的参数
  let findResult
  if (!Object.keys(ctx.query).length) {
    findResult = await User.find({}).sort({ _id: -1 }) // 返回全部数据,默认为正序，设置 sort({ _id: -1 }) 则为倒序
  } else {
    findResult = await User.find({
      // 查询条件
      name: { $regex: ctx.query.name, $options: "$i" } // $regex 用于模糊查询;$options: "$i"用于忽略大小写
    })
  }

  ctx.body = findResult
  // console.log(findResult)
})

/**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post("/register", async ctx => {
  console.log(ctx.request.body, "body")

  const { errors, isValid } = validatorRegister(ctx.request.body)

  // 判断是否验证通过
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }

  // 存储到数据库
  const findResult = await User.find({ email: ctx.request.body.email })
  // console.log(findResult)
  if (findResult.length > 0) {
    ctx.status = 500
    ctx.body = { email: "邮箱已被占用" }
  } else {
    ctx.status = 200
    const avatar = gravatar.url(ctx.request.body.email, {
      s: "200",
      r: "pg",
      d: "mm" // 默认头像
    })
    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      avatar,
      password: tools.enbcrypt(ctx.request.body.password)
    })
    console.log(newUser)
    // 存储到数据库
    await newUser
      .save()
      .then(user => {
        ctx.body = user
        console.log(ctx)
      })
      .catch(err => {
        console.log(err)
      })

    // 返回json数据
    ctx.body = newUser
  }
})

/**
 * @route POST api/users/login
 * @desc 登录接口地址 返回token
 * @access 接口是公开的
 */
router.post("/login", async ctx => {
  // 查询
  const findResult = await User.find({ email: ctx.request.body.email })
  const user = findResult[0]
  const password = ctx.request.body.password

  // 判断查到没
  if (findResult.length === 0) {
    ctx.status = 401
    ctx.body = { email: "用户不存在" }
  } else {
    // 查到后验证密码
    let result = await bcrypt.compareSync(password, user.password)
    // 验证通过
    if (result) {
      // 返回token
      const payload = { id: user.id, name: user.name, avatar: user.avatar }
      const token = jwt.sign(payload, "secret", { expiresIn: 3600 * 24 }) // expiresIn: 3600 过期时间3600s

      ctx.status = 200
      ctx.body = { success: true, token: "Bearer " + token } // 返回状态和token值
    } else {
      ctx.status = 400
      ctx.body = { password: "密码错误" }
    }
  }
})

/**
 * @route GET api/users/current
 * @desc 用户信息接口地址
 * @access 接口是私密的
 */
router.get(
  "/current",
  password.authenticate("jwt", { session: false }),
  async ctx => {
    ctx.status = 200
    ctx.body = {
      id: ctx.state.user.id,
      name: ctx.state.user.name,
      email: ctx.state.user.email,
      avatar: ctx.state.user.avatar
    }
  }
)

/**
 * @route PUT api/users/update
 * @desc 更新接口地址
 * @access 接口是公开的
 */
router.put("/update", async ctx => {
  console.log(ctx.request.body, "--")
  ctx.status = 200
  // 更新的条件
  const conditions = { _id: ctx.request.body.id }
  // 要更新的数据
  const update = {
    name: ctx.request.body.name,
    email: ctx.request.body.email
  }

  if (!ctx.request.body.id) {
    ctx.body = {
      type: "error",
      status: 401,
      message: "缺少参数id"
    }
    return false
  }

  await User.updateOne(conditions, update, err => {
    if (err) {
      throw Error(err)
    } else {
      ctx.body = {
        type: "success",
        message: "更新成功"
      }
    }
  })
})

/**
 * @route DELETE api/users/delete
 * @desc 删除接口地址
 * @access 接口是公开的
 */
router.delete("/delete", async ctx => {
  console.log(ctx.request.body, "--")
  ctx.status = 200
  const id = ctx.request.body.id
  await User.deleteOne({ _id: id }, err => {
    if (err) {
      throw error(err)
    } else {
      ctx.body = {
        type: "success",
        status: 200,
        message: "删除成功"
      }
    }
  })
})

module.exports = router.routes()
