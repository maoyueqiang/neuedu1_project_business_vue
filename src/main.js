// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
import Home from '@/components/Home'
import './assets/styles/iconfont.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import 'styles/reset.css'
//保证1像素的边框，因为在多倍屏中可能会显示多像素
import 'styles/border.css'

import fastClick from 'fastclick'
fastClick.attach(document.body)
Vue.use(Mint);

Vue.config.productionTip = false

//对axios统一配置
import axios from 'axios'
//需要将axios注册成全局变量
var service=axios.create({
  baseURL:"http://localhost:8888",
  withCredentials:true,//前端允许携带cookie
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    let params=''
    for(var index in data){
      params+=index+'='+data[index]+'&'
    }
    return params
  }]
})
Vue.prototype.service=service

Vue.filter("formatMoney",function (value) {
  return "￥"+value.toFixed(2)+"元"
})

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
import {store} from './store/index'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { Home },  //注册组件
  //首页显示内容，其内必有<router-view>
  template: '<Home/>' //加载组件
})
