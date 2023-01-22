import { View, StyleSheet } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import FormField from "./FormField";

const FormCard = ({ formTitle, fields }) => {
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
        />
      ))}
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
});

export default FormCard;
