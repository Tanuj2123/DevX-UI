import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:{
        data:[]
    },
    reducers:{
        addData:(state,action)=>{
            state.data = action.payload
        },
        updateData:(state,action)=>{
            state.data = state.data.filter((item)=> item._id!=action.payload)
        }
    }
})

export const {addData,updateData} =  feedSlice.actions;

export default feedSlice.reducer;