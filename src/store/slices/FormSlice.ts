import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const FormSlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {
    addNewItem: (state, action) => {
      state.items = action.payload;
    },
    hydrateItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addNewItem, hydrateItems } = FormSlice.actions;

export default FormSlice.reducer;
