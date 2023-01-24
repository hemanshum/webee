import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNewItem, hydrateItems } from "../slices/FormSlice";

export const addNewForm =
  ({ categoryId, formId }) =>
  async (dispatch) => {
    const newForm = {
      id: formId,
      categoryId,
      formTitle: "",
      fields: [],
    };

    try {
      const jsonFieldValue = await AsyncStorage.getItem("@field_list");
      const fieldList =
        jsonFieldValue != null ? JSON.parse(jsonFieldValue) : [];
      fieldList.map((item) => {
        if (item.categoryId === categoryId) {
          newForm.fields.push(item);
        }
        return;
      });

      const jsonValue = await AsyncStorage.getItem("@form_list");
      const formList = jsonValue != null ? JSON.parse(jsonValue) : [];
      const newFormList = [...formList, newForm];
      // console.log({ newFormList });
      await AsyncStorage.setItem("@form_list", JSON.stringify(newFormList));
      dispatch(addNewItem(newFormList));
    } catch (e) {
      console.log(e);
    }
  };

export const getAllForms = () => async (dispatch) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@form_list");
    const formList = jsonValue != null ? JSON.parse(jsonValue) : [];
    dispatch(hydrateItems(formList));
  } catch (e) {
    console.log(e);
  }
};

export const removeForm = (formId) => async (dispatch) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@form_list");
    const formList = jsonValue != null ? JSON.parse(jsonValue) : [];
    const newFormList = formList.filter((item) => item.id !== formId);
    await AsyncStorage.setItem("@form_list", JSON.stringify(newFormList));
    dispatch(hydrateItems(newFormList));
  } catch (e) {
    console.log(e);
  }
};

export const textField =
  ({ text, formId, fieldId }) =>
  async (dispatch) => {
    console.log({ text, formId, fieldId });
    try {
      const jsonValue = await AsyncStorage.getItem("@form_list");
      const formList = jsonValue != null ? JSON.parse(jsonValue) : [];

      const newFormList = formList.map((item) => {
        if (item.id === formId) {
          const newFields = item.fields.map((field) => {
            if (field.id === fieldId) {
              return { ...field, fieldData: text };
            }
            return field;
          });
          return { ...item, fields: newFields };
        }
        return item;
      });
      await AsyncStorage.setItem("@form_list", JSON.stringify(newFormList));
      dispatch(hydrateItems(newFormList));
    } catch (e) {
      console.log(e);
    }
  };
