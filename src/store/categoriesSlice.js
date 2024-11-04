import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.get(`/json/db.json`);

      return res.data.categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = { categories: [], isLoading: false, error: null };

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanCategories: (state) => {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { cleanCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
