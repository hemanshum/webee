import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text, TextInput } from "react-native-paper";
import DatePicker from "react-native-datepicker";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const FormField = ({ fieldType, label }) => {
  const [text, setText] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [date, setDate] = useState(`${day}-${month}-${year}`);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  if (fieldType === "Text") {
    return (
      <TextInput
        label={label}
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
        style={styles.input}
      />
    );
  } else if (fieldType === "Checkbox") {
    return (
      <View>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        <Text variant="labelSmall">Label Small</Text>
      </View>
    );
  } else if (fieldType === "Date") {
    <DatePicker
      style={styles.datePickerStyle}
      date={date} //initial date from state
      mode="date" //The enum of date, datetime and time
      placeholder="select date"
      format="DD-MM-YYYY"
      minDate="01-01-2015"
      maxDate="01-01-2025"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          display: "none",
        },
        dateInput: {
          marginLeft: 36,
        },
      }}
      onDateChange={(date) => {
        setDate(date);
      }}
    />;
  } else {
    //Field type number
    <TextInput
      label={label}
      mode="outlined"
      value={text}
      onChangeText={(text) => setText(text)}
      style={styles.input}
    />;
  }
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

export default FormField;
