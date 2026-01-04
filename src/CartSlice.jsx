import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        addedToCart: {} // Track items added to cart
    },
    reducers: {
        addItem: (state, action) => {
            const {name, image, cost} = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({name, image, cost, quantity: 1, addedToCart: true});
            }
            state.addedToCart = { ...state.addedToCart, [action.payload.name]: true };
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload);
            state.addedToCart = { ...state.addedToCart, [action.payload]: false };
        },

        updateQuantity: (state, action) => {
            const {name, quantity} = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
            state.addedToCart = { ...state.addedToCart, ...action.payload };
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
