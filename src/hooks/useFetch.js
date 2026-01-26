import { useDispatch, useSelector } from "react-redux";
import {tvShowsAction} from '../store/slices/tvShows'

export function useFetch(){
    const tvShows= useSelector((state)=>state.tvShows.tvShows)
    const loading = useSelector((state)=>state.tvShows.loading)
    const error = useSelector((state)=>state.tvShows.error)

    const dispatch= useDispatch()

    const getAll=()=>{
        dispatch(tvShowsAction())
    }



    return [tvShows, getAll, loading, error]
}