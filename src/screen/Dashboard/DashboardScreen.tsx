import { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { getCategoryList } from "../../store/actions/categoryActions";

const DashboardScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);
  return (
    <View>
      <Text>DashboardScreen</Text>
    </View>
  );
};

export default DashboardScreen;
