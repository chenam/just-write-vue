<template>
    <div class="blog">
        <ul>
            <li v-for='(item,index) in sortData'>{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'blog',
    data () {
        return {
            sortData:[
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
