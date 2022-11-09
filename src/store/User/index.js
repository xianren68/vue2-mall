import { reqRegister,registerUser ,reqLogin,reqUserInfo,reqLoginOut} from "@/api";
import { setToken,getToken,removeToken} from "@/until/token";
//注册登录
// import { reject } from "lodash";
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETREGCODE(state,value){
        state.code = value
    },
    USERLOGIN(state,value){
        state.token = value
    },
    GETUSERINFO(state,value){
        state.userInfo = value
    },
    LOGINOUT(state){
        state.token = ''
        state.userInfo = {}
    }
    
}
const actions = {
    async getRegCode(context,phone){
        //获取验证码
       const result =  await reqRegister(phone)
       if(result.code == 200){
           context.commit("GETREGCODE",result.data)
           return 'ok'
           
       }else{
           return Promise.reject(new Error('file'))
       }
    },
    //注册成功
    async Register(context,data){
        const result = await registerUser(data)
        if(result.code){
            return 'ok'
        }else{
            console.log(data)
            return Promise.reject(new Error('file'))
            
        }   
    },
    //获取token
    async userLogin(context,data){
        const result = await reqLogin(data)
        if(result.code === 200){
            context.commit("USERLOGIN",result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo(context){
        const result = await reqUserInfo()
        if(result.code === 200){
            context.commit("GETUSERINFO",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async LoginOut(context){
        const result = await reqLoginOut()
        if(result.code === 200){
            removeToken()
            context.commit("LOGINOUT")
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}