const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

// 文章模型
const ArticleSchema = new Schema({
    title : String,
    content : String, 
    date : Date,
    createDate : Date,
    modifyDate : Date 
})

const Models = {
    Article : mongoose.model('Article',ArticleSchema)
};

let db_URL = 'mongodb://127.0.0.1:/blog';

mongoose.connect(db_URL);

// 为这次链接绑定数据
const db = mongoose.connection;

db.on('error',console.error.bind(console,'Database connection error.'));

db.once('open', ()=>{
    console.log('The database has connected.')
});

module.exports = Models;