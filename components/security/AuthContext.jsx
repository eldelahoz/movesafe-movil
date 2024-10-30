import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) {
        setToken(storedToken);
        setDecodedToken(jwtDecode(storedToken));
      }
    };
    loadToken();
  }, []);

  const login = async (token, navigate, setErrorMessage) => {
    await AsyncStorage.setItem("userToken", token);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (decodedToken.status) {
      navigate.navigate("ScreenPrincipal");
      setToken(token);
      setDecodedToken(decodedToken);
    } else {
      setErrorMessage({
        TextInputValue: "* Usuario deshabilitado o sin permisos.",
        ErrorStatus: true,
      });
    }
  };

  const logout = async (navigate) => {
    await AsyncStorage.removeItem("userToken");
    setToken(null);
    setDecodedToken(null);
    navigate.navigate("ScreenLogin");
  };

  return (
    <AuthContext.Provider value={{ token, decodedToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
