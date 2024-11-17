import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { AuthContext } from "../utils/authContext.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import MaterialCommunityIcons

const { height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.user);
        console.log("Utilisateur connecté :", data.user);
        navigation.navigate("HomeScreen");
        Alert.alert("Succès", "Connexion réussie!");
      } else {
        const errorData = await response.json();
        Alert.alert("Erreur", errorData.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      Alert.alert(
        "Erreur",
        "Impossible de se connecter au serveur. Vérifiez votre connexion internet."
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Partie supérieure avec demi-cercle bleu */}
      <View style={styles.topSemiCircle}>
        <Text style={styles.headerText}>Se connecter</Text>
      </View>

      {/* Formulaire */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#A0A0A0" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#A0A0A0" style={styles.inputIcon} />
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.footerText}>
            Vous n'avez pas de compte?{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("Register")}
            >
              S'inscrire
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topSemiCircle: {
    height: height * 0.3,
    backgroundColor: "#1E88E5",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  headerText: {
    fontSize: 28,
    color: "#FFFFFF",
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  button: {
    backgroundColor: "#1E88E5",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#A0A0A0",
  },
  linkText: {
    color: "#4B6EFF",
    fontWeight: "bold",
  },
});

export default LoginScreen;
