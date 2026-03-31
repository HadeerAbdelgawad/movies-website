import { axiosInstance } from "./axiosInstance";

export function getAllTvShows(){
    return axiosInstance.get('3/tv/popular')
}

export function getAllTvShowsById(id){
    return axiosInstance.get(`3/tv/${id}`)
}


//https://api.themoviedb.org/3/tv/popular?api_key=74603059ce18599b72730fabbd9572e3&page=4

export function getTvShowsByPage(pageNumber){
    return axiosInstance.get(`3/tv/popular?page=${pageNumber}`)
}

export function getTvShowVideos(tvShowId){
    return axiosInstance.get(`3/tv/${tvShowId}/videos?language=en-US`)
}