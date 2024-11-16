import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    if (avatar) {
      const filename = avatar.split("/").pop(); // Extraire le nom du fichier
      const fileType = filename.split(".").pop(); // Extraire l'extension
      formData.append("avatar", {
        uri: avatar,
        name: filename,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await fetch("http://10.166.4.102:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Succès", "Inscription réussie");
        // Redirection ou navigation après le succès
      } else {
        Alert.alert("Erreur", data.message || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      Alert.alert("Erreur", "Impossible de se connecter au serveur");
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
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
            <TouchableOpacity style={styles.avatarPicker} onPress={pickImage}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarPlaceholder}>
                  Sélectionner une image
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleRegister}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>S'enregistrer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={{ marginTop: "auto" }}>
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
    },
    avatarPlaceholder: {
      fontSize: 14,
      color: "#6b7280",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      borderRadius: 50,
    },
    formAction: {
      marginTop: 4,
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

