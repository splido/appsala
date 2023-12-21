import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const apiUrl = 'https://appsalabackend-p20y.onrender.com/products'

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const response = await fetch(apiUrl) // Replace with your API call
  const data = await response.json()
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectProducts = state => state.products.products;

export default productSlice.reducer;
