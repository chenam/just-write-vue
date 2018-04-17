// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import './my-theme.less';    // 使用 CSS
import './assets/css/common.css';
import axios from 'axios';
import util from './assets/js/util.js'
import mavonEditor from 'mavon-editor'

Vue.prototype.$http = axios;

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(mavonEditor);

// 过滤器
Vue.filter('toDate', util.toDate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
