import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
// import DatePicker from "react-native-datepicker";
import DatePicker from "react-native-modern-datepicker";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const FormField = ({ fieldType, label }) => {
  const [text, setText] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(`${year}/${month}/${day}`);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  if (fieldType === "Text") {
    return (
      <View style={styles.spacer}>
        <TextInput
          label={label}
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
    );
  } else if (fieldType === "Checkbox") {
    return (
      <View style={[styles.spacer, styles.switchContainer]}>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        <Text style={{ marginLeft: 8 }} variant="labelSmall">
          {label}
        </Text>
      </View>
    );
  } else if (fieldType === "Date") {
    return (
      <View style={styles.spacer}>
        <Button mode="contained-tonal" onPress={() => showModal()}>
          {label} - {selectedDate}
        </Button>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            <DatePicker
              onSelectedChange={(date) => {
                setSelectedDate(date);
                hideModal();
              }}
              mode="calendar"
            />
          </Modal>
        </Portal>
      </View>
    );
  }
  //Field type number
  return (
    <View style={styles.spacer}>
      <TextInput
        label={label}
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spacer: {
    marginVertical: 4,
  },
  datePickerStyle: {
    width: "100%",
    marginTop: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
});

export default FormField;
