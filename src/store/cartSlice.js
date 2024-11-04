import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const CartAction = createAsyncThunk(
  "cart/CartAction",
  async ({ id, act }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();

    try {
      return { productId: id, userId: auth.user.id, act };
    } catch (error) {
      return rejectWithValue("An unexpected error");
    }
  }
);

export const actGetCart = createAsyncThunk(
  "cart/actGetCart",
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

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();

    try {
      return auth.user.id;
    } catch (error) {
      return rejectWithValue("An unexpected error");
    }
  }
);

const ecomCart = localStorage.getItem("ecomCart")
  ? JSON.parse(localStorage.getItem("ecomCart"))
  : [];

const cartInLocalStorage = (data) => {
  localStorage.setItem("ecomCart", JSON.stringify(data));
};

const initialState = {
  cart: [],
  cartIds: ecomCart,
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cleanCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CartAction.pending, (state) => {
      state.error = null;
    });
    builder.addCase(CartAction.fulfilled, (state, action) => {
      const { productId, userId, act } = action.payload;

      const findProduct = state.cartIds.find(
        (item) => item.userId === userId && item.productId === productId
      );

      const findProductInCart = state.cart.find((item) => item.id == productId);

      if (act === "add") {
        if (findProduct) {
          // increase product quantity
          findProduct.quantity++;
          findProductInCart && findProductInCart.quantity++;
        } else {
          // add product to cart
          state.cartIds.push({ userId, productId, quantity: 1 });
        }
        cartInLocalStorage(state.cartIds);
      } else if (act === "decrease") {
        // decrease product quantity
        if (findProduct.quantity > 1) {
          findProduct.quantity--;
          findProductInCart.quantity--;
        } else {
          // remove product from cart
          state.cartIds = state.cartIds.filter((item) => item !== findProduct);
          state.cart = state.cart.filter((item) => item !== findProductInCart);
        }
        cartInLocalStorage(state.cartIds);
      } else if (act === "remove") {
        // remove product from cart
        state.cartIds = state.cartIds.filter((item) => item !== findProduct);
        state.cart = state.cart.filter((item) => item !== findProductInCart);
        cartInLocalStorage(state.cartIds);
      }
    });
    builder.addCase(CartAction.rejected, (state, action) => {
      state.error = action.payload;
    });

    // get cart
    builder.addCase(actGetCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(actGetCart.fulfilled, (state, action) => {
      state.isLoading = false;
      const { userId, data } = action.payload;

      const userItems = state.cartIds.filter((item) => item.userId === userId);
      const ids = userItems.map((item) => item.productId);
      const filterProducts = data
        .filter((item) => ids.includes(item.id))
        .map((item) => {
          const quantityObj = state.cartIds.find(
            (q) => q.productId === item.id
          );

          return {
            ...item,
            quantity: quantityObj.quantity,
          };
        });

      state.cart = filterProducts;
    });
    builder.addCase(actGetCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // delete cart
    builder.addCase(deleteCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.isLoading = false;
      const userId = action.payload;

      state.cartIds = state.cartIds.filter((item) => item.userId !== userId);
      state.cart = [];
      cartInLocalStorage(state.cartIds);
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
