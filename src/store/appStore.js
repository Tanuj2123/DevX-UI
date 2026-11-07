import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice.js";
import feedReducer from "./feed.slice.js";
import requestReducer from "./requests.slice.js";

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        requests:requestReducer
    }
})

export default appStore;