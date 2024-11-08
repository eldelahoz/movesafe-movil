import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenHome from "../app/ScreenHome";
import ScreenLogin from "../app/ScreenLogin";
import ScreenRegister from "../app/ScreenRegister";
import ScreenTermino from "../app/ScreenTermino";
import ScreenLoginPrincipal from "../app/ScreenLoginPrincipal";
import ScreenLoginMap from "../app/ScreenLoginMap";
import { AuthContext } from "./security/AuthContext";
import { LoadingIndicator } from "./ui/LoadingIndicator";
import Constants from "expo-constants";

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    checkAuthStatus();
  }, [token]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
      {token == null ? (
        <>
          <Stack.Screen name="ScreenHome" component={ScreenHome} />
          <Stack.Screen name="ScreenLogin" component={ScreenLogin} />
          <Stack.Screen name="ScreenRegister" component={ScreenRegister} />
          <Stack.Screen name="ScreenTermino" component={ScreenTermino} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="ScreenPrincipal"
            component={ScreenLoginPrincipal}
          />
          <Stack.Screen name="ScreenLoginMap" component={ScreenLoginMap} />
        </>
      )}
    </Stack.Navigator>
  );
};
