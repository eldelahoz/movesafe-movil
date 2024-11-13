import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Polyline } from "react-native-maps";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import {
  ArrowLongLeftIcon,
  PlusCircleIcon,
  MapIcon,
} from "react-native-heroicons/solid";

import CreateAlert from "../components/CreateAlert";
import AlertaHurto from "../components/AlertaHurto";
import {
  getAllPuntosHurtos,
  createPuntoHurto,
  getDireccionCoord,
  getRutaPosibleSegura,
} from "../helpers/mapa";
import { AuthContext } from "../components/security/AuthContext";

const ScreenLoginMap = () => {
  const { decodedToken, logout } = useContext(AuthContext);
  const emailUser = decodedToken?.sub || "email";
  const [alertHurto, setAlertHurto] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreBarrio, setNombreBarrio] = useState("");
  const [wrongNombre, setWrongNombre] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [direccionOrigen, setDireccionOrigen] = useState("");
  const [direccionDestino, setDireccionDestino] = useState("");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [origin, setOrigin] = React.useState({
    latitude: 6.2797592,
    longitude: -75.5822967,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapRef = useRef(null);

  const [destination, setDestination] = React.useState({
    latitude: 6.2787674,
    longitude: -75.5695213,
  });

  const [region, setRegion] = useState({});

  useEffect(() => {
    getAllPuntosHurtos().then((res) => {
      if (res.status === 200) {
        setAlertHurto(res.data);
      }
    });
  }, [region]);

  const setAlertRobo = async () => {
    if (nombreBarrio === "") {
      setWrongNombre(true);
      setErrorMessage("El nombre del barrio es requerido");
    } else {
      const data = {
        name_email: {
          name: nombreBarrio,
          user_email: emailUser,
        },
        circle_polygon: {
          latitud: destination.latitude,
          longitud: destination.longitude,
          radio: 0.2,
        },
      };
      const res = await createPuntoHurto(data);
      if (res.status === 200) {
        setModalVisible(!modalVisible);
        setNombreBarrio("");
        setAlertHurto([
          ...alertHurto,
          { latitud: destination.latitude, longitud: destination.longitude },
        ]);
      }
    }
  };

  const getDireccionCoordenadas = async () => {
    const respCoordenadasOrigen = await getDireccionCoord(direccionOrigen);
    const respCoordenadasDestino = await getDireccionCoord(direccionDestino);

    if (
      respCoordenadasOrigen.status === 200 &&
      respCoordenadasDestino.status === 200
    ) {
      const origenGeoJson = respCoordenadasOrigen.data.GeoSJson;
      const destinoGeoJson = respCoordenadasDestino.data.GeoSJson;

      if (
        origenGeoJson &&
        origenGeoJson.length > 0 &&
        destinoGeoJson &&
        destinoGeoJson.length > 0
      ) {
        const origenCoordinates = origenGeoJson[0].coordinates;
        const destinoCoordinates = destinoGeoJson[0].coordinates;

        const dataRuta = {
          lat_inicial: origenCoordinates[1],
          lon_inicial: origenCoordinates[0],
          lat_final: destinoCoordinates[1],
          lon_final: destinoCoordinates[0],
        };

        const respRuta = await getRutaPosibleSegura(dataRuta);
        if (respRuta.status === 200) {
          const rutaGeoJson = respRuta.data.geojson;

          const coordinates = rutaGeoJson.features[0].geometry.coordinates
            .filter((point) => point && point.length >= 2)
            .map((point) => ({
              latitude: point[1],
              longitude: point[0],
            }));
          setRouteCoordinates(coordinates);

          if (mapRef.current) {
            const region = {
              latitude: (origenCoordinates[1] + destinoCoordinates[1]) / 2,
              longitude: (origenCoordinates[0] + destinoCoordinates[0]) / 2,
              latitudeDelta:
                Math.abs(origenCoordinates[1] - destinoCoordinates[1]) * 1.5,
              longitudeDelta:
                Math.abs(origenCoordinates[0] - destinoCoordinates[0]) * 1.5,
            };
            mapRef.current.animateToRegion(region, 1000);
          }
        }
      }
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerRoute}>
        <TouchableOpacity
          style={styles.containerArrow}
          onPress={() => navigation.goBack()}
        >
          <ArrowLongLeftIcon size={30} style={styles.ArrowLeftIcon} />
        </TouchableOpacity>
        <TextInput
          autoCapitalize="none"
          keyboardType="text"
          style={styles.TextInput}
          placeholder="Ruta Inicio"
          onChangeText={(text) => setDireccionOrigen(text)}
          value={direccionOrigen}
        ></TextInput>
        <TextInput
          autoCapitalize="none"
          keyboardType="text"
          style={styles.TextInput}
          placeholder="Ruta Fin"
          onChangeText={(text) => setDireccionDestino(text)}
          value={direccionDestino}
        ></TextInput>
        <TouchableOpacity style={styles.containerArrow}>
          <MapIcon
            size={30}
            style={styles.ArrowLeftIcon}
            onPress={() => getDireccionCoordenadas()}
          />
        </TouchableOpacity>
      </View>
      {/* Crear Alerta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CreateAlert />
            {wrongNombre && (
              <Text style={{ color: "red", fontSize: 15 }}>{errorMessage}</Text>
            )}
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 15, marginTop: 20 }}>Barrio</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="text"
                style={styles.TextInput}
                placeholder="Barrio"
                onChangeText={(text) => {
                  setNombreBarrio(text);
                  setWrongNombre(false);
                }}
                value={nombreBarrio}
              ></TextInput>
            </View>
            <View style={styles.containerImgButtons}>
              <TouchableOpacity onPress={setAlertRobo}>
                <Image
                  style={styles.imgButtons}
                  source={require("../assets/icons/Icono_Robo.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerClose}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textModalClose}>CERRAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Maps */}
      <MapView
        ref={mapRef}
        onLongPress={(e) => {
          setDestination(e.nativeEvent.coordinate);
          setModalVisible(true);
        }}
        onRegionChangeComplete={(region) => {
          setRegion(region);
        }}
        style={styles.map}
        initialRegion={origin}
      >
        {alertHurto.map((element) => (
          <AlertaHurto
            key={element.id}
            destination={{
              latitude: element.latitud,
              longitude: element.longitud,
            }}
          />
        ))}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FF0000" // color de la línea
            strokeWidth={3} // grosor de la línea
          />
        )}
      </MapView>
      {/* Boton para ver crear alerta */}
      <View
        style={{
          position: "absolute",
          bottom: "2%",
          right: "5%",
          alignSelf: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <PlusCircleIcon style={styles.PlusCircleIcon} size="50" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScreenLoginMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  PlusCircleIcon: {
    color: "#F9881F",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height - 200,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    height: "15%",
    marginBottom: 15,
  },
  containerClose: {
    color: "#FFF",
    position: "absolute",
    bottom: "0%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217, 217, 217, 0.18)",
    width: Dimensions.get("window").width - 15,
    height: Dimensions.get("window").height / 5,
  },
  textModalClose: {
    fontFamily: "custom-font",
    fontSize: 24,
    color: "#000",
  },
  containerImgButtons: {
    alignSelf: "center",
    marginTop: 50,
  },
  imgButtons: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
  },
  imgAlert: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").width / 5,
  },
  containerArrow: {},
  ArrowLeftIcon: {
    color: "#F9881F",
  },
  containerRoute: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  TextInput: {
    borderColor: "#F9881F",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    flex: 1,
  },
});
