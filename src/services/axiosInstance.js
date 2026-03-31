import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";
import { changeLoader } from "../store/slices/loader";
// https://api.themoviedb.org/3/authentication \
export const axiosInstance = axios.create({
    baseURL:'https://api.themoviedb.org/',
    params:{
        language:'en-US',
        api_key:import.meta.env.VITE_APP_API_KEY
    }
})



axiosInstance.interceptors.request.use(
    (req)=>{
        store.dispatch(changeLoader(true))
        return req
    },
    (err)=>{
        return Promise.reject
    }
)

axiosInstance.interceptors.response.use(
    (res)=>{
        store.dispatch(changeLoader(false))
        return res
    },
    (err)=>{
        return Promise.reject
    }
)