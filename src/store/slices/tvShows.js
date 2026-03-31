import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTvShows } from "../../services/tvShows.api";

export const tvShowsAction= createAsyncThunk('tvShowsgetAll',async()=>{
    try{
        const res= await getAllTvShows()
        return res.data.results
    }catch(err){
        throw err
    }
    
})

const tvShowsSlice= createSlice({
    name:'tvShows',
    initialState:{
        tvShows:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(
            tvShowsAction.pending,(state,action)=>{
                state.loading=true
            }
        ),
        builder.addCase(
            tvShowsAction.fulfilled,(state,action)=>{
                state.loading=false
                state.tvShows=action.payload
            }
        ),
        builder.addCase(
            tvShowsAction.rejected,(state,action)=>{
                state.loading=false
                state.error=action.error
            }
        )
    }
})

export default tvShowsSlice.reducer