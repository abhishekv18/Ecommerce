import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
  
    isLoading: false,
    productList:[],
    
}

export const addNewProduct=createAsyncThunk("/products/addnewproduct",
 async(formData)=>{
    const result=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/products/add`,formData,
        {
            headers: { 'Content-Type': "application/json" },
               // withCredentials: true,    
        }
      
    );
    return result?.data;
 }
);
export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/admin/products/get`
      );
  
      return result?.data;
    }
  );
  export const editProduct=createAsyncThunk("/products/editproduct",
    async({id,formData})=>{
       const result=await axios.put(`${import.meta.env.VITE_BASE_URL}/api/admin/products/edit/${id}`,formData,
           {
               headers: { 'Content-Type': "application/json" },
                  // withCredentials: true,    
           }
         
       );
       return result?.data;
    }
   );

   export const deleteProduct=createAsyncThunk("/products/deleteproduct",
    async(id)=>{
       const result=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/admin/products/delete/${id}`
          
         
       );
       return result?.data;
    }
   );
  

  const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {
          setProductList:(state,action)=>{
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        });
    },
  });
  
export const { setProductList } = AdminProductsSlice.actions;
export default AdminProductsSlice.reducer;
