import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Marker, Circle } from "react-native-maps";

const AlertaHurtoCarro = (props) => {
  return (
    <>
      <Marker draggable coordinate={props.destination}>
        <Image
          style={styles.imgAlert}
          source={require("../assets/icons/Icon_carro_hurto.png")}
        />
      </Marker>
      <Circle
        center={{
          latitude: props.destination.latitude,
          longitude: props.destination.longitude,
        }}
        radius={280}
        strokeColor="yellow"
        fillColor="rgba(255,255,0,0.2)"
      />
    </>
  );
};

const styles = StyleSheet.create({
  imgAlert: {
    width: Dimensions.get("window").width / 6,
    height: Dimensions.get("window").width / 6,
  },
});

export default AlertaHurtoCarro;
