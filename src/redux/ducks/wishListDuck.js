import { createSlice } from "@reduxjs/toolkit";

//actionCreator
export const updateWishListQuantity = (obj) => (dispatch) => {
    try {
        return dispatch(updateWishListAction(obj));
    } catch (err) {
        return console.log(err);
    }
};

// Slice
const wishListDuck = createSlice({
    name: "wishList",
    initialState: {
        quantity: 0
    },
    reducers: {
        updateWishListAction: (state, action) => {
            state.quantity = action.payload.quantity;
        },
    },
});

export default wishListDuck.reducer;

// Actions
const { updateWishListAction } = wishListDuck.actions;
