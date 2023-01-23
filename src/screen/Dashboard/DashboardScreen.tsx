import { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { getCategoryList } from "../../store/actions/categoryActions";
import { getAllForms } from "../../store/actions/formActions";

const DashboardScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getAllForms());
  }, []);
  return (
    <View>
      <Text>DashboardScreen</Text>
    </View>
  );
};

export default DashboardScreen;
