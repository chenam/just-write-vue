<template>
    <div class="index">
        <div class="pb10">
            <Button type="primary" @click='addArticle'>新增文章</Button>
        </div>
         
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'index',
    data () {
        return {
            columns1: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address'
                }
            ],
            data1: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }
            ]
        }
    },
    created(){
        this.init();
        setTimeout(()=>{
            console.log($('.pb10'));
        },1000)
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
