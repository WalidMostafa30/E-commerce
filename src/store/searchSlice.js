import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchData: [],
  filterSearch: [],
  msg: "",
  loading: false,
  error: null,
};

export const getSearchProducts = createAsyncThunk(
  "search/getSearchProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.get(`/json/db.json`);
      return res.data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearch: (state, action) => {
      const title = action.payload;

      if (title.trim().length !== 0) {
        const filterSearch = state.searchData.filter((data) =>
          data.title.toUpperCase().includes(title.trim().toUpperCase())
        );

        if (filterSearch.length > 0) {
          state.filterSearch = filterSearch;
          state.msg = "";
        } else {
          state.msg = "Not found";
        }
      } else {
        state.msg = "";
        state.filterSearch = [];
      }
    },
    cleanSearch: (state) => {
      state.searchData = [];
      state.filterSearch = [];
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchData = action.payload;
      })
      .addCase(getSearchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeSearch, cleanSearch } = searchSlice.actions;
export default searchSlice.reducer;
