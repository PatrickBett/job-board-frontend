import axios from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"


const api = axios.create({
    // import everything specified inside env variable
    baseURL : import.meta.env.VITE_API_URL
})



api.interceptors.request.use(
    (config) =>{
        // get token if available in localstorage
        const token = localStorage.getItem(ACCESS_TOKEN)

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    
    (error)=>{
        return Promise.reject(error)
    }

)

export default api