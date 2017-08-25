// 入口文件

// 引入编写好的api
// var api = require('./api/index.js');
// 引入文件模块
var fs = require('fs');
// 引入处理文件模块
var path = require('path');
//引入express
var express = require('express');
// 引入处理post数据的模块
var bodyParser = require('body-parser');
// 引入接口
var route = require("./api/index.js");
// 引入图片上传模块
var multer = require("multer");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

route(app);

app.listen(8088);
console.log('success listening');