import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

const CreateAlert = (props) => {
  const [loaded] = useFonts({
    PlusJakartaSans: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Agregar Alerta</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textTitle: {
    fontFamily: "PlusJakartaSans",
    fontSize: 24,
    color: "#000",
  },
});

export default CreateAlert;
