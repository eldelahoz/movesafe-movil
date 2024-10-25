import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

const ScreenLoginPrincipal = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ScreenLogin");
        }}
      >
        <Image
          style={[styles.containerImage, styles.styleImage]}
          source={require("../assets/boton-de-encendido.png")}
        />
      </TouchableOpacity>

      <View>
        <Image
          style={[styles.containerPerfil, styles.perfi]}
          source={require("../assets/perfil.png")}
        />
        <Text style={styles.Text}>Name User</Text>
      </View>
      <View style={styles.containerOpction}>
        <View style={styles.containerMap}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ScreenLoginMap");
            }}
          >
            <Image
              style={styles.map}
              source={require("../assets/localizacion.png")}
            />
          </TouchableOpacity>
          <Text style={styles.TextMap}>Ver el mapa</Text>
        </View>

        <View style={styles.containerRep}>
          <Image
            style={styles.map}
            source={require("../assets/formulario-de-llenado.png")}
          />
          <Text style={styles.TextMap}>Reportes</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ScreenLoginPrincipal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  containerImage: {
    alignSelf: "flex-end",
    marginTop: 50,
  },
  styleImage: {
    width: 30,
    height: 31,
  },
  containerPerfil: {
    alignSelf: "center",
    borderRadius: 44,
    marginTop: 20,
  },
  perfi: {
    width: 150,
    height: 180,
    resizeMode: "contain",
  },
  Text: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "custom-font",
    fontSize: 17,
    marginTop: 15,
  },
  containerOpction: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 80,
  },
  TextMap: {
    fontWeight: "bold",
    fontFamily: "custom-font",
    fontSize: 17,
  },
  containerMap: {
    flexDirection: "column",
    paddingRight: 50,
  },
  containerRep: { flexDirection: "column" },
  map: {
    width: 90,
    height: 95,
  },
});
