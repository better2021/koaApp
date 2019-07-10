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
 * @desc 列表接口地址
 * @access 接口是公开的
 */
router.get("/list", async ctx => {
  ctx.status = 200
  const findResult = await User.find({
    data: ctx.state.user
  })
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
    ctx.state = 400
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
    // 没查到
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
    ctx.status = 404
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
 * @route GET api/users/delete
 * @desc 删除接口地址
 * @access 接口是公开的
 */
router.delete("/delete", async ctx => {
  ctx.status = 200
  let flag = false
  await User.remove({ id }, err => {
    if (err) {
      flag = false
    } else {
      flag = true
    }
  })
  ctx.body = flag
})

module.exports = router.routes()
