import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/front/index'
import Blog from '@/components/front/blog'
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


    ]
});

export default router;
