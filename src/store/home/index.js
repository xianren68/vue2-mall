import { reqCategoryList,reqBanner, reqFloor} from "@/api"
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations ={
    CATEGORYLIST(state,value){
        state.categoryList = value
        
    },
    GETBANNERLIST(state,value){
        state.bannerList = value
    },
    GETFLOOR(state,value){
        state.floorList = value
    }
}
const actions = {
   async categoryList(context){
        let result = await reqCategoryList();
        if(result.code === 200){
            context.commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList(context){
        let result = await reqBanner();
        if(result.status === 200){
            // console.log(result)
            context.commit("GETBANNERLIST",result.data.data)
        }
    },
    async getFloor(context){
        let result = await reqFloor();
        if(result.status === 200){
            context.commit("GETFLOOR",result.data.data)
        }
    }

}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}