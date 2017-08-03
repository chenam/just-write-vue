import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// 文章模型
const Article = new Schema({
    title : String,
    content : String, 
    date : date
})

let db_URL = 'mongodb://localhost:/blog';
mongoose.connect(db_URL);

// 为这次链接绑定数据
const db = mongoose.connection;

// db.on('error',)