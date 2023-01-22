import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  message: "",
};

export const categoryListSlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {
    getAllCategories: (state, action) => {
      state.list = action.payload;
    },
    noItemsFound: (state, action) => {
      state.message = action.payload;
    },
    addCategory: (state, action) => {
      state.list.push(action.payload);
    },
    updateCategoryList: (state, action) => {
      state.list = action.payload;
    },
    updateCategoryName: (state, action) => {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllCategories,
  addCategory,
  updateCategoryList,
  noItemsFound,
  updateCategoryName,
} = categoryListSlice.actions;

export default categoryListSlice.reducer;
