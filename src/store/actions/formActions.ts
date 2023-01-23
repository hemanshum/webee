import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNewItem, hydrateItems } from "../slices/ItemSlice";

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
  const jsonValue = await AsyncStorage.getItem("@form_list");
  const formList = jsonValue != null ? JSON.parse(jsonValue) : [];
  dispatch(hydrateItems(formList));
};
