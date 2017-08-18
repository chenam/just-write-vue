<template>
    <div class="index">
        <!-- 面包屑 -->
        <div class="pb20">
            <Breadcrumb>
                    <Breadcrumb-item href="/admin/article/articleTable">文章管理</Breadcrumb-item>
                    <Breadcrumb-item >{{type=='edit'?"编辑文章":"新增文章"}}</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!-- 列表 -->
        <Form :model="formItem" :label-width="100" class='formWrapper' :rules="formItemValidate" ref='formItem'>
            <Form-item label="文章标题：" prop="title">
                <Input v-model="formItem.title" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="内容：" prop="content">
                <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click='handleArticle("formItem")'>确定</Button>
                <Button type="ghost" style="margin-left: 8px"><router-link to='/admin/article/articleTable'>取消</router-link></Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
import $ from 'jquery';
import qs from 'qs';
import { addArticle, queryArticleById, editArticle} from '../../../api/api.js';
export default {
    data () {
        return {
            formItem: {
                title: '',
                content: ''
            },
            formItemValidate: {
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入文章内容', trigger: 'blur' }
                ]
            }
            
        }
    },
    computed:{
        type(){
            return this.$route.query.type;
        },
        articleId(){
            if(this.$route.query.type == "edit"){
                return this.$route.query.articleId;
            }else{
                return '';
            };
        }
    },
    created(){
        this.init();
        if(this.type == "edit"){
            this.getDataById();
        }
    },
    methods : {
        init(){
        },
        // 根据id回填
        getDataById(){
            const self = this;
            let param = {
                articleId : self.$route.query.id
            };

            queryArticleById(qs.stringify(param))
                .then( (res) => {
                    let _data = res.data;
                    if(_data.success){
                        this.formItem = _data.data;
                    }else{
                        this.$Message.warning(_data.errorMsg);
                    };
                    
                })
                .catch( (err) => {
                    console.log(err);
                    
                })
        },
        // 添加文章
        handleArticle(name){
            const self = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 新增
                    if(this.type == "add"){
                        let param = {
                            title : self.formItem.title,
                            content : self.formItem.content
                        };
                        addArticle(qs.stringify(param))
                            .then( (res) => {
                                let _data = res.data;
                                if(_data.success){
                                    this.$Message.success(_data.msg);
                                    this.$router.push({
                                        path:'/admin/article/articleTable',
                                        query:{
                                        }
                                    })
                                }else{
                                    this.$Message.warning(_data.errorMsg);
                                }; 
                            })
                            .catch( (err) => {
                                console.log(err);
                            })
                    // 修改
                    }else{
                        let param = {
                            articleId : self.$route.query.id,
                            title : self.formItem.title,
                            content : self.formItem.content
                        }
                        console.log(param);
                        editArticle(qs.stringify(param))
                            .then( (res) => {
                                let _data = res.data;
                                if(_data.success){
                                    this.$Message.success(_data.msg);
                                    this.$router.push({
                                        path:'/admin/article/articleTable',
                                        query:{
                                        }
                                    })
                                }else{
                                    this.$Message.warning(_data.errorMsg);
                                }; 
                            })
                            .catch( (err) => {
                                console.log(err);
                            })
                    }
                    
                } else {
                }
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
