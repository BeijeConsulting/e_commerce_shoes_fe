import { createSlice } from "@reduxjs/toolkit";

//actionCreator
export const setUserCredentials = (obj) => (dispatch) => {
  try {
    return dispatch(setUserCredentialsAction(obj));
  } catch (err) {
    return console.log(err);
  }
};

export const removeUserCredentials = () => (dispatch) => {
  try {
    return dispatch(removeUserCredentialsAction());
  } catch (err) {
    return console.log(err);
  }
};

// Slice
const userDuck = createSlice({
  name: "user",
  initialState: {
    name: "",
    surname: "",
    email: "",
    adresses: [],
    birthDate: "",
    cartItems: 0,
    wishlistItems: 0,
    isLogged: false,
  },
  reducers: {
    setUserCredentialsAction: (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.adresses = action.payload.adresses;
      state.birthDate = action.payload.birthDate;
      state.cartItems = action.payload.cartItems;
      state.wishlistItems = action.payload.wishlistItems;
    },
    removeUserCredentialsAction: (state) => {
      state.isLogged = false;
      state.name = "";
      state.surname = "";
      state.email = "";
      state.adresses = [];
      state.birthDate = "";
      state.cartItems = 0;
      state.wishlistItems = 0;
    },
  },
});

export default userDuck.reducer;

// Actions
const { setUserCredentialsAction, removeUserCredentialsAction } = userDuck.actions;
