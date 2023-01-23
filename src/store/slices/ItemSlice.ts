import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const itemSlice = createSlice({
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

export const { addNewItem, hydrateItems } = itemSlice.actions;

export default itemSlice.reducer;
