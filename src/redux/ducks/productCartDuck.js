import { createSlice } from "@reduxjs/toolkit";

//actionCreator
export const updateCartQuantity = (obj) => (dispatch) => {
  try {
    return dispatch(updateCartQuantityAction(obj));
  } catch (err) {
    return console.log(err);
  }
};

// Slice
const productCartDuck = createSlice({
  name: "productCart",
  initialState: {
    quantity: 0,
  },
  reducers: {
    updateCartQuantityAction: (state, action) => {
      state.quantity = action.payload.quantity;
    },
  },
});

export default productCartDuck.reducer;

// Actions
const { updateCartQuantityAction } = productCartDuck.actions;
