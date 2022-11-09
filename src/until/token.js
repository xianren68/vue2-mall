//将token存储到本地或从本地删除
//存储token
export const setToken = (token)=>{
    localStorage.setItem("TOKEN",token)
}
//获取token
export const getToken = function(){
    return localStorage.getItem("TOKEN")
}
//删除token
export const removeToken = function(){
    localStorage.removeItem("TOKEN")
}