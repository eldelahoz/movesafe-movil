import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { postUser } from "../helpers/user";

const ScreenRegister = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    role_id: 2,
    password: "",
  });

  const [getError, setErrorMessage] = useState({
    TextInputValue: "",
    ErrorStatus: false,
  });

  const expresiones = {
    coreeo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const submitRegister = async () => {
    if (
      newUser.first_name === "" ||
      newUser.last_name === "" ||
      newUser.email === "" ||
      newUser.phone === "" ||
      newUser.password === "" ||
      newUser.confirmar_password === ""
    ) {
      setErrorMessage({
        ...getError,
        TextInputValue: "Los campos no pueden estar vacíos",
        ErrorStatus: true,
      });
    } else if (newUser.password !== newUser.confirmar_password) {
      setErrorMessage({
        ...getError,
        TextInputValue: "Las contraseñas deben ser iguales",
        ErrorStatus: true,
      });
    } else {
      try {
        const { confirmar_password, ...userToSend } = newUser;
        const response = await postUser(userToSend);
        if (response.status === 201) {
          Alert.alert("Registro exitoso", "Usuario registrado con éxito", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("ScreenLogin");
              },
            },
          ]);
        } else {
          Alert.alert("Error", "Ha ocurrido un error al registrar el usuario", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("ScreenRegister");
              },
            },
          ]);
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          Alert.alert("Error", "Error de análisis JSON: " + error.message, [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("ScreenRegister");
              },
            },
          ]);
        } else {
          Alert.alert("Error", "Ha ocurrido un error: " + error.message, [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("ScreenRegister");
              },
            },
          ]);
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.titleCamps}>Nombre</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setNewUser({ ...newUser, first_name: text })
              }
            ></TextInput>
            <Text style={styles.titleCamps}>Apellido</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setNewUser({ ...newUser, last_name: text })
              }
            ></TextInput>
            <Text style={styles.titleCamps}>Correo</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={(text) => setNewUser({ ...newUser, email: text })}
            ></TextInput>
            <Text style={styles.titleCamps}>Numero celular</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(text) => setNewUser({ ...newUser, phone: text })}
            ></TextInput>
            <Text style={styles.titleCamps}>Contraseña</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(text) =>
                setNewUser({ ...newUser, password: text })
              }
            ></TextInput>
            <Text style={styles.titleCamps}>Confirmar contraseña</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(text) =>
                setNewUser({ ...newUser, confirmar_password: text })
              }
            ></TextInput>

            {getError.ErrorStatus == true ? (
              <View>
                <Text style={styles.errorMessage}>
                  {getError.TextInputValue}
                </Text>
              </View>
            ) : null}

            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingTop: 24 }}>
                <BouncyCheckbox
                  size={20}
                  fillColor="#FF6816"
                  iconStyle={{ borderRadius: 0 }}
                  innerIconStyle={{ borderRadius: 2, borderColor: "black" }}
                  onPress={() => {
                    setSelection(!isSelected);
                  }}
                />
              </View>

              <Text style={styles.titleTerms}>
                Acepto las{" "}
                <Text
                  style={{ color: "#FF6816" }}
                  onPress={() => {
                    navigation.navigate("ScreenTermino");
                  }}
                >
                  Condiciones del servicio y la Politica de privacidad.
                </Text>
              </Text>
            </View>
            {}
            <TouchableOpacity
              style={styles.containerButton}
              onPress={submitRegister}
              disabled={!isSelected}
            >
              <LinearGradient
                colors={["#F9881F", "#ED474A"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.TextButton}>Registrar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    color: "#FF6816",
    fontFamily: "custom-font",
    fontSize: 44,
    textAlign: "center",
    paddingBottom: 25,
  },
  titleCamps: {
    color: "#03071E",
    fontFamily: "custom-font",
    paddingLeft: 10,
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 10,
  },
  containerButton: {
    paddingTop: 30,
    alignItems: "center",
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  TextButton: {
    color: "#FFFFFF",
    fontFamily: "custom-font",
  },
  titleTerms: {
    color: "#03071E",
    fontFamily: "custom-font",
    paddingTop: 20,
    marginRight: 30,
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    fontFamily: "custom-font",
  },
});

export default ScreenRegister;
