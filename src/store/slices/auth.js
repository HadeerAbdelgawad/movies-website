import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'isLoggedin',
    initialState:{
        isLoggedin: JSON.parse(localStorage.getItem('isLoggedin')) || false
    },
    reducers:{
        changeAuth:(state,action)=>{
            state.isLoggedin=action.payload
            localStorage.setItem('isLoggedin', action.payload)
        }
    }
})

export const {changeAuth}= authSlice.actions
export default authSlice.reducer