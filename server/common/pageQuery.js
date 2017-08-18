var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var async = require('async');

// 自定义分页查询通用方法
var pageQuery = function(pageStart,pageSize,Model,populate,queryParams,sortParams,callback){
    /**
     * @param  {pageStart} [开始条数]
     * @param  {pageSize} [每页页数]
     * @param  {Model} [数据模型]
     * @param  {populate} []
     * @param  {queryParams} [查询参数]
     * @param  {sortParams} [排序]
     * @param  {callback} [回调]
     */
    var $page = {

    }
    async.parallel({
        count : (done) => {// 查询数量
            Model.count(queryParams).exec((err,count) => {
                done(err,count)
            });
        },
        record : (done) => {// 查询一页的记录
            Model.find(queryParams).skip(pageStart).limit(pageSize).populate(populate).sort(sortParams).exec((err,doc) => {
                done(err,doc);
            });
        }
    },function(err,results){
        var count = results.count;
        $page.list = results.record;
        $page.count = results.count;
        callback(err,$page)
    })
}

module.exports = pageQuery