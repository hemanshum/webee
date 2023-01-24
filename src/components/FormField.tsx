import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { textField } from "../store/actions/formActions";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const FormField = ({ fieldType, label, fieldId, formId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(`${year}/${month}/${day}`);
  const [visible, setVisible] = React.useState(false);
  const [valueText, setValueText] = useState("");
  const { items } = useSelector((state) => state.formList);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    getFieldValue();
  }, [items]);

  const getFieldValue = () => {
    items.map((form) => {
      if (form.id === formId) {
        form.fields.map((field) => {
          if (field.id === fieldId) {
            console.log("getFieldValue", field.fieldData);
            setValueText(field.fieldData);
          }
        });
      }
    });
  };

  if (fieldType === "Text") {
    return (
      <View style={styles.spacer}>
        <TextInput
          label={label}
          mode="outlined"
          value={text === "" ? valueText : text}
          onChangeText={(text) => {
            setText(text);
            dispatch(textField({ text, formId, fieldId }));
          }}
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
      <>
        <View style={styles.spacer}>
          <Button mode="contained-tonal" onPress={() => showModal()}>
            {label} - {selectedDate}
          </Button>
        </View>
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
      </>
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
