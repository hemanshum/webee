import { useEffect, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FAB, Text } from "react-native-paper";

import {
  createNewCategory,
  getCategoryList,
} from "../../store/actions/categoryActions";

import CategoryCard from "../../components/CategoryCard";

const ManageCategoriesScreen = () => {
  const flatlistRef = useRef();
  const dispatch = useDispatch();
  const { list: categoryList, message } = useSelector(
    (state) => state.calegoryList
  );

  const scrollToEnd = () => {
    if (categoryList.length > 2) {
      flatlistRef.current.scrollToEnd();
    }
    return;
  };
  console.log({ categoryList });
  return (
    <>
      <View style={styles.listContainer}>
        {message !== "" ? (
          <Text variant="bodySmall">{message}</Text>
        ) : (
          <FlatList
            data={categoryList}
            renderItem={({ item }) => (
              <CategoryCard name={item.name} id={item.id} />
            )}
            keyExtractor={(item) => item.id}
            ref={flatlistRef}
          />
        )}
      </View>
      <FAB
        icon="plus"
        label="Add new Category"
        style={styles.fab}
        onPress={() => {
          dispatch(createNewCategory());
          scrollToEnd();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 5,
    bottom: 24,
  },
});

export default ManageCategoriesScreen;
