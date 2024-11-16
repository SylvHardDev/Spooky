import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";  

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleLogin = async () => {
    try {
    
        const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Si la connexion est réussie, naviguez vers l'écran souhaité
        navigation.navigate("HomeScreen");
        Alert.alert("Succès", "Connexion réussie!");
      } else {
        const errorData = await response.json();
        Alert.alert("Erreur", errorData.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      Alert.alert("Erreur", "Impossible de se connecter au serveur. Vérifiez votre connexion internet.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Se connecter</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Nom d'utilisateur</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
              placeholder="Doe005"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Mot de passe</Text>
            <TextInput
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Se connecter</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.formLink}>Mot de passe oublié?</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: "auto" }}
        >
          <Text style={styles.formFooter}>
            Vous n'avez pas encore de compte?{" "}
            <Text style={{ textDecorationLine: "underline" }}>S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },

  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});

export default LoginScreen;
