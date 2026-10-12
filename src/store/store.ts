import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducer/cartSlice";
import userSlice from "./reducer/userReducer";
import { persistedCartSlice } from "./persisted/persistConfig";
import { persistStore } from "redux-persist";


import {

  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

export const store = configureStore({
    reducer:{
        cartSlice:persistedCartSlice ,//cartSlice,
        userSlice: userSlice,
        

    },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>