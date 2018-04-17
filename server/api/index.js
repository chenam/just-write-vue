const backArticle = require('./back/article.js');
const frontArticle = require('./front/index.js');

module.exports = (app) => {
    app.use(backArticle);
    app.use(frontArticle);
}