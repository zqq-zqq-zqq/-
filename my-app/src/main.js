// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//1.引入路由
import router from './router'
//2.引入动画
import "animate.css"

//3.引入通用样式
// import "./public/css/reset.css"

import filterDate from "./filter/index.js"
for (var i in filterDate){
  Vue.filter(i,filterDate[i]) 
}

//4.引入全局组件
import commonCom from "./components/common/index.js"
for(var i in commonCom){
  Vue.component(i,commonCom[i])
}

import axios from "axios";
Vue.prototype.$http=axios;

import qs from "qs"
Vue.prototype.$qs=qs;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//非父子间的传值
Vue.prototype.Event = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
