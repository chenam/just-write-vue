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
            <Form-item label="文章标题：" prop="title" class='title'>
                <Input v-model="formItem.title" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="内容：" prop="content">
                <div >
                    <mavon-editor 
                        style="height: 100%" 
                        v-model="formItem.content" 
                        class="editor" 
                        ref="mavonEditor"
                        @change='getCode'
                        @imgAdd="$imgAdd" 
                        @imgDel="$imgDel"
                        ></mavon-editor>
                </div>
            </Form-item>
            <Form-item label="封面图：" >
               
                <Upload 
                    ref="upload"
                    action="/api/article/upload"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    name='file'
                    :show-upload-list = 'false'
                   
                >
                    <img :src="imgUrl" v-if='imgUrl' class="img-cover">
                    <Button type="ghost" icon="ios-cloud-upload-outline" v-else>上传文件</Button>
                </Upload>
            </Form-item>
            <Form-item>
                <Button type="primary" @click='handleArticle("formItem")'>确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click='handleCancel'>取消</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
// import $ from 'jquery';
import qs from 'qs';
import { mavonEditor } from 'mavon-editor'
import { addArticle, queryArticleById, editArticle, uploadImg } from '../../../api/back/api.js';
import 'mavon-editor/dist/css/index.css'
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
            },
            // 封面路径
            imgUrl: '',
            editContent: '',
            img_file: {}
        }
    },
    components: {
        mavonEditor
    },
    computed: {
        type() {
            return this.$route.query.type;
        },
        articleId() {
            if (this.$route.query.type === 'edit') {
                return this.$route.query.articleId;
            } else {
                return '';
            }
        }
    },
    created() {
        this.init();
        if (this.type === 'edit') {
            this.getDataById();
        }
    },
    mounted() {
    },
    methods: {
        init() {
        },
        // 根据id回填
        getDataById() {
            const self = this;
            let param = {
                articleId: self.$route.query.id
            };

            queryArticleById(qs.stringify(param))
                .then((res) => {
                    let _data = res.data;
                    if (_data.success) {
                        this.formItem = _data.data;
                        this.imgUrl = _data.data.imgUrl;
                    } else {
                        this.$Message.warning(_data.errorMsg);
                    };
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        // 获得makeDown 代码
        getCode(val, render) {
            // console.log(val,render);
            this.editContent = render;
            console.log(render);
        },
        // 添加图片
        $imgAdd(pos, $file) {
        const self = this;
            let formData = new FormData();
            formData.append('file', $file);
            uploadImg(formData)
                .then((res) => {
                    let _data = res.data;
                    if (_data.success) {
                        console.log(pos, _data.result.url);
                        self.$refs.mavonEditor.$imgUpdateByUrl(pos, _data.result.url);
                    }
                })
        },
        $imgDel(pos) {
            delete this.img_file[pos];
        },
        // 添加文章
        handleArticle(name) {
            const self = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 新增
                    if (this.type === 'add') {
                        let param = {
                            title: self.formItem.title,
                            content: self.formItem.content,
                            contentHTML: self.editContent,
                            imgUrl: this.imgUrl
                        };
                        addArticle(qs.stringify(param))
                            .then((res) => {
                                let _data = res.data;
                                if (_data.success) {
                                    this.$Message.success(_data.msg);
                                    this.$router.push({
                                        path: '/admin/article/articleTable',
                                        query: {
                                        }
                                    })
                                } else {
                                    this.$Message.warning(_data.errorMsg);
                                };
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    // 修改
                    } else {
                        let param = {
                            articleId: self.$route.query.id,
                            title: self.formItem.title,
                            contentHTML: self.editContent,
                            content: self.formItem.content,
                            imgUrl: self.imgUrl
                        }
                        console.log(param);
                        editArticle(qs.stringify(param))
                            .then((res) => {
                                let _data = res.data;
                                if (_data.success) {
                                    this.$Message.success(_data.msg);
                                    this.$router.push({
                                        path: '/admin/article/articleTable',
                                        query: {
                                        }
                                    })
                                } else {
                                    this.$Message.warning(_data.errorMsg);
                                };
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                } else {
                }
            })
        },
        editorChange() {

        },
        // 点击取消
        handleCancel() {
            this.$router.push({
                path: '/admin/article/articleTable'
            })
        },
        // 上传成功
        handleSuccess(res, file) {
            if (res.success) {
                this.imgUrl = res.result.url;
            }
        },
        handleRemove (file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.formWrapper{
    .title{
        max-width: 800px;
    }
    .editor{
        min-height: 400px;
    }
}
.img-cover{
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
    cursor: pointer;
}

</style>
