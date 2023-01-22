import { Provider as PaperProvider } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";

import Navigation from "./src/navigation";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
