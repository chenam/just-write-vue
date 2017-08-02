<template>
    <div class="index">
        <div class="bg"></div>
        <div class="main-wrapper">
            <div class="main">
                <div>
                    <a href="javascript:;">首页</a>
                    <a href="javascript:;">博客</a>
                    <a href="javascript:;">关于我</a>
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
html,body{
    background: #ebf0fc;
}
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
