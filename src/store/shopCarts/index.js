import {reqShopCarts,reqDelete,reqChecked} from '@/api/index'
const state = {
    shopCarts:[]
}
const mutations = {
    SHOPCARTS(state,result){
        state.shopCarts = result
    }

}
const getters = {
    //购物车列表
    cartList(){
        return state.shopCarts[0]||{}
    }
}
const actions = {
    //请求购物车列表
    async shopCarts(context){
        let result = await reqShopCarts()
        if(result.code == 200){
            context.commit("SHOPCARTS",result.data)
        }
    },
    //删除商品
    async deleteShop(context,id){
        let result = await reqDelete(id)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    async changeChecked(context,{skuId,isChecked}){
        let result = await reqChecked(skuId,isChecked)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    deleteChecked(context){
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item=>{
            if(item.isChecked == 1){
                let result = context.dispatch("deleteShop",item.skuId)
                PromiseAll.push(result)
            }
        })
        return Promise.all(PromiseAll)
    },
    //改变所有商品的状态
    changeAllChecked(context,isChecked){
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item=>{
            let result = context.dispatch("changeChecked",{skuId:item.skuId,isChecked})
            PromiseAll.push(result)
        })
        return Promise.all(PromiseAll)
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}