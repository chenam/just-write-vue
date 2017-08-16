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
    apiRoutes.get('/api/article/getArticleList',(req,res) => {
        Models.Article.find({}, (err, doc) => {
            if(err){
                console.log("error",err);
            }else if (doc){ 
                res.send(JSON.stringify(doc));
            };
        });

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

        res.set('Content-Type','application/json');
        /*
            post请求获取参数使用req.body
            get请求获取参数使用req.query.xxx
        */
        const article = {
            title: req.body.title,
            content: req.body.content,
            date: new Date(),
        }
        Models.Article(article)
        .save()
        .then((doc)=>{
            res.send(JSON.stringify(doc))
            res.status(200).end();
        })
        .catch(() => res.status(500).end())
    });


}