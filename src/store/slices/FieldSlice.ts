import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const fieldSlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {
    getFields: (state, action) => {
      state.list = action.payload;
    },
    addField: (state, action) => {
      state.list.push(action.payload);
    },
    removeFieldsOfRemovedCategory: (state, action) => {
      const fieldList = state.list.filter(
        (item) => item.categoryId !== action.payload.id
      );

      state.list = fieldList;
    },
    removeAField: (state, action) => {
      const fieldList = state.list.filter((item) => item.id !== action.payload);

      state.list = fieldList;
    },
    addFieldName: (state, action) => {
      const fieldList = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, label: action.payload.name };
        }
        return item;
      });
      state.list = fieldList;
    },
  },
});

export const {
  addField,
  removeFieldsOfRemovedCategory,
  getFields,
  addFieldName,
  removeAField,
} = fieldSlice.actions;

export default fieldSlice.reducer;
