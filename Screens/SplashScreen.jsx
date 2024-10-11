import React, { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.Car}>
      <Text style={styles.textCar}>MoveSafe</Text>
      {Platform.OS !== "web" ? (
        <LottieView
          source={require("../assets/Car.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            console.log("animation finished");
            navigation.navigate("ScreenHome");
          }}
        />
      ) : (
        <View
          onLayout={() => {
            navigation.navigate("ScreenHome");
          }}
        >
          {" "}
        </View>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  Car: {
    flex: 1,
    alighItems: "center",
    margin: 0,
  },
  textCar: {
    textAlign: "center",
    top: 150,
    color: "#F9881F",
    fontSize: 40,
    fontWeight: "bold",
  },
});
