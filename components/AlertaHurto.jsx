import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Marker, Circle } from "react-native-maps";

const AlertaHurto = (props) => {
  return (
    <>
      <Marker draggable coordinate={props.destination}>
        <Image
          style={styles.imgAlert}
          source={require("../assets/icons/Icono_Robo.png")}
        />
      </Marker>
      <Circle
        center={{
          latitude: props.destination.latitude,
          longitude: props.destination.longitude,
        }}
        radius={150}
        strokeColor="yellow"
        fillColor="rgba(255,255,0,0.2)"
      />
    </>
  );
};

const styles = StyleSheet.create({
  imgAlert: {
    width: Dimensions.get("window").width / 10,
    height: Dimensions.get("window").width / 10,
  },
});

export default AlertaHurto;
