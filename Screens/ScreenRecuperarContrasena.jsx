import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLongLeftIcon } from "react-native-heroicons/solid";
import { useFonts } from "expo-font";

const ScreenRecuperarContrasena = ({ navigation }) => {
  const [loaded] = useFonts({
    PlusJakartaSans: require("../assets/fonts/PlusJakartaSans.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <View>
        <Text style={styles.titulo}>Restablecer contraseña</Text>
        <TouchableOpacity
          style={styles.containerArrow}
          onPress={() => {
            navigation.navigate("ScreenLogin");
          }}
        >
          <ArrowLongLeftIcon style={styles.ArrowLeftIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.TextCampu}>Ingresar correo</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="rinaplata@gmail.com"
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.containerButton}>
        <LinearGradient
          colors={["#F9881F", "#ED474A"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.TextButton}>Recuperar Contraseña</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenRecuperarContrasena;

const styles = StyleSheet.create({
  containerArrow: {
    position: "absolute",
    top: 20,
    paddingRight: 300,
  },
  containerText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: 15,
    height: 100,
    left: 43,
    top: 314,
  },
  TextCampu: {
    fontFamily: "PlusJakartaSans",
  },
  TextInput: {
    color: "#DADADA",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 15,
    width: 300,
  },
  titulo: {
    fontSize: 36,
    position: "absolute",
    width: 215,
    height: 40,
    left: 88,
    top: 160,
    color: "#FF6816",
    fontWeight: "bold",
    fontFamily: "PlusJakartaSans",
  },
  TextButton: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "PlusJakartaSans",
  },
  containerButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10 - 92,
    height: 70,
    top: 400,
  },
  button: {
    borderRadius: 34,
    marginTop: 20,
    padding: 10,
    width: 330,
    height: 50,
    left: 23,
  },
  ArrowLeftIcon: {
    color: "#F9881F",
    top: 50,
    paddingRight: 70,
  },
});
