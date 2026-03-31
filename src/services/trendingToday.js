import { axiosInstance } from "./axiosInstance";

export function getTrendingMoviesToday(page = 1){
    //'https://api.themoviedb.org/3/trending/movie/day?language=en-US' \
    return axiosInstance.get(`3/trending/movie/day?language=en-US&page=${page}`)
}

export function getTrendingTVShowsToday(page = 1){
    //'https://api.themoviedb.org/3/trending/movie/day?language=en-US' \
    return axiosInstance.get(`3/trending/tv/day?language=en-US&page=${page}`)
}