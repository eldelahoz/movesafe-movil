import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./components/StackNavigation";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./components/security/AuthContext";

const fetchFonts = () => {
  return Font.loadAsync({
    "custom-font": require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
