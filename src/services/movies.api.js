import { axiosInstance } from "./axiosInstance";

export function getAllMovies(){
    return axiosInstance.get('3/movie/popular')
}

export function getAllTvShows(){
    return axiosInstance.get('3/tv/popular')
}

// https://api.themoviedb.org/3/trending/person/day?language=en-US
export function getMovieById(movieId){
    return axiosInstance.get(`3/movie/${movieId}`)
}

// https://api.themoviedb.org/3/movie/popular?api_key=7a1c16ea3c361a4d3cc53eb70ef8268&page=4

export function getMoviesByPage(pageNumber){
    return axiosInstance.get(`3/movie/popular?page=${pageNumber}`)
}

//https://api.themoviedb.org/3/tv/popular?api_key=74603059ce18599b72730fabbd9572e3&page=4

export function getTvShowsByPage(pageNumber){
    return axiosInstance.get(`3/tv/popular?page=${pageNumber}`)
}

// https://api.themoviedb.org/3/search/movie?api
// _key=7a1c16ea3c361a4d3cc53eb70ef8268&query={ 
// MovieName}
export function searchForMovie(movieName){
    return axiosInstance.get(`3/search/movie?query=${movieName}`)
}