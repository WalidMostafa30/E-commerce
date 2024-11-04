import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBestRateProducts = createAsyncThunk(
  "bestRateProducts/getBestRateProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.get(`/json/db.json`);
      const filterProducts = res.data.products.filter(
        (product) => product.rate === "good"
      );
      return filterProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = { products: [], isLoading: false, error: null };

const bestRateProductsSlice = createSlice({
  name: "bestRateProducts",
  initialState,
  reducers: {
    cleanBestRateProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBestRateProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBestRateProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getBestRateProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { cleanBestRateProducts } = bestRateProductsSlice.actions;
export default bestRateProductsSlice.reducer;
