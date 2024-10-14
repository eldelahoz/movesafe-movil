import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenHome from "../app/ScreenHome";
import ScreenLogin from "../app/ScreenLogin";
import ScreenRegister from "../app/ScreenRegister";
import ScreenLoginPrincipal from "../app/ScreenLoginPrincipal";
import ScreenLoginMap from "../app/ScreenLoginMap";

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="ScreenHome" component={ScreenHome} />
      <Stack.Screen name="ScreenLogin" component={ScreenLogin} />
      <Stack.Screen name="ScreenRegister" component={ScreenRegister} />
      <Stack.Screen name="ScreenPrincipal" component={ScreenLoginPrincipal} />
      <Stack.Screen name="ScreenLoginMap" component={ScreenLoginMap} />
    </Stack.Navigator>
  );
};
