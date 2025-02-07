





import axios from "axios";

import { createSlice, createAsyncThunk } from"@reduxjs/toolkit"




const initialState={
    isLoading: false,
    addressList:[],
   
}


export const addNewAddress = createAsyncThunk(
  "addAddress/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/shop/address/add`,
      formData,
      {
        headers: { 'Content-Type': "application/json" },
        withCredentials: true, 
      }
    );

    return response.data;
  }
);

export const fetchAllAddress = createAsyncThunk(
    "addAddress/fetchAllAddress",
    async (userId) => {



      const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/shop/address/get/${userId}`,
      {
        withCredentials: true, 
      }
     
      );
  
      return result.data;
    }
  );



  export const deleteAddress = createAsyncThunk(
    "addAddress/deleteAddress",
    async (addressId) => {



      const result = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/shop/address/delete/${addressId}`,
      {
        withCredentials: true, 
      }
     
      );
  
      return result.data;
    }
  );
 
 
  export const updateAddress = createAsyncThunk(
    "addAddress/updateAddress",
    async ({addressId,formData}) => {



      const result = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/shop/address/edit/${addressId}`,formData,
      
     
      );
  
      return result.data;
    }
  );
 

const addressSlice=createSlice({
    name:"address",
    initialState,
     reducers:{},
     extraReducers:(builder)=>{
 builder
 .addCase(addNewAddress.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(addNewAddress.fulfilled, (state, action) => {
    state.isLoading = false;
    state.addressList = action.payload.data;
  })
  .addCase(addNewAddress.rejected, (state) => {
    state.isLoading = false;
    state.addressList = [];
  })
  .addCase(fetchAllAddress.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(fetchAllAddress.fulfilled, (state, action) => {
    state.isLoading = false;
    state.addressList = action.payload.data;
  })
  .addCase(fetchAllAddress.rejected, (state) => {
    state.isLoading = false;
    state.addressList = [];
  })
     },

})

export const {} = addressSlice.actions;
export default addressSlice.reducer;