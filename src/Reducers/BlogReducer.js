import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {supabase} from '../config/supabase.js'

export const fetchBlogs = createAsyncThunk('fetchBlogs', async () => {
    let { data, error } = await supabase
    .from('articles')
          .select(`
        *,
        articlestatus(*),
        authors(*),
        categories(*),
        post_type(*),
        publication(*)
          `).eq('status', 3).eq('publication_id', 2) // Replace with your API call
if(error){
    console.log(error)
}
  return data;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBlogs.pending, state => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectBlogs = state => state.blogs.blogs;
export const BlogsLoading = state => state.blogs.loading;
export const BlogsError = state => state.blogs.error;

export default blogSlice.reducer;
