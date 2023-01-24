import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addField,
  addFieldName,
  getFields,
  removeAField,
} from "../slices/FieldSlice";
import { hydrateItems } from "../slices/FormSlice";

export const addNewField = (data) => async (dispatch) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@field_list");
    const fieldList = jsonValue != null ? JSON.parse(jsonValue) : [];
    const newFieldList = [...fieldList, data];
    await AsyncStorage.setItem("@field_list", JSON.stringify(newFieldList));
    const jsonFormValue = await AsyncStorage.getItem("@form_list");
    const formList = jsonValue != null ? JSON.parse(jsonFormValue) : [];

    const newFormList = formList.map((item) => {
      if (item.categoryId === data.categoryId) {
        return { ...item, fields: [...item.fields, data] };
      }
      return item;
    });
    await AsyncStorage.setItem("@form_list", JSON.stringify(newFormList));

    dispatch(addField(data));
    dispatch(hydrateItems(newFormList));
  } catch (e) {
    console.log(e);
  }
};

export const getFieldList = () => async (dispatch) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@field_list");
    const fieldList = jsonValue != null ? JSON.parse(jsonValue) : [];
    dispatch(getFields(fieldList));
  } catch (e) {
    console.log(e);
  }
};

export const addLabelName =
  ({ id, name, categoryId }) =>
  async (dispatch) => {
    try {
      const jsonValue = await AsyncStorage.getItem("@field_list");
      const fieldList = jsonValue != null ? JSON.parse(jsonValue) : [];
      const fieldNameAdded = fieldList.map((item) => {
        if (item.id === id) {
          return { ...item, label: name };
        }
        return item;
      });
      await AsyncStorage.setItem("@field_list", JSON.stringify(fieldNameAdded));
      //Update Forms
      const jsonFormValue = await AsyncStorage.getItem("@form_list");
      const formList = jsonValue != null ? JSON.parse(jsonFormValue) : [];

      const newFormList = formList.map((item) => {
        if (item.categoryId === categoryId) {
          let newFields = item.fields.map((field) => {
            if (field.id === id) {
              return { ...field, label: name };
            }
            return field;
          });
          return { ...item, fields: newFields };
        }
        return item;
      });
      await AsyncStorage.setItem("@form_list", JSON.stringify(newFormList));

      dispatch(addFieldName({ id, name }));
      dispatch(hydrateItems(newFormList));
    } catch (e) {
      console.log(e);
    }
  };

export const removeField =
  ({ id, categoryId }) =>
  async (dispatch) => {
    try {
      const jsonValue = await AsyncStorage.getItem("@field_list");
      const fieldList = jsonValue != null ? JSON.parse(jsonValue) : [];
      const updatedFields = fieldList.filter((item) => item.id !== id);
      await AsyncStorage.setItem("@field_list", JSON.stringify(updatedFields));

      const jsonFormValue = await AsyncStorage.getItem("@form_list");
      const formList = jsonValue != null ? JSON.parse(jsonFormValue) : [];

      let newForm;
      const newFormList = formList.map((item) => {
        if (item.categoryId === categoryId) {
          newForm = item.fields.filter((item) => item.id !== id);
          return { ...item, fields: newForm };
        }
        return item;
      });
      console.log({ newFormList });
      await AsyncStorage.setItem("@form_list", JSON.stringify(newFormList));

      dispatch(removeAField(id));
      dispatch(hydrateItems(newFormList));
    } catch (e) {
      console.log(e);
    }
  };
