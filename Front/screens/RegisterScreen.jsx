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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

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
    <View style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>S'enregistrer</Text>
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

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirmer mot de passe</Text>
            <TextInput
              autoCorrect={false}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Avatar</Text>
            <TouchableOpacity 
              style={styles.avatarPicker} 
              onPress={pickImage}
              activeOpacity={0.7}
            >
              {avatar ? (
                <Image 
                  source={{ uri: avatar }} 
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.avatarPlaceholder}>
                  Sélectionner une image
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity 
              onPress={handleRegister}
              activeOpacity={0.7}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>S'enregistrer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={{ marginTop: "auto" }}
          activeOpacity={0.7}
        >
          <Text style={styles.formFooter}>
            Vous avez déjà un compte?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Se connecter</Text>
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
  avatarPicker: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#C9D3DB",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarPlaceholder: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  formAction: {
    marginTop: 20,
    marginBottom: 16,
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
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
});

export default RegisterScreen;