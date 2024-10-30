import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenHome from "../app/ScreenHome";
import ScreenLogin from "../app/ScreenLogin";
import ScreenRegister from "../app/ScreenRegister";
import ScreenLoginPrincipal from "../app/ScreenLoginPrincipal";
import ScreenLoginMap from "../app/ScreenLoginMap";
import { AuthContext } from "./security/AuthContext";
import { LoadingIndicator } from "./ui/LoadingIndicator";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: "#fff",
      },
    }}
  >
    <AuthStack.Screen name="ScreenHome" component={ScreenHome} />
    <AuthStack.Screen name="ScreenLogin" component={ScreenLogin} />
    <AuthStack.Screen name="ScreenRegister" component={ScreenRegister} />
  </AuthStack.Navigator>
);

const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: "#fff",
      },
    }}
  >
    <MainStack.Screen name="ScreenPrincipal" component={ScreenLoginPrincipal} />
    <MainStack.Screen name="ScreenLoginMap" component={ScreenLoginMap} />
  </MainStack.Navigator>
);

export const StackNavigation = () => {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Simula un tiempo de carga para verificar el token
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    checkAuthStatus();
  }, [token]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return token ? <MainStackScreen /> : <AuthStackScreen />;
};
