import AsyncStorage from "@react-native-async-storage/async-storage";
import {createSlice, PayloadAction}  from "@reduxjs/toolkit";

interface UserState {
    userData: object;
 
}
const initialState:UserState = {
        userData:{},
      
} 

const userSlice = createSlice({
    name: "userData",
    initialState: initialState,
    reducers:{
        setUserData:(state, action: PayloadAction<object>) => {
            state.userData = action.payload
           AsyncStorage.setItem("USER_DATA", JSON.stringify(action.payload))
        }
    }

})

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;