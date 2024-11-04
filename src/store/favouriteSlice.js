import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const actLikeToggle = createAsyncThunk(
  "favourites/actLikeToggle",
  async (id, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();

    try {
      return { productId: id, userId: auth.user.id };
    } catch (error) {
      return rejectWithValue("An unexpected error");
    }
  }
);

export const actGetFavourites = createAsyncThunk(
  "favourites/actGetFavourites",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();

    try {
      const res = await axios.get(`/json/db.json`);

      return { userId: auth.user.id, data: res.data.products };
    } catch (error) {
      return rejectWithValue("An unexpected error");
    }
  }
);

const ecomFavourite = localStorage.getItem("ecomFavourite")
  ? JSON.parse(localStorage.getItem("ecomFavourite"))
  : [];

const favouriteInLocalStorage = (data) => {
  localStorage.setItem("ecomFavourite", JSON.stringify(data));
};

const initialState = {
  favourites: [],
  favouriteIds: ecomFavourite,
  error: null,
  loading: false,
};

export const favouritesSlice = createSlice({
  name: "favouritesSlice",
  initialState,
  reducers: {
    favouritesCleanUp: (state) => {
      state.favourites = [];
    },
  },

  extraReducers: (builder) => {
    // add or remove from favourites
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      const { productId, userId } = action.payload;

      const findProduct = state.favouriteIds.find(
        (item) => item.userId === userId && item.productId === productId
      );

      const findProductInFavourite = state.favourites.find(
        (item) => item.id == productId
      );

      if (findProduct) {
        state.favouriteIds = state.favouriteIds.filter(
          (el) => el !== findProduct
        );
        if (findProductInFavourite) {
          state.favourites = state.favourites.filter(
            (el) => el !== findProductInFavourite
          );
        }
      } else {
        state.favouriteIds.push({ productId, userId });
      }
      favouriteInLocalStorage(state.favouriteIds);
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      state.error = action.payload;
    });

    // get favourites items
    builder.addCase(actGetFavourites.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetFavourites.fulfilled, (state, action) => {
      state.loading = false;
      const { userId, data } = action.payload;

      const userItems = state.favouriteIds.filter((item) => item.userId === userId);
      const ids = userItems.map((item) => item.productId);
      const filterProducts = data.filter((item) => ids.includes(item.id));

      state.favourites = filterProducts;
    });
    builder.addCase(actGetFavourites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { favouritesCleanUp } = favouritesSlice.actions;
export default favouritesSlice.reducer;
