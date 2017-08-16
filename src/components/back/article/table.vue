<template>
    <div class="index">
        <div class="pb20">
            <Breadcrumb >
                    <Breadcrumb-item>文章管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!-- 搜索 -->
        <Form ref="formSearch" :model="formSearch" :rules="formSearchRule" inline>
            <!-- <Form-item label="文章标题">
                <Input type="text" v-model="formSearch.title" placeholder="请输入">
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSearch('formSearch')">查询</Button>
            </Form-item> -->
        </Form>
        <div class="pb20">
            <Button type="primary" @click='addArticle'>新增文章</Button>
        </div>
        
        <Table :columns="columns1" :data="tableList"></Table>
    </div>
</template>

<script>
import $ from 'jquery';
import { queryArticleList } from '../../../api/api.js';
export default {
    title: 'index',
    data () {
        return {
            columns1: [
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '内容',
                    key: 'content'
                },
                {
                    title: '创建时间',
                    key: 'date'
                },
                {
                    title:'操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.handleView(params.index)
                                    }
                                }
                            }, '查看'),
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.handleEdit(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('a', {
                                on: {
                                    click: () => {
                                        this.handleRemove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableList: [
                {
                    title: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    title: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    title: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    title: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }
            ],
            formSearch: {
                title: ''
            },
            formSearchRule: {
                title: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.init(); 
        let para = {};
        queryArticleList(para)
            .then( (res) => {
                this.tableList = res.data;
            })
            .catch(function(error){
                console.log(error);
            });
    },
    methods : {
        init(){
        },
        addArticle(){
            this.$router.push({
                path:'/admin/article/articleAdd',
                query:{

                }
            })
        },
        // 查看
        handleView(){

        },
        // 编辑
        handleEdit(){

        },
        // 删除
        handleRemove(){

        },
        handleSearch(){

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.bg{
    position: absolute;
    right:100px;
    bottom: 0; 
    width: 180px;
    height: 440px;
    background: url(/static/img/bg.png) no-repeat;
    background-size: 100% auto;
    background-position: center bottom;
}
.main-wrapper{
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 300;
    text-align: center;
    .main{
        display: flex;
        height: 100%;
        align-items:center;
        >div{
            width: 100%;
            >a{
                display: inline-block;

            }
        }
    }
}
</style>
