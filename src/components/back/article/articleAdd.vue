<template>
    <div class="index">
        <!-- 面包屑 -->
        <div class="pb20">
            <Breadcrumb>
                    <Breadcrumb-item href="/admin/article/articleTable">文章管理</Breadcrumb-item>
                    <Breadcrumb-item >新增文章</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!-- 列表 -->
        <Form :model="formItem" :label-width="80" class='formWrapper'>
            <Form-item label="文章标题：">
                <Input v-model="formItem.title" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="内容：">
                <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click='handleAdd'>确定</Button>
                <Button type="ghost" style="margin-left: 8px"><router-link to='/admin/article/articleTable'>取消</router-link></Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
import $ from 'jquery';
import qs from 'qs';
import { addArticle } from '../../../api/api.js';
export default {
    name: 'addArticle',
    data () {
        return {
            formItem: {
                title: '',
                content: ''
            }
            
        }
    },
    created(){
        this.init();
        setTimeout(()=>{
            // console.log($('.pb10'));
        },1000)
    },
    methods : {
        init(){
        },
        // 添加文章
        handleAdd(){
            const self = this;
            
            let param = {
                title : self.formItem.title,
                content : self.formItem.content
            }
            // $.ajax({
            //     url:'/api/article/addArticle',
            //     type:'post',
            //     dataType:'json',
            //     data:{
            //         title: self.formItem.title,
            //         content: self.formItem.content
            //     },
            //     success:function(res){
            //         console.log(res);
            //     },
            //     error:function(res){

            //     }
            // })
            console.log(qs.stringify(param))
            var _param = qs.stringify(param);
            addArticle(_param)
                .then( (res) => {
                    console.log(res.body);
                })
                .catch( (err) => {
                    console.log(err);
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.formWrapper{
    max-width: 800px;
}

</style>
