import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');
export const updateUser = createAsyncThunk('updateUser', async (body) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/update-user/${userId}`
  // const response = await fetch(apiUrl) // Replace with your API call
  // const data = await response.json()
  // return data;
  const res = await fetch(apiUrl, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  console.log(res.json())
  return res.json();
});

export const fetchUser = createAsyncThunk('fetchUser', async (userId) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/profile/${userId}`
  const response = await fetch(apiUrl) // Replace with your API call
  const data = await response.json()
  return data;
});

export const updateUserData = createAsyncThunk('updateUserData', async (userId) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/profile/${userId}`
  const response = await fetch(apiUrl) // Replace with your API call
  const data = await response.json()
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: '',  
    products: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserData.pending, state => {
        state.loading = false;
        state.products = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export const selectUser = state => state.user;

export default userSlice.reducer;
