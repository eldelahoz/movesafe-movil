import React, { useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  Pressable,
} from "react-native";
import { PlusCircleIcon } from "react-native-heroicons/solid";
import { useFonts } from "expo-font";
import CreateAlert from "../components/CreateAlert";
import AlertaHurto from "../components/AlertaHurto";
import AlertaHurtoCarro from "../components/AlertaHurtoCarro";

const ScreenLoginMap = () => {
  const [alertHurto, setAlertHurto] = useState([
    {
      latitude: 6.2797592,
      latitudeDelta: 0.01,
      longitude: -75.5822967,
      longitudeDelta: 0.01,
    },
  ]);

  const [alertHurtoCarro, setAlertHurtoCarro] = useState([
    {
      latitude: 6.270644976144272,
      latitudeDelta: 0.01,
      longitude: -75.57395422831178,
      longitudeDelta: 0.01,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [origin, setOrigin] = React.useState({
    latitude: 6.2797592,
    longitude: -75.5822967,
  });

  const [destination, setDestination] = React.useState({
    latitude: 6.2787674,
    longitude: -75.5695213,
  });

  const [region, setRegion] = useState({
    latitude: 6.2797592,
    longitude: -75.5822967,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  function setAlertRobo() {
    try {
      var obj = region;
      setDestination({ latitude: obj.latitude, longitude: obj.longitude });
      if (!alertHurto.includes(region)) {
        setAlertHurto([...alertHurto, region]);
      }
      setModalVisible(!modalVisible);
    } catch (e) {
      console.log(e);
    }
  }

  function setAlertRoboCarro() {
    try {
      var obj = region;
      setDestination({ latitude: obj.latitude, longitude: obj.longitude });
      if (!alertHurtoCarro.includes(region)) {
        setAlertHurtoCarro([...alertHurtoCarro, region]);
      }
      setModalVisible(!modalVisible);
    } catch (e) {
      console.log(e);
    }
  }

  const [loaded] = useFonts({
    PlusJakartaSans: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Crear Alerta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CreateAlert />
            <View style={styles.containerImgButtons}>
              <TouchableOpacity onPress={setAlertRobo}>
                <Image
                  style={styles.imgButtons}
                  source={require("../assets/icons/Icono_Robo.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={setAlertRoboCarro}>
                <Image
                  style={styles.imgButtons}
                  source={require("../assets/icons/Icon_carro_hurto.png")}
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
        onLongPress={(e) => {
          setDestination(e.nativeEvent.coordinate);
          setModalVisible(true);
        }}
        onRegionChangeComplete={(region) => {
          setRegion(region);
        }}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {alertHurto.map((element) => (
          <AlertaHurto
            destination={{
              latitude: element.latitude,
              longitude: element.longitude,
            }}
          ></AlertaHurto>
        ))}

        {alertHurtoCarro.map((element) => (
          <AlertaHurtoCarro
            destination={{
              latitude: element.latitude,
              longitude: element.longitude,
            }}
          ></AlertaHurtoCarro>
        ))}
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
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 30,
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
    width: Dimensions.get("window").width - 15,
    height: Dimensions.get("window").height - 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
    fontFamily: "PlusJakartaSans",
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
});
