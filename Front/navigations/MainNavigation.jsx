import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MedicationDetailScreen  from "../screens/MedicationDetailScreen"
import ImageAnalyzer from "../screens/ImageAnalyser"

const MainNavigation = () => {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator >
      
    <Stack.Screen  options={{ headerShown: false }} name="ImageAnalyzer" component={ImageAnalyzer} />
      <Stack.Screen  options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
      <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="MedicationDetailScreen" component={MedicationDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default MainNavigation