<template>
    <div class="blog">
        <div class="header-wrapper">
            <ul class="clearfix">
                <li v-for= '(item,index) in navData' @click='typeChange(item,index)'>{{item.name}}</li>
            </ul>
        </div>
        <div class="main-wrapper">
            <!--<Tech key="1" v-if='activeType == "1"'></Tech>
            <Read key="2" v-else-if='activeType == "2"'></Read>
            <Essay key="3" v-else-if='activeType == "3"'></Essay>-->
            <div v-for='(item,index) in listData' :key='index' class="content-wrapper" v-if='!noData'>
                <div class="content-title">{{item.title}}</div>

                <div class="content-sub">
                    
                    <span><i class="iconfont icon-icon_clock f12 pr10"></i>{{item.modifyDateStr}}</span>
                </div>

                <div class="content-main" v-html="item.contentHTML">
                    
                </div>
            </div>
            <div v-if='noData'>暂无数据</div>
            <Page 
                :total="total" 
                size="small" 
                :current="pageStart"
                :page-size-opts='[5,10,20]'
                show-elevator 
                show-sizer 
                show-total
                v-if='!noData'
            ></Page>

        </div>
        <div>
            
        </div>
    </div>
</template>

<script>
import Tech from './tech';
import Read from './read';
import Essay from './essay';
import { queryArticleList } from '../../../api/front/api.js';
export default {
    name: 'blog',
    components: {
        Tech, Read, Essay
    },
    computed: {
        noData() {
            if (this.listData.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    data () {
        return {
            navData: [
                {name: '技术', value: '1'},
                {name: '读书', value: '2'},
                {name: '随笔', value: '3'}
            ],
            activeType: '1',
            listData: [],
            // 分页参数
            total: 0,
            pageStart: 1,
            pageSize: 10
        }
    },
    created() {
        this.getInitData();
    },
    methods: {
        getInitData() {
            const param = {
                pageStart: (this.pageStart - 1) * this.pageSize,
                pageSize: this.pageSize
            };
            // 获取文章列表
            queryArticleList(param)
                .then((res) => {
                    let _data = res.data;
                    if (_data.success) {
                        this.listData = _data.data.list;
                        this.total = _data.data.count;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        typeChange(item, index) {
            this.activeType = item.value;
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
            cursor: pointer;
            padding: 0 10px;
        }
    }
}
.main-wrapper{
    max-width: 1200px;
    margin : 0 auto;
    .content-wrapper{
        margin-bottom: 30px;
    }
    .content-title{
        font-size: 18px;
    }
    .content-sub{
        font-size: 12px;
        padding : 8px 0;
    }
}
</style>
