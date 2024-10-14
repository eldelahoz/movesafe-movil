import React, { useState } from "react";
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

const ScreenLogin = ({ navigation }) => {
  const [loaded] = useFonts({
    PlusJakartaSans: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
  });

  const [getUser, setUser] = useState({
    correo: "",
    password: "",
  });

  const [getError, setErrorMessage] = useState({
    TextInputValue: "",
    ErrorStatus: false,
  });

  function validateData(email, password) {
    if (!email || !password) {
      setErrorMessage({
        ...getError,
        TextInputValue: "* Correo o contraseña estan vacios.",
        ErrorStatus: true,
      });
    } else {
      // async function run() {
      //   await fetch("https://api-movesafe.vercel.app/api/checkUser", {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ correo: email, password: password }),
      //   })
      //     .then((res) => res.json())
      //     .then((res) => {
      //       if (res.succes) {
      //         navigation.navigate("ScreenPrincipal");
      //       } else {
      //         setErrorMessage({
      //           ...getError,
      //           TextInputValue: "* Correo o contraseña no son correctos.",
      //           ErrorStatus: true,
      //         });
      //       }
      //     });
      // }
      // run();
      navigation.navigate("ScreenPrincipal");
    }
  }

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.containerLogin}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ScreenHome");
        }}
      >
        <ArrowLongLeftIcon style={styles.ArrowLeftIcon} />
      </TouchableOpacity>
      <View>
        <Text style={styles.titulo}>Inicio sesión</Text>
      </View>

      <View>
        <Text style={styles.titleCamps}>Ingresar correo</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.TextInput}
          placeholder="nombre@correo.com"
          onChangeText={(text) => setUser({ ...getUser, correo: text })}
        ></TextInput>
      </View>

      <View>
        <Text style={styles.titleCamps}>Contraseña</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.TextInput}
          placeholder="***********"
          onChangeText={(text) => setUser({ ...getUser, password: text })}
        ></TextInput>
      </View>

      {getError.ErrorStatus == true ? (
        <View>
          <Text style={styles.errorMessage}>{getError.TextInputValue}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => validateData(getUser.correo, getUser.password)}
      >
        <LinearGradient
          colors={["#F9881F", "#ED474A"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.TextButton}>Inicio sesion</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenLogin;

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
  },
  titulo: {
    color: "#FF6816",
    fontFamily: "PlusJakartaSans",
    fontSize: 44,
    textAlign: "center",
    paddingBottom: 25,
  },
  titleCamps: {
    color: "#03071E",
    fontFamily: "PlusJakartaSans",
    paddingLeft: 10,
    paddingTop: 20,
  },
  TextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 15,
  },
  TextContrasena: {
    fontWeight: "bold",
    fontSize: 12,
    textDecorationLine: "underline",
    fontFamily: "PlusJakartaSans",
    paddingTop: 10,
  },
  TextButton: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "PlusJakartaSans",
  },
  containerButton: {
    alignItems: "center",
  },
  button: {
    borderRadius: 34,
    marginTop: 20,
    padding: 10,
    width: 330,
    height: 50,
  },
  ArrowLeftIcon: {
    color: "#F9881F",
    position: "relative",
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    fontFamily: "PlusJakartaSans",
  },
});
