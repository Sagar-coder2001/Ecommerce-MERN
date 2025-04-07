import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {createProduct , fetchproductbyfilter, fetchproductsbybrand, fetchproductsbycategory, fetchproductsById, updateProduct} from '../Components/Client/Product/Productapi'

const initialState = {
  data: [],
  selectedproduct: [],
  category : [],
  brands : [],
  totalItems: 0,
  status: 'idle'
}

export const fetchcategoryasync = createAsyncThunk(
  'product/fetchproductsbycategory',
  async () => {
    const response = await fetchproductsbycategory();
    return response.data;
  }
);

export const fetchbrandasync = createAsyncThunk(
  'product/fetchproductsbybrand',
  async () => {
    const response = await fetchproductsbybrand();
    return response.data;
  }
);

export const fetchproductByIdasync = createAsyncThunk(
  'product/fetchproductsById',
  async (id) => {
    const response = await fetchproductsById(id);
    return response.data;
  }
);

export const fetchallproductfilterasync = createAsyncThunk(
  'product/fetchproductbyfilter',
  async (filter , sort) => {
    const response = await fetchproductbyfilter(filter , sort);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const Productslice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchproduct: (state , action) => {
      state.data = action.payload;
    },
  },
  extraReducers : (builder) => {
    builder
    // .addCase(fetchallproductasync.pending , (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(fetchallproductasync.fulfilled, (state, action) => {
    //   state.status = 'idle';
    //   state.data = action.payload;
    //   state.totalItems = action.payload.totalItems
    // })
    .addCase(fetchallproductfilterasync.pending , (state) => {
      state.status = 'loading';
    })
    .addCase(fetchallproductfilterasync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.data = action.payload;
      state.totalItems = action.payload.totalItems;
    })
    .addCase(fetchproductByIdasync.pending , (state) => {
      state.status = 'loading';
    })
    .addCase(fetchproductByIdasync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.selectedproduct = action.payload;
    })
    .addCase(fetchcategoryasync.pending , (state) => {
      state.status = 'loading';
    })
    .addCase(fetchcategoryasync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.category = action.payload;
    })
    .addCase(fetchbrandasync.pending , (state) => {
      state.status = 'loading';
    })
    .addCase(fetchbrandasync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.brands = action.payload;
    })
    .addCase(createProductAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createProductAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.data.products.push(action.payload);
    })
    .addCase(updateProductAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateProductAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      const index = state.data.findIndex(
        (product) => product.id === action.payload.id
      );
      state.data[index] = action.payload;
      state.selectedproduct = action.payload;

    });
  }
})

// Action creators are generated for each case reducer function
export const { fetchproduct } = Productslice.actions

export const selectallproducts = (state) => state.product.data;
export const selectproductById = (state) => state.product.selectedproduct;
export const categories = (state) => state.product.category;
export const brands = (state) => state.product.brands;

export const selectstatus = (state) => state.product.status;


export const selectTotalItems = (state) => state.product.totalItems;


export default Productslice.reducer