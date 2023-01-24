import { configureStore } from "@reduxjs/toolkit";
import categoryListReducer from "./slices/CategoryListSlice";
import fieldListReducer from "./slices/FieldSlice";
import formListReducer from "./slices/FormSlice";

const store = configureStore({
  reducer: {
    calegoryList: categoryListReducer,
    fieldList: fieldListReducer,
    formList: formListReducer,
  },
});

export default store;
