import { reqProductList } from "@/api"
const state = {
    productList:{}
}
const mutations ={
    GETPRODUCTLIST(state,value){
        state.productList = value

    }
}
const actions = {
    async getProductList(context,params){
        let result = await reqProductList(params)
        if(result.code == 200){
            context.commit("GETPRODUCTLIST",result.data)
        }
    }
}
const getters = {
    attrsList(){
        return state.productList.attrsList
    },
    goodsList(){
        return state.productList.goodsList
    },
    trademarkList(){
        return state.productList.trademarkList
    },
    total(){
        return state.productList.total
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}