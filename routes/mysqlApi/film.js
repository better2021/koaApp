// 引入路由
const Router = require("koa-router")
const router = new Router()

const Sequelize = require("sequelize")
const Op = Sequelize.Op

// 引入film数据模型
const Film = require("../../sqlModels/Film")

/**
 * @route GET sqlApi/film/list
 * @desc film列表接口
 * @access 接口是公开的
 * 想要只选择某些属性,可以使用 attributes 选项
 * findAll({ attributes: ["userName", "tel"] }) 表示查询"userName", "tel"字段
 * Where - 指定筛选条件 例如whrer:{id:2}
 */

router.get("/list", async ctx => {
  console.log(ctx.query, "---")
  const pageNum = parseInt(ctx.query.pageNum) || 1 // 必传
  const pageSize = parseInt(ctx.query.pageSize) || 10 // 必传
  const keyWord = ctx.query.filmName // filmName必传
  // findAndCountAll可以返回数据的总条数count
  const data = await Film.findAndCountAll({
    order: [["createTime", "DESC"]], // DESC为倒序
    where: {
      filmName: {
        [Op.like]: `%${keyWord}%` // 根据keyWord迷糊查询
      }
    },
    offset: (pageNum - 1) * pageSize,
    limit: pageSize || 10
  })

  // console.log(data, "6969")

  ctx.body = {
    type: "success",
    status: 200,
    message: "请求成功哟",
    list: data.rows,
    attributes: {
      page: pageNum,
      total: data.count // 总条数
    }
  }
})

/**
 * @route POST sqlApi/film/create
 * @desc 创建film接口
 * @access 接口是公开的
 */

router.post("/create", async ctx => {
  console.log(ctx.query, "--")
  const filmList = {
    filmName: ctx.request.body.filmName,
    year: ctx.request.body.year,
    actor: ctx.request.body.actor,
    desc: ctx.request.body.desc
  }
  const data = await Film.create(filmList)

  ctx.body = {
    type: "sueess",
    status: 200,
    message: "创建成功",
    list: data
  }
})

/**
 * @route PUT sqlApi/film/update
 * @desc 更新flim接口
 * @access 接口是公开的
 */

router.put("/update", async ctx => {
  console.log(ctx.request.body, "--")
  const id = ctx.request.body.id
  if (!id) {
    ctx.body = {
      type: "error",
      status: 400,
      message: "缺少必传参数"
    }
  }

  // 需要修改的数据集合
  const values = {
    filmName: ctx.request.body.filmName,
    year: ctx.request.body.year,
    actor: ctx.request.body.actor,
    desc: ctx.request.body.desc
  }

  await Film.update(values, { where: { id } })
  ctx.body = {
    type: "success",
    status: 200,
    message: "更新成功"
  }
})

/**
 * @route DELECT sqlApi/film/delete
 * @desc 删除接口
 * @access 接口是公开的
 */
router.delete("/delete", async ctx => {
  console.log(ctx.request.body, "--")
  const id = ctx.request.body.id
  if (!id) {
    ctx.body = {
      type: "error",
      status: 400,
      message: "缺少必传参数id"
    }
  }

  await Film.destroy({
    where: { id }
  })

  ctx.body = {
    type: "success",
    status: 200,
    message: "删除成功"
  }
})

module.exports = router.routes()
