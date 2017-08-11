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

var route = require("./api/index.js");

var app = express();

route(app);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// app.use(api);

app.listen(8088);
console.log('success listening');