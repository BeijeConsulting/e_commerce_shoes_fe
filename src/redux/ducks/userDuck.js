import { createSlice } from "@reduxjs/toolkit";

//actionCreator
export const setUserCredentials = (obj) => (dispatch) => {
  try {
    return dispatch(setUserCredentialsAction(obj));
  } catch (err) {
    return console.log(err);
  }
};

// Slice
const userDuck = createSlice({
  name: "user",
  initialState: {
    name: "",
    cartItems: 0,
    wishlistItems: 0,
  },
  reducers: {
    setUserCredentialsAction: (state, action) => {
      state.name = action.payload.name;
      state.cartItems = action.payload.cartItems;
      state.wishlistItems = action.payload.wishlistItems;
    },
  },
});

export default userDuck.reducer;

// Actions
const { setUserCredentialsAction } = userDuck.actions;
