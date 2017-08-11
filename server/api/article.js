const express = require('express');
const router = express.Router();

// 发布文章
router.post('/api/addArticle',(req, res) => {
    const article = {
        title: req.body.title,
        content: req.body.content,
        date: Date(),
    }
    new db.Article(article).save()
    res.status(200).send('succeed in saving new passage.')
})