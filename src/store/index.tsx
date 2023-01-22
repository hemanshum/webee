import { configureStore } from "@reduxjs/toolkit";
import categoryListReducer from "./slices/CategoryListSlice";
import fieldListReducer from "./slices/FieldSlice";
import itemListReducer from "./slices/ItemSlice";

const store = configureStore({
  reducer: {
    calegoryList: categoryListReducer,
    fieldList: fieldListReducer,
    itemList: itemListReducer,
  },
});

export default store;
