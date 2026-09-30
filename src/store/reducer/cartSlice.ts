import { createSlice } from "@reduxjs/toolkit";



interface CartItems {
    id:number | string;
    name: string;
    qty: number;
    sum : number;
    price :number 


}
interface CartState {
    items: CartItems[]
}
const initialState:CartState = {
    items:[]
}

 const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        // add item to cart 
        addItemToCart:(state, action) => {

            const isItemExist = state.items.find(
                item => item.id===action.payload.id
            )
            if(isItemExist){
                isItemExist.qty += 1
                isItemExist.sum += action.payload.price
            }else{
                state.items.push({
                ...action.payload,
                qty:1,
                sum:action.payload.price
            })
            }
           
        },
        // remove from cart 
        removeFromCart:(state,action) =>{
             const isItemExist = state.items.find(
                item => item.id===action.payload.id
            )
            if( isItemExist && isItemExist.qty !=1){
                 isItemExist.qty -= 1
                 isItemExist.sum -= action.payload.price

            }else{
                state.items=state.items.filter(
                item => item.id !== action.payload.id
            )
            }
            
        },
        increaseItem:(state,action)=>{
             const isItemExist = state.items.find(
                item => item.id===action.payload.id
            )
             if( isItemExist && isItemExist.qty >=1){
                 isItemExist.qty += 1
                 isItemExist.sum += action.payload.price

            }else{
                state.items=state.items.filter(
                item => item.id !== action.payload.id
            )
            }
            
        },
        removeTotalItem:(state,action) =>{
            state.items=state.items.filter(
                item => item.id !== action.payload.id)
        }

    }
})

export const {addItemToCart, removeFromCart,increaseItem, removeTotalItem} = cartSlice.actions;
export default cartSlice.reducer;