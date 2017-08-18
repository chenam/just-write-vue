<template>
    <div class="index">
        <div class="pb20">
            <Breadcrumb >
                <Breadcrumb-item>文章管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!-- 搜索 -->
        <!-- <Form ref="formSearch" :model="formSearch" :rules="formSearchRule" inline>
            <Form-item label="文章标题">
                <Input type="text" v-model="formSearch.title" placeholder="请输入">
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSearch('formSearch')">查询</Button>
            </Form-item>
        </Form> -->
        <div class="pb20">
            <Button type="primary" @click='addArticle'>新增文章</Button>
        </div>
        
        <Table :columns="columns1" :data="tableList"></Table>
        <div class="page-wrapper">
            <Page :total="total" show-sizer show-total :page-size-opts="[10,20,50]" 
            @on-change='handlePageChange' 
            @on-page-size-change='handlePageSizeChange'
            ></Page>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import qs from 'qs';
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
                    title: '修改时间',
                    key: 'modifyDate'
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
                                        this.handleEdit(params)
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
            },
            // 分页参数
            pageStart : 1,
            pageSize : 10,
            total : 0
        }
    },
    created(){
        // 获得初始列表
        this.getInitData(); 
        
    },
    methods : {
        getInitData(){
            let param = {
                pageStart : (this.pageStart-1)*this.pageSize,
                pageSize : this.pageSize
            };
            queryArticleList(qs.stringify(param))
                .then( (res) => {
                    let _data = res.data;
                    if(_data.success){
                        this.tableList = _data.data.list;
                        this.total = _data.data.count;
                    }
                    
                })
                .catch(function(error){
                    console.log(error);
                });
        },
        addArticle(){
            this.$router.push({
                path:'/admin/article/articleHandle',
                query:{
                    type:'add'
                }
            })
        },
        // 查看
        handleView(){

        },
        // 编辑
        handleEdit(params){
            console.log(params);
            this.$router.push({
                path:'/admin/article/articleHandle',
                query:{
                    type:'edit',
                    id:params.row._id
                }
            })
        },
        // 删除
        handleRemove(){

        },
        handleSearch(){

        },
        handlePageChange(val){
            this.pageStart = val;
            this.getInitData();
        },
        handlePageSizeChange(val){
            this.pageSize = val;
            this.getInitData();
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
.page-wrapper{
    padding:30px 0;
    text-align: right;
}
</style>
