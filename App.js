import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./components/StackNavigation";
import { View, Text } from "react-native-web";

export default function App() {
  return (
    // <View>
    //   <Text>Hola</Text>
    // </View>
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
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
