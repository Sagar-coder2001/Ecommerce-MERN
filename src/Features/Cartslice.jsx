import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addToCart, deleteCart, fetchItemsById, resetCart, updateCart } from '../Components/Client/Cart/Cartapi';

const initialState = {
  value: '',
  items : []
}

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
)

export const fechItemByProductIdAsync = createAsyncThunk(
    'cart/fetchItemsById',
    async (id) => {
      const response = await fetchItemsById(id);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const updateItemAsync = createAsyncThunk(
    'cart/updateCart',
    async (item) => {
      const response = await updateCart(item);
      return response.data;
    }
  )

  export const deleteItemAsync = createAsyncThunk(
    'cart/deleteCart',
    async (id) => {
      const response = await deleteCart(id);
      return response.data;
    }
  )

  export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async (id) => {
      const response = await resetCart(id);
      return response.data;
    }
  )
  


export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => { 
    builder
    .addCase(addToCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
          state.items.push(action.payload);
      })
    .addCase(fechItemByProductIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fechItemByProductIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.product.id === action.payload.id)
        state.items[index] = (action.payload);
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.product.id === action.payload.id)
        state.items.splice(index ,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
          state.status = 'idle';
            state.items = (action.payload);
        })
  }
})

export const selectCartItems = (state) => state.cart.items;


export default CartSlice.reducer