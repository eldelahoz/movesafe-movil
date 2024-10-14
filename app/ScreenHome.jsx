import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

const ScreenHome = ({ navigation }) => {
  const [loaded] = useFonts({
    PlusJakartaSans: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenidos a MoveSafe</Text>
      <StatusBar style="auto" />

      <Image
        style={[styles.containerImage, styles.imgStyle]}
        source={require("../assets/bienvenida.png")}
      />

      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => {
          navigation.navigate("ScreenLogin");
        }}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={["#F9881F", "#ED474A"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.Text}>Inicio sesíon</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => {
          navigation.navigate("ScreenRegister");
        }}
      >
        <LinearGradient
          colors={["#F9881F", "#ED474A"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.Text}>Crear cuenta</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  containerButton: {
    bottom: 5,
  },
  containerImage: {
    paddingTop: 50,
  },
  imgStyle: {
    width: 300,
    height: 300,
    marginTop: 30,
    resizeMode: "contain",
  },
  titulo: {
    fontSize: 30,
    color: "#FF6816",
    fontWeight: "bold",
    fontFamily: "PlusJakartaSans",
  },
  Text: {
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans",
  },

  button: {
    width: 320,
    height: 40,
    marginTop: 30,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});
