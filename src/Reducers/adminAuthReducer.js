import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  adminUser: localStorage.getItem('appsalaAdminUser') || null,
  loading: false,
  error: null,
  isAdmin: Boolean(localStorage.getItem('appsalaAdminUser')),
  }; 
const apiUrl = 'https://appsala-backend.netlify.app/.netlify/functions/index/api/admin/login'


export const adminLogin = createAsyncThunk('auth/adminLogin', async (body, { rejectWithValue }) => {
  try {
    const res = await fetch(apiUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // Check if the response status is not in the 2xx range
      const errorData = await res.json(); // Assuming your server returns error details as JSON
      throw new Error(errorData.message); // You can customize this error handling based on your server's response format
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const adminLogout = createAsyncThunk('auth/adminLogout', async () => {
  localStorage.removeItem('appsalaAdminUser');
  return true; // Returning a value to indicate successful logout
});


const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminUser = action.payload.data;
        state.isAdmin = true;
        localStorage.setItem('appsalaAdminUser', JSON.stringify(action.payload.data));        
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.adminUser = null;
        state.isAdmin = false;
      });
  },
});

export default adminAuthSlice.reducer;
