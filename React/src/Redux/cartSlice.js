import { createSlice } from '@reduxjs/toolkit';

// Load the cart state from localStorage or initialize it if not present
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const existingProduct = state.cart.find(item => item.data.id === action.payload.data.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removefromCart: (state, action) => {
      const product = state.cart.find(item => item.data.id === action.payload.id);
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cart = state.cart.filter(item => item.data.id !== action.payload.id);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  }
});

export default cartSlice.reducer;
export const { addtoCart, removefromCart } = cartSlice.actions;
