import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice.js";

const appStore = configureStore({
    reducer:{
        user:userReducer
    }
})

export default appStore;