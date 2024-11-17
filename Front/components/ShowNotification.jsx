import React from "react";
import { View, Button, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";

const ShowNotification = () => {
  // Fonction pour afficher une notification locale
  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification 📢",
        body: "Ceci est une notification test !",
        sound: true,
      },
      trigger: null, 
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Afficher une notification" onPress={showNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default ShowNotification;
