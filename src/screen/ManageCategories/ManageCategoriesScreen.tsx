import { useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FAB, Text } from "react-native-paper";

import { createNewCategory } from "../../store/actions/categoryActions";

import CategoryCard from "../../components/CategoryCard";

const ManageCategoriesScreen = () => {
  const flatlistRef = useRef();
  const dispatch = useDispatch();
  const { list: categoryList, message } = useSelector(
    (state) => state.calegoryList
  );

  const scrollToEnd = () => {
    setTimeout(() => {
      if (categoryList.length > 1) {
        flatlistRef.current.scrollToEnd();
      }
      return;
    }, 2000);
  };

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
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  fab: {
    margin: 16,
    bottom: 5,
    alignSelf: "stretch",
  },
});

export default ManageCategoriesScreen;
