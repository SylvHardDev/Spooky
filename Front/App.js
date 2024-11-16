import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedicationDetailScreen from './screens/MedicationDetailScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Accueil' }}
        />
        <Stack.Screen 
          name="MedicationDetail" 
          component={MedicationDetailScreen}
          options={{ 
            title: 'Détails du médicament',
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}