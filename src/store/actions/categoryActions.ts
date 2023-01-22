import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addCategory,
  getAllCategories,
  noItemsFound,
  updateCategoryList,
  updateCategoryName,
} from "../slices/CategoryListSlice";
import { removeFieldsOfRemovedCategory } from "../slices/FieldSlice";

const NO_ITEMS_MSG = "No categories found! Create new.";

export const createNewCategory = () => async (dispatch) => {
  const id = nanoid();
  const category = {
    id,
    name: "New Category",
  };

  try {
    const jsonValue = await AsyncStorage.getItem("@category_list");
    const categoryList = jsonValue != null ? JSON.parse(jsonValue) : [];
    const newCategoryList = [...categoryList, category];
    await AsyncStorage.setItem(
      "@category_list",
      JSON.stringify(newCategoryList)
    );
    dispatch(addCategory(category));
    dispatch(noItemsFound(""));
  } catch (e) {
    console.log(e);
  }
};

export const updateName =
  ({ id, updatedName }) =>
  async (dispatch) => {
    try {
      const jsonValue = await AsyncStorage.getItem("@category_list");
      const categoryList = jsonValue != null ? JSON.parse(jsonValue) : [];
      const newCategoryList = categoryList.map((item) => {
        if (item.id === id) {
          return { ...item, name: updatedName };
        } else {
          return item;
        }
      });

      await AsyncStorage.setItem(
        "@category_list",
        JSON.stringify(newCategoryList)
      );
      dispatch(updateCategoryName(newCategoryList));
    } catch (e) {
      console.log(e);
    }
  };

export const removeCategory = (id: string) => async (dispatch) => {
  try {
    const jsonCategoryValue = await AsyncStorage.getItem("@category_list");
    const jsonFieldValue = await AsyncStorage.getItem("@field_list");
    const categoryList = JSON.parse(jsonCategoryValue);
    const fieldList = jsonFieldValue != null ? JSON.parse(jsonFieldValue) : [];
    const newCategoryList = categoryList.filter((item) => item.id !== id);
    const newFieldList = fieldList.filter((item) => item.categoryId !== id);
    await AsyncStorage.setItem(
      "@category_list",
      JSON.stringify(newCategoryList)
    );
    await AsyncStorage.setItem("@field_list", JSON.stringify(newFieldList));
    dispatch(updateCategoryList(newCategoryList));
    dispatch(removeFieldsOfRemovedCategory(id));
    if (newCategoryList.length === 0) {
      dispatch(noItemsFound(NO_ITEMS_MSG));
    }
  } catch (e) {
    console.log(e);
  }
};

export const getCategoryList = () => async (dispatch) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@category_list");
    const categoryList = jsonValue != null ? JSON.parse(jsonValue) : [];

    if (categoryList.length !== 0) {
      await AsyncStorage.setItem(
        "@category_list",
        JSON.stringify(categoryList)
      );
      dispatch(getAllCategories(categoryList));
      dispatch(noItemsFound(""));
    } else {
      dispatch(noItemsFound(NO_ITEMS_MSG));
    }
  } catch (e) {
    console.log(e);
  }
};
