import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');
export const updateUser = createAsyncThunk('updateUser', async (body) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/update-user/${userId}`
  const res = await fetch(apiUrl, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json()
  console.log("Response data:", data);
  return data;
});

export const fetchUser = createAsyncThunk('fetchUser', async (userId) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/profile/${userId}`
  const response = await fetch(apiUrl) // Replace with your API call
  const data = await response.json()
  console.log("Response data:", data);
  return data;
});

export const updateUserData = createAsyncThunk('updateUserData', async (userId) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/profile/${userId}`
  const response = await fetch(apiUrl) // Replace with your API call
  const data = await response.json()
  console.log("Response data:", data);
  return data;
});


export const updateUserProductStatus = createAsyncThunk('updateUserProductStatus', async (body) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/update-status/${body.productId}`
  const res = await fetch(apiUrl, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status: body.status }),
  });
  const data = await res.json();
  console.log("Response data:", data);
  return data;
});
export const updateSubscriptionDetails = createAsyncThunk('updateSubscriptionDetails', async (body) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/updatePricingInfoInUserSchema/${body.Id}`
  const res = await fetch(apiUrl, { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body.form),
  });
  const data = await res.json();
  console.log("Response data:", data);
  return data;
});

export const updateUserRatings = createAsyncThunk('updateUserRatings', async (body) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/rating/${body.Id}`
  const res = await fetch(apiUrl, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ rating: body.ratings }),
  });
  const data = await res.json();
  console.log("Response data:", data);
  return data;
});

export const postComment = createAsyncThunk('postComment', async (body) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/comment/${body.Id}`
  const res = await fetch(apiUrl,{
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: body.comment }),
  }
);
  const data = await res.json();
  console.log("Response data:", data);
  return data;
});

export const deleteComment = createAsyncThunk('deleteComment', async (Id) => {
  const apiUrl =`https://appsala-backend.netlify.app/.netlify/functions/index/deleteComment/${Id}`
  const res = await fetch(apiUrl,{
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);
  const data = await res.json();
  console.log("Response data:", data);
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
      })
      .addCase(updateUserProductStatus.pending, state => {
        state.loading = false;
      })
      .addCase(updateUserProductStatus.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateUserProductStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postComment.pending, state => {
        state.loading = false;
      })
      .addCase(postComment.fulfilled, state => {
        state.loading = false;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, state => {
        state.loading = false;
      })
      .addCase(deleteComment.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserRatings.pending, state => {
        state.loading = false;
      })
      .addCase(updateUserRatings.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateUserRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateSubscriptionDetails.pending, state => {
        state.loading = false;
      })
      .addCase(updateSubscriptionDetails.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateSubscriptionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export const selectUser = state => state.user;

export default userSlice.reducer;
