import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Voir détails médicament"
        onPress={() => navigation.navigate('MedicationDetail', { 
          // Vous pouvez passer des paramètres ici
          medicationId: '123',
        })}
      />
    </View>
  );
};

export default HomeScreen;