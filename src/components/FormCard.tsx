import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import FormField from "./FormField";
import { useDispatch } from "react-redux";
import { removeForm } from "../store/actions/formActions";

const FormCard = ({ formTitle, fields, formId }) => {
  const dispatch = useDispatch();
  console.log(formId);
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">
        {formTitle === "" ? "Untitled" : formTitle}
      </Text>
      {fields.map((field) => (
        <FormField
          key={field.id}
          fieldType={field.fieldType}
          label={field.label}
          fieldId={field.id}
          formId={formId}
        />
      ))}
      <Button
        icon="inbox-remove"
        mode="text"
        textColor="red"
        style={styles.removeBtn}
        onPress={() => dispatch(removeForm(formId))}
      >
        Remove Form
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  removeBtn: {
    paddingTop: 12,
  },
});

export default FormCard;
