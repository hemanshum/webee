import { View, StyleSheet } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import FormField from "./FormField";

const FormCard = ({ formId, label, type }) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{label}</Text>
      {/* <FormField fieldType={"Text"} label={"Test"} />
      <FormField fieldType={"Text"} label={"Test"} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default FormCard;
