import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import SplashScreen from "./Screens/SplashScreen";
import ScreenHome from "./Screens/ScreenHome";
import ScreenLogin from "./Screens/ScreenLogin";
import ScreenRegister from "./Screens/ScreenRegister";
import ScreenHomePage from "./Screens/ScreenHomePage";
import ScreenRecuperarContrasena from "./Screens/ScreenRecuperarContrasena";
import ScreenPrincipal from "./Screens/ScreenPrincipal";
import ScreenTermino from "./Screens/ScreenTermino";

//va contener las multiples pantalla
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          marginTop: Constants.statusBarHeight,
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="ScreenHome" component={ScreenHome} />
      <Stack.Screen name="ScreenLogin" component={ScreenLogin} />
      <Stack.Screen name="ScreenRegister" component={ScreenRegister} />
      <Stack.Screen name="ScreenHomePage" component={ScreenHomePage} />
      <Stack.Screen
        name="ScreenRecuperarContrasena"
        component={ScreenRecuperarContrasena}
      />
      <Stack.Screen name="ScreenTermino" component={ScreenTermino} />
      <Stack.Screen name="ScreenPrincipal" component={ScreenPrincipal} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
