import Vue from 'vue'
import Router from 'vue-router'
/*==============*/
import Index from '@/components/front/index'
import Blog from '@/components/front/blog'
/*==============*/
import Admin from '@/components/back/admin/index'
import Home from '@/components/back/index'
import ArticleTable from '@/components/back/article/table'
import ArticleHandle from '@/components/back/article/articleHandle'
import ArticleIndex from '@/components/back/article/index'
/*==============*/
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog
        },
        {
            path: '/admin',
            redirect: '/admin/home',
            component: Admin,
            children:[
                {path: 'home', name: 'home', component: Home, meta: {title: '博客首页'}},
                {
                    path: 'article',
                    name: 'article', 
                    component: ArticleIndex, 
                    children:[
                        {path: 'articleTable', name: 'articleTable', component: ArticleTable, meta: {title: '文章列表'}},
                        {path: 'articleHandle', name: 'articleHandle', component: ArticleHandle, meta: {title: '文章操作'}}
                    ]
                },
            ]
        },


    ]
});

export default router;
