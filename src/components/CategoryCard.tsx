import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { removeCategory, updateName } from "../store/actions/categoryActions";
import { addNewField, getFieldList } from "../store/actions/fieldActions";

import SelectList from "./SelectList";
import FieldCard from "./FieldCard";
import { nanoid } from "@reduxjs/toolkit";

type Props = {
  name: string;
  id: string;
};

const CategoryCard = ({ name, id }: Props) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { list: fieldList } = useSelector((state) => state.fieldList);

  const createField = (field) => {
    const data = {
      categoryId: id,
      id: nanoid(),
      fieldType: field,
    };
    dispatch(addNewField(data));
  };

  useEffect(() => {
    dispatch(getFieldList());
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{text === "" ? name : text}</Text>
      <TextInput
        label="Category Name"
        value={text === "" ? name : text}
        onChangeText={(text) => {
          setText(text);
          dispatch(updateName({ id, updatedName: text }));
        }}
        placeholder={name}
        mode="outlined"
        keyboardType="default"
        autoFocus
      />
      {fieldList.map((item) => {
        if (item.categoryId === id) {
          return (
            <FieldCard
              key={item.id}
              type={item.fieldType}
              id={item.id}
              label={item.label}
            />
          );
        }
        return;
      })}
      <Button
        style={styles.titleBtn}
        mode="elevated"
        onPress={() => console.log("Pressed")}
      >
        Title Field: Unnamed
      </Button>
      <View style={styles.buttonContainer}>
        <SelectList onSelect={(field) => createField(field)} />
        <Button
          icon="inbox-remove"
          mode="text"
          textColor="red"
          onPress={() => dispatch(removeCategory(id))}
        >
          Remove
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  titleBtn: {
    marginTop: 8,
  },
});

export default CategoryCard;
