import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenHome from "../app/ScreenHome";

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
    </Stack.Navigator>
  );
};
