import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getUser } from "../helpers/user";
import { AuthContext } from "../components/security/AuthContext";
import { LoadingIndicator } from "../components/ui/LoadingIndicator";

const ScreenLogin = ({ navigation }) => {
  const [getUsuario, setUsuario] = useState({
    correo: "",
    password: "",
  });

  const [getError, setErrorMessage] = useState({
    TextInputValue: "",
    ErrorStatus: false,
  });

  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  function validateData(email, password) {
    if (!email || !password) {
      setErrorMessage({
        ...getError,
        TextInputValue: "* Correo o contraseña estan vacios.",
        ErrorStatus: true,
      });
    } else {
      async function run() {
        setLoading(true);
        const response = await getUser(getUsuario.correo, getUsuario.password);
        setLoading(false);
        if (response.status === 200) {
          const token = response.data.access_token;
          await login(token, setErrorMessage);
        } else {
          setErrorMessage({
            ...getError,
            TextInputValue: "* Correo o contraseña no son correctos.",
            ErrorStatus: true,
          });
        }
      }
      run();
    }
  }

  return (
    <View style={styles.containerLogin}>
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
          onChangeText={(text) => {
            setUsuario({ ...getUsuario, correo: text });
            setErrorMessage({
              ...getError,
              ErrorStatus: false,
            });
          }}
        ></TextInput>
      </View>

      <View>
        <Text style={styles.titleCamps}>Contraseña</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.TextInput}
          placeholder="***********"
          onChangeText={(text) => {
            setUsuario({ ...getUsuario, password: text });
            setErrorMessage({
              ...getError,
              ErrorStatus: false,
            });
          }}
        ></TextInput>
      </View>

      {getError.ErrorStatus == true ? (
        <View>
          <Text style={styles.errorMessage}>{getError.TextInputValue}</Text>
        </View>
      ) : null}

      {loading ? (
        <LoadingIndicator />
      ) : (
        <TouchableOpacity
          style={styles.containerButton}
          onPress={() => validateData(getUsuario.correo, getUsuario.password)}
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
      )}
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
  TextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 15,
  },
  TextContrasena: {
    fontWeight: "bold",
    fontSize: 12,
    textDecorationLine: "underline",
    fontFamily: "custom-font",
    paddingTop: 10,
  },
  TextButton: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "custom-font",
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
  errorMessage: {
    fontSize: 14,
    color: "red",
    fontFamily: "custom-font",
  },
});
