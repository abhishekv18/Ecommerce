import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {

  isLoading: false,

  adminReview:[],

};




export const getReviewsAdmin = createAsyncThunk("/admin/getReviewsAdmin", async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/adminReview/get`
    );
  
    return response.data;
  });
const adminReviewSlice = createSlice({
  name: "adminReviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminReview = action.payload.data;
      })
      .addCase(getReviewsAdmin.rejected, (state) => {
        state.isLoading = false;
        state.adminReview = [];
      })
  },
});

export default adminReviewSlice.reducer;