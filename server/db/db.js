const mongoose = require('mongoose').set('debug', true);
var moment = require("moment");

const Schema = mongoose.Schema;

// 文章模型
const ArticleSchema = new Schema({
    title : String,
    content : String, 
    date : Date,
    createDate : {
        type:Date,
        default:moment().format('YYYY-MM-DD HH:mm:ss')
    },
    modifyDate : {
        type:Date,
        default:moment().format('YYYY-MM-DD HH:mm:ss')
    } 
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