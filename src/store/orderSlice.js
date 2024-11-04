import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ name, email }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth, cart } = getState();

    try {
      const userCart = cart.cartIds.filter(
        (item) => item.userId === auth.user.id
      );

      const ids = userCart.map((item) => item.productId);

      const products = (await axios.get(`/json/db.json`)).data.products;

      const fullProducts = products
        .filter((item) => ids.includes(item.id))
        .map((item) => {
          const quantityObj = userCart.find((el) => el.productId === item.id);

          return {
            id: item.id,
            title: item.title,
            image: item.images[0],
            price: item.price,
            quantity: quantityObj.quantity,
          };
        });

      const totalProduct = fullProducts.length;

      const totalPrice = fullProducts.reduce((acc, product) => {
        acc += product.price * product.quantity;
        return acc;
      }, 0);

      const totalPieces = fullProducts.reduce((acc, product) => {
        acc += product.quantity;
        return acc;
      }, 0);

      const time = new Date();

      const orderData = {
        id: new Date().getTime(),
        userId: auth.user.id,
        name,
        email,
        date: `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`,
        time: `${time.getHours()}:${time.getMinutes()}`,
        totalProduct,
        totalPieces,
        totalPrice,
        products: fullProducts,
      };

      return orderData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ecomOrder = localStorage.getItem("ecomOrder")
  ? JSON.parse(localStorage.getItem("ecomOrder"))
  : [];

const orderInLocalStorage = (data) => {
  localStorage.setItem("ecomOrder", JSON.stringify(data));
};

const initialState = {
  orders: ecomOrder,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    cleanOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    // get orders
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
        orderInLocalStorage(state.orders);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
        orderInLocalStorage(state.orders);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { cleanOrders } = orderSlice.actions;
export default orderSlice.reducer;
