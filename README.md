### node.js接口API（增删改查）

> 用`mongoose`操作`mongoDB`数据库
> 用`sequelize`操作`MYSQL`数据库

package.json的script配置
```js
"scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js",
    "server": "nodemon app.js"
  }
```

 > 运行`npm run server`启动app.js文件，连接`mongoDB`数据库
 > 运行`nom run dev`启动index.js文件，连接`MYSQL`数据库

 - sqlModels 文件夹中定义的是sequelize的model数据模型
 - models 文件夹中定义的是mongoose的model数据模型

 - mysqlApi 文件夹中的是操作`MYSQL`数据库的接口`API`
 - api 文件夹中的是操作`mongoDB`数据库的接口`API`
