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
 * [获取标签列表]
 * @param  {[type]} '/api/tag/getTagList' [description]
 * @param  {[type]} (req,res)                     [description]
 * @param  {[type]} (err,                         doc           [description]
 * @return {[type]}                               [description]
 */
apiRoutes.post('/api/tag/getTagList',(req,res) => {
    let restResult = new RestResult(); 

    let _pageSize = parseInt(req.body.pageSize);
    let _pageStart = parseInt(req.body.pageStart);
    let _title = req.body.title;
    let _content = req.body.content;

    const reg = new RegExp(_title,'i'); //不区分大小写
    const reg1 = new RegExp(_content,'i'); //不区分大小写
    
    // 查询条件
    let searchData = {
        'title':{$regex:reg},'content':{$regex:reg1}
        
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
            restResult.data = $page;
        }
        res.send(restResult);
    })

});

/**
 * [新增文章]
 * @param  {[type]}   '/api/article/addArticle' [description]
 * @param  title [标题]
 * @param  content [文章内容]
 * @param  date [创建日期]
 * @return {[type]}                             [description]
 */
apiRoutes.post('/api/tag/addTag',(req, res) => {

    let restResult = new RestResult(); 

    res.set('Content-Type','application/json');
    /*
        post请求获取参数使用req.body
        get请求获取参数使用req.query.xxx
    */
    let _title = req.body.title;
    let _content = req.body.content;
    let _contentHTML = req.body.content;
    // 参数校验
    if(!_title || !_content){
        restResult.errorMsg = "参数为空";
        res.send(restResult);  
        return;
    }
    const article = {
        title: req.body.title,
        content: req.body.content,
        contentHTML : req.body.contentHTML
        // createDate : new Date(),
        // modifyDate : new Date()
    }
    Models.Article(article)
    .save()
    .then((doc)=>{
        restResult.success = true;
        restResult.errorMsg = ""; 
        restResult.data = doc;
        restResult.msg = "新增成功";

        res.send(restResult); 
    })
    .catch(() => res.status(500).end())
});

/**
 * [根据id查询文章列表]
 * @param  {[type]} '/api/article/getArticleById' [description]
 * @param  {[articleId]}[文章id]
 * @return {[type]}                               [description]
 */
apiRoutes.post('/api/article/getArticleById',(req, res) => {

    let restResult = new RestResult(); 
   
    let _articleId = req.body.articleId.trim();

    // id未空
    if(!_articleId){
        restResult.errorMsg = "参数为空";
        res.send(restResult);  
        return; 
    }
    Models.Article.findById(req.body.articleId, (err,doc) => {
        
        if(err){
            restResult.errorMsg = err.name;
        }else if(doc){
            restResult.success = true;
            restResult.errorMsg = ""; 
            restResult.data = doc;
            // res.status(200).end();
        };
        res.send(restResult);
    });
});
/**
 * [修改文章]
 * @param  {[type]} '/api/article/editArticle' [description]
 * @param  {[articleId]}[文章id]
 * @param  {[title]}[文章标题]
 * @param  {[content]}[文章内容]
 * @return {[type]}                            [description]
 */
apiRoutes.post('/api/article/editArticle',(req, res) => {

    let restResult = new RestResult(); 
   
    let _articleId = req.body.articleId.trim();
    let _title = req.body.title.trim();
    let _content = req.body.content.trim();

    // id未空
    if(!_articleId || !_title || !_title){
        restResult.errorMsg = "参数为空";
        res.send(restResult);  
        return; 
    }

    let _newData = {
        title : _title,
        content : _content,
        // modifyDate : new Date()
    }
    // 更新
    Models.Article.update({_id:_articleId,}, _newData,(err,doc) => {
        
        if(err){
            restResult.errorMsg = err.name;
        }else if(doc){
            let _doc = doc; 
            restResult.success = true;
            _doc.modifyDate = _doc.modifyDate;
            restResult.data = doc;
            restResult.msg = "修改成功";
            // res.status(200).end();
        };
        res.send(restResult);
    });
});

/**
 * [删除文章]
 * @param  {[type]} '/api/article/removeArticle' [description]
 * @param  {[articleId]}[文章id]
 * @return {[type]}                            [description]
 */
apiRoutes.post('/api/article/removeArticle',(req, res) => {

    let restResult = new RestResult(); 
   
    let _articleId = req.body.articleId.trim();

    // id未空
    if(!_articleId){
        restResult.errorMsg = "参数为空";
        res.send(restResult);  
        return; 
    }

    // 删除                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    Models.Article.remove({_id:_articleId,},(err,doc) => {
        
        if(err){
            restResult.errorMsg = err.name;
        }else if(doc){
            let _doc = doc; 
            restResult.success = true;
            restResult.msg = "删除成功";
        };
        res.send(restResult);
    });
});

/**
 * [文章封面上传]
 * @param  {[type]} '/api/article/upload' [description]
 * @param  {[articleId]}[文章id]
 * @return {[type]}                            [description]
 */
apiRoutes.post('/api/article/upload',multer.single('cover'),(req, res) => {
    let readableStream = req.file; // 可读的流
    let key = req.file.originalname;
    let localFile = req.file.path;
    // 七牛返回的数据
    uploadFun(readableStream,key,localFile)
        .then((doc)=>{
            let restResult = new RestResult(); 
            if(req){

                restResult.success = true
                restResult.data = req.file;
                restResult.result = doc;
            }
            res.send(restResult);
        })
});
module.exports = apiRoutes