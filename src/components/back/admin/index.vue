<template>
    <div class="layout">
            <div span="4" class="layout-menu-left">
                <Menu :active-name="activeNum" theme="dark" width="auto" >
                    <div class="layout-logo-left"></div>
                    <Menu-item name="1">
                        <router-link to="/admin/home">
                            <Icon type="ios-home"></Icon>
                            <span class="layout-text">后台首页</span>
                        </router-link>
                    </Menu-item>
                    <Menu-item name="2">
                        <router-link to="/admin/article/articleTable">
                            <Icon type="ios-book"></Icon>
                            <span class="layout-text">文章管理</span>
                        </router-link>
                    </Menu-item>
                    <Menu-item name="3">
                        <router-link to="/admin/tag/tagTable">
                            <Icon type="pricetags"></Icon>
                            <span class="layout-text">标签管理</span>
                        </router-link>
                    </Menu-item>
                    <!-- <Submenu name="3">
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
                    </Submenu> -->
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
            // activeNum:'0'
        }
    },
    created(){
        this.init();

    },
    computed:{
        activeNum(){
            if(this.$route.name == "home"){
                return '1';
            }else if(this.$route.name == 'articleTable' || this.$route.name == 'articleHandle'){
                return '2';
            }else if(this.$route.name == 'tagTable' || this.$route.name == 'tagHandle'){
                return '3';
            }else{
                return '0';
            }
            
            // console.log(this.route);
        }
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
        a{
            display: block;
            padding:14px 24px;
            color: rgba(255,255,255,0.7);
            &:hover{
                color: rgba(255,255,255,1);
            };
            i{
                margin-right: 6px;
            }
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu){
            a{
                color: #2d8cf0;
            }
        }

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
    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
        padding:0;
    }
</style>
<style>
    .ivu-row-flex{
        min-height: 100%;
    }
</style>
