import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../screen/Dashboard/DashboardScreen";
import ManageCategoriesScreen from "../screen/ManageCategories/ManageCategoriesScreen";
import CategoryScreen from "../screen/Category/CategoryScreen";

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const { list: categoryList } = useSelector((state) => state.calegoryList);

  const categoryNavigator = () => {
    return (
      <>
        {categoryList.map((item) => {
          return (
            <Drawer.Screen
              key={item.id}
              name={(item.name ||= "Untitled Nav")}
              component={CategoryScreen}
              initialParams={{ itemId: item.id }}
            />
          );
        })}
      </>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        {categoryList && categoryNavigator()}
        <Drawer.Screen
          name="Manage"
          component={ManageCategoriesScreen}
          options={{
            title: "Manage Categories",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
