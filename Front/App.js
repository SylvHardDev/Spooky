import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import MainNavigation from "./navigations/MainNavigation";
const App = () => {
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
