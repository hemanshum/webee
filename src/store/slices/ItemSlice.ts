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
  },
});

export const { addNewItem } = itemSlice.actions;

export default itemSlice.reducer;
