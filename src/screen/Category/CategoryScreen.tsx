import { StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addNewForm } from "../../store/actions/formActions";
import FormCard from "../../components/FormCard";
import { FlatList } from "react-native-gesture-handler";
import { nanoid } from "@reduxjs/toolkit";

const CategoryScreen = ({ route }) => {
  const formId = nanoid();
  const dispatch = useDispatch();
  const { itemId: categoryId } = route.params;
  const { items } = useSelector((state) => state.itemList);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">{route.name}</Text>
        <Button
          mode="contained"
          onPress={() => dispatch(addNewForm({ categoryId, formId }))}
        >
          Add new item
        </Button>
      </View>
      <Divider />
      <FlatList
        data={items.filter((item) => item.categoryId === categoryId)}
        renderItem={({ item }) => (
          <FormCard formTitle={item.formTitle} fields={item.fields} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default CategoryScreen;
