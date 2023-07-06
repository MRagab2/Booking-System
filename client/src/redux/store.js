import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./userDetailsSlice";

const store = configureStore({
    reducer: {
        userDetailsSlice: userDetailsSlice,
    },


})
export default store