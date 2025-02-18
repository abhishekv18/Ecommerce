import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "@/lib/base";

const initialState={
  
    isLoading: false,
    productList:[],
    
}

export const addNewProduct=createAsyncThunk("/products/addnewproduct",
 async(formData)=>{
    const result=await axios.post(`${baseURL}/admin/products/add`,formData,
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
        `${baseURL}/admin/products/get`
      );
  
      return result?.data;
    }
  );
  export const editProduct=createAsyncThunk("/products/editproduct",
    async({id,formData})=>{
       const result=await axios.put(`${baseURL}/admin/products/edit/${id}`,formData,
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
       const result=await axios.delete(`${baseURL}/admin/products/delete/${id}`
          
         
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
