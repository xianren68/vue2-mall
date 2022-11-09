import { reqUserAddress } from "@/api"
const state = {
    userData:{}
}
const actions = {
    async getUserAddress({commit}){
        const result = await reqUserAddress()
        if(result.code === 200){
            commit("GETUSERADDRESS",result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state,value){
        state.userData = value
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}