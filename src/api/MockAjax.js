import axios from "axios"
const mockAjax = axios.create({
    baseURL:"/mock",
    timeout:10000
})
export  default mockAjax