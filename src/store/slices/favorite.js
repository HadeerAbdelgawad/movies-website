import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageFav = () => {
    const storedFav = localStorage.getItem('FavItems')
    return storedFav ? JSON.parse(storedFav) : []
}
const favSlice = createSlice({
    name: "favorite",
    initialState: {
        favorite: getLocalStorageFav()
    },
    reducers: {
        changeFavorite: (state, action) => {    
            
            const movie = action.payload
            if (state.favorite.some(item => item.id === movie.id)) {
                state.favorite = state.favorite.filter(item => item.id !== movie.id)
            } else {
                state.favorite.push(movie)
                localStorage.setItem('FavItems', JSON.stringify(state.favorite))
            }
        },

        deleteFavorite: (state, action) => {
            const movie = action.payload
            state.favorite = state.favorite.filter(item => item.id !== movie.id)
            localStorage.setItem('FavItems', JSON.stringify(state.favorite))

        }

    }
})

export const { changeFavorite, deleteFavorite } = favSlice.actions

export default favSlice.reducer