import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './Detail'
import shopCarts from './shopCarts'
import user from './User'
import trade from './Trade'
Vue.use(Vuex)
export default new Vuex.Store({
    namespaced:true,
    modules:{
        home,
        search,
        detail,
        shopCarts,
        user,
        trade
    }
})