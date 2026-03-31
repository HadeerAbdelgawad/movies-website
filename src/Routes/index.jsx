import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from '../components/Layout'
import NotFound from '../pages/NotFound'
import MovieDetails from '../pages/MovieDetails'
import Movies from '../pages/Movies'
import TvShows from '../pages/TvShows'
import Favoirate from '../pages/Favoirate'
import Login from '../pages/Login'
import ProtectedRoutes from '../components/ProtectedRoutes'
import SearchResult from '../pages/SearchResult'
import Loader from '../components/Loader'
import Register from '../pages/Register'
import Home from '../pages/Home'
import TrendingToday from '../pages/TrendingToday'
import TvShowsDetails from '../pages/TvShowsDetails'
import ShowVideos from '../pages/ShowVideos'


function AppRoutes() {

    const routes= createBrowserRouter([
        {path:'', element:<Layout/>, children:[
            {path:'', element:<Home/>},
            {path:'/movie-details/:id', element:<MovieDetails/>},
            {path:'/tv-shows-details/:id', element:<TvShowsDetails/>},
            {path:'/movies', element:<Movies/>},
            {path:'/tv-shows', element:<TvShows/>},
            {path:'/login', element:<Login/>},
            {path:'/register', element:<Register/>},
            {path:'/loader', element:<Loader/>},
            {path:'/searchResult/:query', element:<SearchResult/>},
            {path:'/favorites', element:<Favoirate/>}, 
            {path:'/trendingToday', element:<TrendingToday/>},
            {path:'/show-videos/:id/:mediaType' , element:<ShowVideos/>}  
        ]
    },
    {path:'*', element:<NotFound/>}

    ])
    return (
        <>
            <RouterProvider router={routes}/>
        </>
    )
}

export default AppRoutes
