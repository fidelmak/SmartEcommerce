import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducer/cartSlice";
import userSlice from "./reducer/userReducer";

export const store = configureStore({
    reducer:{
        cartSlice:cartSlice,
        userSlice: userSlice,

    }
})

export type RootState = ReturnType<typeof store.getState>