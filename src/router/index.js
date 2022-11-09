import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import  AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
import {getToken} from '@/until/token'
import store from '@/store'
import { toPath } from 'lodash'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import myOrder from '@/pages/Center/myOrder'
// import groupOrder from '@/pages/Center/groupOrder'
Vue.use(VueRouter)
let router =  new VueRouter({
    routes:[
        {
            path:'/shopcart',
            //路由懒加载,将路由组件写成回调函数，只有再使用时才加载
            component:()=>import('@/pages/ShopCart'),
            meta:{
                isShow:true
            }
        },
        {
            path:'/addcartsuccess',
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{
                isShow:true
            }
        },
        {
            path:'/detail/:skuId?',
            component:()=>import('@/pages/Detail'),
            meta:{
                isShow:true
            }
        },
        {
            path:'/home',
            component:()=>import('@/pages/Home'),
            meta:{
                isShow:true
            }
        },
        {
            path:'/login',
            component:()=>import('@/pages/Login'),

        },
        {
            path:'/register',
            component:()=>import('@/pages/Register')
        },
        {
            name:"search",
            path:'/search/:keyword?',
            component:()=>import('@/pages/Search'),
            //判断footer显示隐藏
            meta:{
                isShow:true
            }
        },
        {
            path:'/trade',
            component:()=>import('@/pages/Trade'),
            meta:{
                isShow:true
            }
        },
        {
            path:'/pay',
            component:()=>import('@/pages/Pay'),
            meta:{
                isShow:true
            },
            beforeEnter (to, from, next) {
                if (from.path==='/trade') {
                  next()
                } else {
                  next('/trade')
                }
              }
        },
        {
            path:'/paysuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{
                isShow:true
            },
            beforeEnter (to, from, next) {
                if (from.path==='/pay') {
                  next()
                } else {
                  next('/pay')
                }
              }
        },
        {
            path:'/center',
            component:()=>import('@/pages/Center'),
            meta:{
                isShow:true
            },
            //注册二级路由
            children:[
                {
                    path:'myorder',
                    component:()=>import('@/pages/Center/myOrder'),

                },
                {
                    path:'grouporder',
                    component:()=>import('@/pages/Center/groupOrder')
                },
                //重定向
                {
                    path:'/',
                    redirect:"myorder"
                }
            ]
        },
        //重定向，让项目跑起来的时候，访问地址指向首页
        {
            path:'/*',
            redirect:'/home'
        },
        
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})
router.beforeEach(async (to,from,next)=>{
    //获取token
    let token = getToken()
    //获取name
    let name = store.state.user.userInfo.loginName
    //token存在则为登录状态
    if(token){
        //已登录不能再去注册或登录
        if(to.path ==='/login' || to.path === '/register'){
            next('/home')
        }else{
            //判断是否有用户数据
            if(name){
                next()
            //若没有，则发送请求获取
            }else{
               try {
                 await store.dispatch('getUserInfo')
                 next()
               } catch (error) {
                   await store.dispatch('LoginOut')
                   next('/login')
               }


            }
        }
    }else{
        let topath = to.path
        //判断要去的地方是否与购物车和支付页面相关
        if(topath.indexOf('shopcart')!=-1 || topath.indexOf("pay")!=-1 || topath.indexOf('trade')!=-1){
            //将原本要去的地址当作query参数拼接到地址上
            next(`/login?redirect=${topath}`)
        }else{
            next()
        }
    }
})
export default router