<template>
    <div class="blog">
        <div class="header-wrapper">
            <ul class="clearfix">
                <li v-for= '(item,index) in navData' >{{item.name}}</li>
            </ul>
        </div>
        <div class="nav-wrapper">
            <div class="nav-main">
                晚上早点睡啊~
            </div>
        </div>
        <div>
            
        </div>
        <div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'blog',
    data () {
        return {
            navData:[
                {name:'技术'},
                {name:'随笔'},
                {name:'读书'}
            ]
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
.header-wrapper{
    height: 100px;
    max-width: 1200px;
    margin: 0 auto;
    ul{
        overflow:hidden;
        padding-top: 39px ;
        li{
            float: left;
            padding: 0 10px;
        }
    }
}
.nav-wrapper{
    display:flex;
    background: rgba(230,82,129,0.3);
    height: 150px;
    align-items: center;
    justify-content: center;
    .nav-main{
        font-size: 22px;
        padding:20px;

    }

}
</style>
