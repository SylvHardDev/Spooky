import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  Dimensions,
  ScrollView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
const { height } = Dimensions.get("window");


const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const handleRegister = async () => {
  
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    const formData = new FormData();
    formData.append("username", username.trim());
    formData.append("password", password);

    if (avatar) {
      try {
        const filename = avatar.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append("profile_image", {
          uri: Platform.OS === 'android' ? avatar : avatar.replace('file://', ''),
          name: filename || 'photo.jpg',
          type: type,
        });
      } catch (error) {
        console.error("Erreur lors de la préparation de l'image:", error);
      }
    }

    try {
      console.log("Envoi des données:", formData);
      

        const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log("Statut de la réponse:", response.status);

      if (response.ok) {
        try {
          const data = await response.json();
          Alert.alert("Succès", "Inscription réussie");
          navigation.navigate('Login')
       
        } catch (error) {
          console.error("Erreur parsing JSON:", error);
          Alert.alert("Succès", "Inscription réussie mais erreur de réponse");
        }
      } else {
        const errorText = await response.text();
        console.error("Réponse serveur:", errorText);
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      Alert.alert(
        "Erreur",
        "Impossible de se connecter au serveur. Vérifiez votre connexion."
      );
    }
  };


const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("Statut de la permission:", status);
  
      if (status !== 'granted') {
        Alert.alert(
          "Permission refusée",
          "Nous avons besoin de votre permission pour accéder à la galerie"
        );
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
  
      console.log("Résultat du picker:", result);
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log("URI de l'image sélectionnée:", result.assets[0].uri);
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert(
        "Erreur",
        "Un problème est survenu lors de la sélection de l'image"
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>

         {/* Zone bleue */}

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarPicker}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarPlaceholder}>+</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Titre */}
      <Text style={styles.title}>Inscription</Text>
        
        {/* Formulaire */}
      <View style={styles.form}>
        <View style={styles.input}>
          <FontAwesome name="user" size={20} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.inputControl}
            placeholder="Full Name"
            placeholderTextColor="#6b7280"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.input}>
          <FontAwesome name="lock" size={20} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.inputControl}
            placeholder="Enter a new password"
            placeholderTextColor="#6b7280"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.input}>
          <FontAwesome name="lock" size={20} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.inputControl}
            placeholder="Enter a new password"
            placeholderTextColor="#6b7280"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <Text style={styles.submitButtonText}>Valider</Text>
        </TouchableOpacity>
      </View>

         {/* Pied de page */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.footer}
      >
        <Text style={styles.footerText}>
          Vous avez déjà un compte ?{" "}
          <Text style={styles.footerLink}>Se connecter</Text>
        </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: height * 0.3,
    backgroundColor: "#1E88E5",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 100,
  },
  avatarPicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  avatarPlaceholder: {
    fontSize: 36,
    color: "#c4c4c4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E88E5",
    textAlign: "center",
    marginTop: 80,
  },
  form: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  inputControl: {
    flex: 1,
    fontSize: 16,
  },
  submitButton: {
    height: 50,
    backgroundColor: "#1E88E5",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
  },
  footerLink: {
    color: "#1E88E5",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;