import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowLongLeftIcon } from "react-native-heroicons/solid";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

const ScreenRegister = ({ navigation }) => {
  const [loaded] = useFonts({
    PlusJakartaSans: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
  });

  const [isSelected, setSelection] = useState(false);

  const [newUser, setNewUser] = useState({
    nombre_completo: "",
    correo: "",
    numero_celular: "",
    password: "",
    confirmar_password: "",
  });

  const [getError, setErrorMessage] = useState({
    TextInputValue: "",
    ErrorStatus: false,
  });

  /*const expresiones = {
    coreeo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  }*/

  const submitRegister = () => {
    if (
      newUser.nombre_completo === "" ||
      newUser.correo === "" ||
      newUser.numero_celular === "" ||
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
      async function run() {
        await fetch("https://api-movesafe.vercel.app/api/user", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre_completo: newUser.nombre_completo,
            correo: newUser.correo,
            numero_celular: newUser.numero_celular,
            password: newUser.password,
            confirmar_password: newUser.confirmar_password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.register) {
              Alert.alert(
                "REGISTRO DE USUARIO",
                "Usuario registrado exitosamente",
                [
                  {
                    Text: "ACEPTAR",
                    cancelable: false,
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]
              );
            } else {
              setErrorMessage({
                ...getError,
                TextInputValue: "El usuario ya se encuentra registrado",
                ErrorStatus: true,
              });
            }
          });
      }
      run();
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ScreenHome");
        }}
      >
        <ArrowLongLeftIcon style={styles.ArrowLeftIcon} />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.title}>Registro</Text>
        <Text style={styles.titleCamps}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setNewUser({ ...newUser, nombre_completo: text })
          }
        ></TextInput>
        <Text style={styles.titleCamps}>Correo</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={(text) => setNewUser({ ...newUser, correo: text })}
        ></TextInput>
        <Text style={styles.titleCamps}>Numero celular</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(text) =>
            setNewUser({ ...newUser, numero_celular: text })
          }
        ></TextInput>
        <Text style={styles.titleCamps}>Contraseña</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setNewUser({ ...newUser, password: text })}
        ></TextInput>
        <Text style={styles.titleCamps}>Confirmar contraseña</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) =>
            setNewUser({ ...newUser, confirmar_password: md5(text) })
          }
        ></TextInput>

        {getError.ErrorStatus == true ? (
          <View>
            <Text style={styles.errorMessage}>{getError.TextInputValue}</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
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
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 10,
  },
  containerButton: {
    paddingTop: 30,
  },
  button: {
    width: 320,
    height: 50,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  TextButton: {
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans",
  },
  titleTerms: {
    color: "#03071E",
    fontFamily: "PlusJakartaSans",
    paddingTop: 20,
  },
  ArrowLeftIcon: {
    color: "#F9881F",
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    fontFamily: "PlusJakartaSans",
  },
});

export default ScreenRegister;
