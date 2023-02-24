import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
    try {
        const resp = await axios(url)
        console.log(resp)
        return resp.data;
    } catch (error) {
        
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId); // if item.id matches the payload.id , then its should not be returned
            
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount += 1;
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount -= 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total =0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price
            })
            state.amount = amount;
            state.total = total;
        },  
        
    },
    extraReducers:{
        [getCartItems.pending]:(state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]:(state, action) => {
            state.isLoading = false;
            state.cartItem = action.payload;
        },
        [getCartItems.rejected]:(state) => {
            state.isLoading = false;
        }
    }
    
    

})



export default cartSlice.reducer;
export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions;


