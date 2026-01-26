import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";
import { changeLoader } from "../store/slices/loader";

export const axiosInstance = axios.create({
    baseURL:'https://api.themoviedb.org/',
    params:{
        language:'en-US',
        api_key:'74603059ce18599b72730fabbd9572e3'
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