import {reqGoodsinfo,reqOrUpdatecars,reqShopCarts} from '@/api/index'
import {getId} from '@/until/getId'
const state = {
    goodInfo:{},
    userId:getId(),
}
const mutations = {
    GOODSINFO(state,data){
        state.goodInfo = data
    },

}
const getters = {
    categoryView(){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(){
        return state.goodInfo.spuSaleAttrList||[]
    },
}
const actions = {
    //请求详情页数据
    async goodsinfo(context,skuId){
        let result =  await reqGoodsinfo(skuId)
        if(result.code == 200){
            context.commit("GOODSINFO",result.data)
        }
    },
    //加入购物车请求
    async shopcar(context,{skuId,skuNum}){
        let result = await reqOrUpdatecars(skuId,skuNum)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}