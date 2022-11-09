import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store'
import mock from '@/mock'
import 'swiper/css/swiper.min.css'
import Carousel from '@/components/Carousel'
import Pager from './components/Pager'
//将api全部引入
import *as Api from '@/api'
//按需引入element-ui
import {Button,MessageBox} from 'element-ui'
//导入图片懒加载
import VueLazyload from 'vue-lazyload'
import lz from '@/assets/lz.gif'
//
import "@/plugins/validate";
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:lz
});
Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pager.name,Pager)
Vue.component(Button.name,Button)
new Vue({
  render: h => h(App),
  //注册router
  router,
  store,
  //安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    //为vue原型安装Api
    Vue.prototype.$Api = Api
    //为Vue原型注册组件
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = this.$msgbox.alert
  }
}).$mount('#app')