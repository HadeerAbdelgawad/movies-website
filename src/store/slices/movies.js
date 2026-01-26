import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMovies } from "../../services/movies.api";

export const moviesAction= createAsyncThunk('moviesgetAll',async()=>{
    try{

        const res= await getAllMovies()
        return res.data.results
    }catch(err){
        throw err
    }
    
})

const movieSlice= createSlice({
    name:'movies',
    initialState:{
        movies:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(
            moviesAction.pending,(state,action)=>{
                state.loading=true
            }
        ),
        builder.addCase(
            moviesAction.fulfilled,(state,action)=>{
                state.loading=false
                state.movies=action.payload
            }
        ),
        builder.addCase(
            moviesAction.rejected,(state,action)=>{
                state.loading=false
                state.error=action.error
            }
        )
    }
})

export default movieSlice.reducer