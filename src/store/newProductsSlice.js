import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNewProducts = createAsyncThunk(
  "newProducts/getNewProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.get(`/db.json`);
      const filterProducts = res.data.products.filter(
        (product) => product.new === true
      );
      return filterProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = { products: [], isLoading: false, error: null };

const newProductsSlice = createSlice({
  name: "newProducts",
  initialState,
  reducers: {
    cleanNewProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getNewProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { cleanNewProducts } = newProductsSlice.actions;
export default newProductsSlice.reducer;
