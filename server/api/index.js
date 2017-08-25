const article = require('./back/article.js');

module.exports = (app) => {
    app.use(article)
}