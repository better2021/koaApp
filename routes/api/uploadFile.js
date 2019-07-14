const Router = require("koa-router")
const router = new Router()
const fs = require("fs")
const path = require("path")
/**
 * 上传单个文件 POST api/uploadFile/upload
 * koa-body通过ctx.request.files 获取上传的文件
 */
router.post("/upload", async (ctx, next) => {
  console.log(ctx.request.files, "---")
  // 上传单个
  const file = ctx.request.files.file // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  let filePath = path.join(__dirname, "../../uploadImg") + `/${file.name}`
  // 创建可写流
  const upStream = fs.createWriteStream(filePath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  console.log(file.path, file.name, "*-*-*")
  return (ctx.body = {
    type: "success",
    status: 200,
    message: "上传成功",
    pathUrl: filePath
  })
})

//  暴露API接口
module.exports = router.routes()
