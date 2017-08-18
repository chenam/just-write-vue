// const article = require('./article.js')
// // const draft = require('./draft.js')
// // const tag = require('./tag.js')
// // const comment = require('./comment')
// // const login = require('./login')
// // const user = require('./user')

// module.exports = (app) => {
//     app.use(article)
//     // app.use(draft)
//     // app.use(tag)
//     // app.use(comment)
//     // app.use(login)
//     // app.use(user)
// }

/*引入统一接口格式*/
var RestResult = require('../RestResult.js');
/*引入统一分页查询接口*/
var PageQuery = require('../common/pageQuery.js');
// 引入格式化日期
var moment = require("moment");

const Models = require('../db/db.js');
module.exports = function(apiRoutes){
    apiRoutes.all("*", function(req, res, next) {
      // res.writeHead(200, { "Content-Type": "text/plain" })
      // db.init(next)
      next()
    });
    
    /**
     * [获取文章列表]
     * @param  {[type]} '/api/article/getArticleList' [description]
     * @param  {[type]} (req,res)                     [description]
     * @param  {[type]} (err,                         doc           [description]
     * @return {[type]}                               [description]
     */
    apiRoutes.post('/api/article/getArticleList',(req,res) => {
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
    apiRoutes.post('/api/article/addArticle',(req, res) => {

        let restResult = new RestResult(); 

        res.set('Content-Type','application/json');
        /*
            post请求获取参数使用req.body
            get请求获取参数使用req.query.xxx
        */
        let _title = req.body.title;
        let _content = req.body.content;
        // 参数校验
        if(!_title || !_content){
            restResult.errorMsg = "参数为空";
            res.send(restResult);  
            return;
        }
        const article = {
            title: req.body.title,
            content: req.body.content,
            createDate : new Date(),
            modifyDate : new Date()
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
            modifyDate : new Date()
        }
        // 更新
        Models.Article.update({_id:_articleId,}, _newData,(err,doc) => {
            
            if(err){
                restResult.errorMsg = err.name;
            }else if(doc){
                restResult.success = true;
                restResult.data = doc;
                restResult.msg = "修改成功";
                // res.status(200).end();
            };
            res.send(restResult);
        });
    });


}