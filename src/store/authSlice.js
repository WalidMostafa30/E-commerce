import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const usersInLS = localStorage.getItem("usersInLS")
  ? JSON.parse(localStorage.getItem("usersInLS"))
  : [];

const userInLS = localStorage.getItem("userInLS")
  ? JSON.parse(localStorage.getItem("userInLS"))
  : null;

const usersInLocalStorage = (data) => {
  localStorage.setItem("usersInLS", JSON.stringify(data));
};

const userInLocalStorage = (data) => {
  localStorage.setItem("userInLS", JSON.stringify(data));
};

const initialState = {
  users: usersInLS,
  user: userInLS,
  loading: false,
  error: null,
};

export const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData, thunk) => {
    const { rejectWithValue, getState } = thunk;
    const { auth } = getState();

    try {
      const findUser = auth.users.find((user) => user.email === formData.email);
      if (!findUser) {
        return formData;
      } else {
        return rejectWithValue("this email is already used");
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData, thunk) => {
    const { rejectWithValue, getState } = thunk;
    const { auth } = getState();

    const findUser = auth.users.find((user) => user.email === formData.email);
    try {
      if (findUser) {
        if (findUser.password === formData.password) {
          return findUser;
        } else {
          return rejectWithValue("password is incorrect");
        }
      } else {
        return rejectWithValue("user not found");
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogout: (state) => {
      state.user = null;
      userInLocalStorage(state.user);
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      usersInLocalStorage(state.users);
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      userInLocalStorage(state.user);
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
