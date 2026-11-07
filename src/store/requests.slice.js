import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name:"requests",
    initialState:{
        data:[]
    },
    reducers:{
        addRequestData:(state,action)=>{
            state.data = action.payload;
        },
        updateRequestData:(state,action)=>{
            state.data = state.data.filter((item)=>item._id!==action.payload);
        }
    }
})

export const {addRequestData,updateRequestData} = requestSlice.actions;

export default requestSlice.reducer;