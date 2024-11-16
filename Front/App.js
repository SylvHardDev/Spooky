import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MedicationList from './screen/MedicationList'; 

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MedicationList />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
