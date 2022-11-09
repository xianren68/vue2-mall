import requests from "./request";
import mockAjax from "./MockAjax";
//三级分类
// /api/product/getBaseCategoryList get 无参
export const reqCategoryList = ()=>{
    return requests({url:'/product/getBaseCategoryList',method:"get"})
}
export const reqBanner = ()=> mockAjax({url:'/banner'})
export const reqFloor = ()=> mockAjax({url:'/floor'})

export const reqProductList = (params={})=>requests({url:'/list',method:"post",data:params})
// export const reqProductList = (searchParams) => requests.post('/list', searchParams)
export const reqGoodsinfo = (skuId)=>requests({url:`/item/${skuId}`,method:"get"})

export const reqOrUpdatecars = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"})
//获取购物车列表
export const reqShopCarts = ()=>requests({url:"/cart/cartList",method:"get"})
//删除商品
export const reqDelete = (skuId)=>requests({url:`cart/deleteCart/${skuId}`,method:"delete"})
export const reqChecked = (skuId,isChecked)=>requests({url:`cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//获取验证码
export const reqRegister = (phone)=>requests({url:`/user/passport/sendCode/{${phone}}`,method:"get"})
//用户注册
export const registerUser = (data)=>requests({url:'/user/passport/register',data,method:'post'});
//用户登录
export const reqLogin = (data)=>requests({url:'/user/passport/login',method:'post',data})
//获取用户数据
export const reqUserInfo = ()=>requests.get('user/passport/auth/getUserInfo')
//退出登录
export const reqLoginOut = ()=>requests.get('/user/passport/logout')
//获取用户地址信息
export const reqUserAddress = ()=>requests.get('/order/auth/trade')
//提交订单
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
//通过订单号获取订单信息
export const reqOrderInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`})
//获取订单的支付状态
export const reqOrderStatus = (orderId)=>requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
//获取我的订单
export const reqMyOrder = (page,limit)=>requests.get(`/order/auth/${page}/${limit}`)