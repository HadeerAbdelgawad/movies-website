import { axiosInstance } from "./axiosInstance";

export function getAllMovies(){
    return axiosInstance.get('3/movie/popular')
}

// https://api.themoviedb.org/3/trending/person/day?language=en-US
export function getMovieById(movieId){
    return axiosInstance.get(`3/movie/${movieId}`)
}

// https://api.themoviedb.org/3/movie/popular?api_key=7a1c16ea3c361a4d3cc53eb70ef8268&page=4

export function getMoviesByPage(pageNumber){
    return axiosInstance.get(`3/movie/popular?page=${pageNumber}`)
}

export function getMovieVideos(movieId){
    return axiosInstance.get(`3/movie/${movieId}/videos?language=en-US`)
}

// https://api.themoviedb.org/3/search/movie?api
// _key=7a1c16ea3c361a4d3cc53eb70ef8268&query={ 
// MovieName}
export function searchForMulti(movieName){
    return axiosInstance.get(`3/search/multi?query=${movieName}`)
}