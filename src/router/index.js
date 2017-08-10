import Vue from 'vue'
import Router from 'vue-router'
/*==============*/
import Index from '@/components/front/index'
import Blog from '@/components/front/blog'
/*==============*/
import Admin from '@/components/back/admin'
import Home from '@/components/back/home'
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
            redirect: '/admin/admin',
            component: Admin,
            children:[
                {path: 'admin', name: 'admin', component: Admin, meta: {title: '博客首页'}},
            ]
        },


    ]
});

export default router;
