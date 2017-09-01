const mongoose = require('mongoose').set('debug', true);
var moment = require("moment");

const Schema = mongoose.Schema;

// 文章模型
const ArticleSchema = new Schema({
    // 文章标题
    title : String,
    // 文章内容（源内容）
    content : String, 
    // 文章内容（html代码）
    contentHTML : String,
    // 日期，废弃字段
    date : Date,
    // 封面路径
    imgUrl : String,
    // 是否发布
    isPublish : {
        type : Boolean,
        default : false
    },
    // 创建日期
    createDate : {
        type:Date,
        default:Date.now()
    },
    // 修改日期
    modifyDate : {
        type:Date,
        default:Date.now()
    } 
},{
    versionKey:false,
    timestamps:{createDate : 'createDate',modifyDate : 'modifyDate'}
})


// 标签模型
const TagSchema = new Schema({
    // 标签名称
    tagName : String,
    // 创建日期
    createDate : {
        type:Date,
        default:Date.now()
    },
    // 修改日期
    modifyDate : {
        type:Date,
        default:Date.now()
    } 
},{
    versionKey:false,
    timestamps:{createAt : 'createDate',updatedAt : 'modifyDate'}
});

// 类别模型
const categorySchema = new Schema({
    // 标签名称
    categoryName : String,
    // 创建日期
    createDate : {
        type:Date,
        default:Date.now()
    },
    // 修改日期
    modifyDate : {
        type:Date,
        default:Date.now()
    } 
},{
    versionKey:false,
    timestamps:{createAt : 'createDate',updatedAt : 'modifyDate'}
})



// 用户模型
const UserSchema = new Schema({
    // 用户名称
    tagName : String,
    // 创建日期
    createDate : {
        type:Date,
        default:Date.now()
    },
    // 修改日期
    modifyDate : {
        type:Date,
        default:Date.now()
    } 
},{
    versionKey:false,
    timestamps:{createAt : 'createDate',updatedAt : 'modifyDate'}
});

// model
const Models = {
    Article : mongoose.model('Article',ArticleSchema),
    Tag : mongoose.model('Tag',TagSchema),
    Category : mongoose.model('Category',categorySchema)
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