import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MedicationDetailScreen from "../screens/MedicationDetailScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CalendarScreen from '../screens/CalendarScreen'

import { AuthProvider } from "../utils/authContext";
import Scan from "../screens/Scan";

const MainNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      <Stack.Screen
          options={{ headerShown: false }}
          name="CalendarScreen"
          component={CalendarScreen}
        />

        
        <Stack.Screen
          options={{ headerShown: false }}
          name="MedicationDetailScreen"
          component={MedicationDetailScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Scan"
          component={Scan}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default MainNavigation;