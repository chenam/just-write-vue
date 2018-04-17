const express = require('express')
const apiRoutes = express.Router();

/*引入统一接口格式*/
var RestResult = require('../../RestResult.js');
/*引入统一分页查询接口*/
var PageQuery = require('../../common/pageQuery.js');
/*引入格式化日期*/
var moment = require("moment");
/*引入上传图片的组件*/
var multer = require("../../multer.js");
/*引入qiniu*/
var qiniu = require("qiniu");

const Models = require('../../db/db.js');

var uploadFun = require('../../common/upload.js');

apiRoutes.all("*", function(req, res, next) {
  // res.writeHead(200, { "Content-Type": "text/plain" })
  // db.init(next)
  next()
});

/**
 * [获取文章列表]
 * @param  {[type]} '/api/tag/getTagList' [description]
 * @param  {[type]} (req,res)                     [description]
 * @param  {[type]} (err,                         doc           [description]
 * @return {[type]}                               [description]
 */
apiRoutes.post('/api/front/getArticle',(req,res) => {
    let restResult = new RestResult(); 

    let _pageSize = parseInt(req.body.pageSize);
    let _pageStart = parseInt(req.body.pageStart);
    let _title = req.body.title;
    let _content = req.body.content;

    const reg = new RegExp(_title,'i'); //不区分大小写
    const reg1 = new RegExp(_content,'i'); //不区分大小写
    
    // 查询条件
    let searchData = {
        // 'isPublish':{$regex:reg},'content':{$regex:reg1}
        isPublish : true
    };
    // 排序方式//-1是降序,1是升序
    let sortData = {
        modifyDate : -1
    }
    PageQuery(_pageStart,_pageSize,Models.Article,'',searchData,sortData,(err,$page)=>{

        if(err){
            restResult.errorMsg = err.codeName;
        }else{
            restResult.success = true;
            // 时间格式转换
            if($page.list.length > 0 ){
                $page.list.forEach((val,ind,arr)=>{
                    
                    let _data = moment(val.modifyDate).utcOffset(8).format('YYYY-MM-DD');
                    val.modifyDateStr = _data;
                    console.log(val.modifyDateStr,'1');
                    console.log(val);
                });
                // console.log($page);
            };
            
            restResult.data = $page;
        }
        res.send(restResult);
    })

});

module.exports = apiRoutes