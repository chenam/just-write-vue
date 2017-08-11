<template>
    <div class="layout">
            <div span="4" class="layout-menu-left">
                <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left"></div>
                    <Menu-item name="1">
                        <Icon type="ios-navigate"></Icon>
                        <span class="layout-text"><router-link to="/admin/home">后台首页</router-link></span>
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="ios-navigate"></Icon>
                        <span class="layout-text"><router-link to="/admin/article/articleTable">文章管理</router-link></span>
                    </Menu-item>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            导航二
                        </template>
                        <Menu-item name="2-1">选项 1</Menu-item>
                        <Menu-item name="2-2">选项 2</Menu-item>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            导航三
                        </template>
                        <Menu-item name="3-1">选项 1</Menu-item>
                        <Menu-item name="3-2">选项 2</Menu-item>
                    </Submenu>
                </Menu>
            </div>
            <div span="20" class="layout-menu-right">
                <div class="layout-header"></div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
        }
    },
    created(){
        this.init();
    },
    methods : {
        init(){
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        /*position: relative;*/
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: calc(~"100% - 90px");;
        margin: 15px;
        margin-left: 0px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;

    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 230px;

    }
    .layout-menu-right{
        position: absolute;
        left: 240px;
        top: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>
<style>
    .ivu-row-flex{
        min-height: 100%;
    }
</style>
