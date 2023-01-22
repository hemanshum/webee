import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";

const SelectList = ({ onSelect }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const MenuButton = () => {
    return (
      <Button icon="plus" mode="contained" onPress={openMenu}>
        Add new field
      </Button>
    );
  };

  const sendData = (type: string) => {
    onSelect(type);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Menu
          style={styles.menu}
          visible={visible}
          onDismiss={closeMenu}
          anchor={MenuButton()}
        >
          <Menu.Item
            title="Text"
            onPress={() => {
              sendData("Text");
              closeMenu();
            }}
          />
          <Menu.Item
            title="Checkbox"
            onPress={() => {
              sendData("Checkbox");
              closeMenu();
            }}
          />
          <Menu.Item
            title="Date"
            onPress={() => {
              sendData("Date");
              closeMenu();
            }}
          />
          <Menu.Item
            title="Number"
            onPress={() => {
              sendData("Number");
              closeMenu();
            }}
          />
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 180,
  },
  menu: {
    position: "absolute",
    top: -150,
    left: 0,
  },
});

export default SelectList;
