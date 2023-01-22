import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "@reduxjs/toolkit";
import { addNewItem } from "../slices/ItemSlice";

export const addNewForm = (categoryId) => async (dispatch) => {
  const formId = nanoid();

  try {
    const jsonFieldValue = await AsyncStorage.getItem("@field_list");
    const fieldList = jsonFieldValue != null ? JSON.parse(jsonFieldValue) : [];
    const formFields = fieldList.map((item) => {
      if (item.categoryId === categoryId) {
        return { ...item, formId, defaultLabel: false };
      }
      return;
    });
    console.log({ formFields });
    const jsonValue = await AsyncStorage.getItem("@form_list");
    const formList = jsonValue != null ? JSON.parse(jsonValue) : [];
    const newFormList = [...formList, ...formFields];
    await AsyncStorage.setItem("@form_list", JSON.stringify(newFormList));
    dispatch(addNewItem(newFormList));
  } catch (e) {
    console.log(e);
  }
};
