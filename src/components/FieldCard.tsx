import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View } from "react-native";
import {
  Chip,
  IconButton,
  MD3Colors,
  Text,
  TextInput,
} from "react-native-paper";

import { addLabelName, removeField } from "../store/actions/fieldActions";

const FieldCard = ({ categoryId, type, id, label }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TextInput
        label="Field Name"
        value={text === "" ? label : text}
        onChangeText={(text) => {
          setText(text);
          dispatch(addLabelName({ id, name: text, categoryId }));
        }}
        mode="outlined"
        keyboardType="default"
        autoFocus
        style={styles.input}
      />
      <Chip mode="outlined">{type}</Chip>
      <IconButton
        icon="close-octagon-outline"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => dispatch(removeField({ id, categoryId }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  input: {
    width: "50%",
  },
  textContainer: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#8F8CE7",
    borderRadius: 8,
  },
});

export default FieldCard;
