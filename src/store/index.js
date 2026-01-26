import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './slices/favorite'
import loaderReducer from './slices/loader'
import movieReducer from './slices/movies'
import tvShowsReducer from './slices/tvShows'

const store= configureStore({
    reducer:{
        favorite : favoriteReducer,
        loader : loaderReducer,
        movies : movieReducer,
        tvShows : tvShowsReducer
    }
})

export default store