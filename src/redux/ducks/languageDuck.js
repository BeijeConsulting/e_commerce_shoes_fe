import { createSlice } from "@reduxjs/toolkit";
import i18n from '../../assets/translations/i18n';

//actionCreator
export const setLanguage = (obj) => (dispatch) => {
    try {
        return dispatch(setLanguageAction(obj));
    } catch (err) {
        return console.log(err);
    }
};

// Slice
const languageDuck = createSlice({
    name: "languageDuck",
    initialState: {
        currentLanguage: localStorage.getItem('currentLanguage')
    },
    reducers: {
        setLanguageAction: (state, action) => {
            state.currentLanguage = action.payload.currentLanguage;
            localStorage.setItem('currentLanguage', action.payload.currentLanguage);
        }
    },
});

export default languageDuck.reducer;

// Actions
const { setLanguageAction } = languageDuck.actions;
