import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet, Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import MainNavigation from "./navigations/MainNavigation";

// Configuration des notifications en premier plan
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Fonction pour demander les permissions de notification (nécessaire sur iOS)
async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permissions requises",
      "Vous devez accorder les permissions pour recevoir des notifications."
    );
  }
}

// Fonction pour planifier une notification quotidienne
async function scheduleDailyNotification() {
  const trigger = new Date();
  trigger.setHours(10); // 10 heures
  trigger.setMinutes(54); // 33 minutes
  trigger.setSeconds(0);

  // Si l'heure actuelle est passée, planifiez pour le lendemain
  if (trigger <= new Date()) {
    trigger.setDate(trigger.getDate() + 1);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Rappel Médicament 📅",
      body: "Pensez à vérifier si vous avez des médicaments à prendre aujourd'hui.",
      sound: true,
    },
    trigger: {
      hour: 10,
      minute: 54,
      repeats: true, // Répétition quotidienne
    },
  });
}

const App = () => {
  useEffect(() => {
    // Demander les permissions lors du montage du composant
    if (Platform.OS === "ios") {
      requestNotificationPermissions();
    }

    // Planifier la notification quotidienne
    scheduleDailyNotification();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MainNavigation />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
