/**
 * node的短信验证码接口
 * 采用的聚合短信API服务
 * AppKey：a682053f85be18f17ccb6ae33966e0a2 (聚合短信接口的key)
 * 模板id：175585
 * 只有10条免费短信
 */

const Router = require("koa-router")
const request = require("request")
const querystring = require("querystring")
const router = new Router()

router.post("/message", async (ctx, next) => {
  console.log(ctx.request.body, "---")
  const code = Math.random()
    .toString()
    .slice(-6)

  let queryData = querystring.stringify({
    mobile: ctx.request.body.mobile, // 接受短信的用户手机号码
    tpl_id: "175624", // 您申请的短信模板ID，根据实际情况修改
    tpl_value: `#code#=${code}`, // 您设置的模板变量，根据实际情况修改
    key: "1072ae45fd5cf0f469029c197a6e0733" // 应用APPKEY(应用详细页查询)
  })

  const queryUrl = "http://v.juhe.cn/sms/send?" + queryData

  request(queryUrl, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(body) // 打印接口返回内容
      const jsonObj = JSON.parse(body) // 解析接口返回的JSON内容
      console.log(jsonObj, "-*-")
    } else {
      console.log("请求异常")
    }
  })

  ctx.body = {
    type: "success",
    status: 200,
    message: "短信发送成功"
  }
})

module.exports = router.routes()
