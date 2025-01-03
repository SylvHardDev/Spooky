import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuthContext } from "../utils/authContext";
import { Ionicons } from "@expo/vector-icons"; // Pour l'icône Back

const Scan = ({ navigation }) => {
  const { updateMedications } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const apiKey = process.env.EXPO_PUBLIC_API_KEY_GEMINI;

  const genAI = new GoogleGenerativeAI(apiKey);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Désolé, nous avons besoin des permissions pour accéder à la galerie !"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].base64);
    }
  };

  const analyzeImage = async (base64Image) => {
    try {
      setLoading(true);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const prompt = [
        {
          text:
            "Analyse le texte de cette ordonnance et extrais les informations suivantes pour chaque médicament :\n\n" +
            "Nom du médicament : Le nom exact tel qu'il apparaît dans le texte.\n" +
            "Dosage : Indique la concentration ou dose prescrite (exemple : '200 mg').\n" +
            "Horaire : Décompose la fréquence d'administration par période de la journée (exemple : 'matin : 2, après-midi : 1, nuit : 0').\n" +
            "Quantité : La quantité totale prescrite.\n" +
            "Instructions : Mentionne des consignes supplémentaires s'il y en a (exemple : 'À prendre après un repas').\n" +
            "Format attendu : Organise les informations pour chaque médicament dans un objet JSON :\n" +
            "{\n" +
            '  "name": "Nom du médicament",\n' +
            '  "dosage": "Dosage",\n' +
            '  "schedule": {\n' +
            '    "morning": 0,\n' +
            '    "afternoon": 0,\n' +
            '    "night": 0\n' +
            "  },\n" +
            '  "quantity": 0,\n' +
            '  "instructions": "Instructions supplémentaires"\n' +
            "} tout est nullable sauf le nom du médicament et le dosage.",
        },
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg",
          },
        },
      ];

      const result = await model.generateContent(prompt);

      if (result && result.response) {
        const responseText = await result.response.text();
        console.log("Réponse brute :", responseText);

        const cleanedResponse = responseText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        console.log("Réponse nettoyée :", cleanedResponse);

        try {
          const parsedResponse = JSON.parse(cleanedResponse);
          setAnalysis(parsedResponse);
          postDataToAPI(parsedResponse);
        } catch (error) {
          console.error("Erreur de parsing JSON :", error);
          setAnalysis("Réponse brute nettoyée mais erreur de parsing : " + cleanedResponse);
        }
      } else {
        throw new Error("Pas de réponse de l'API");
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse de l'image :", error);
      setAnalysis("Erreur lors de l'analyse de l'image : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const postDataToAPI = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/medication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedMedication = await response.json();
        updateMedications(savedMedication);
        Alert.alert("Succès", "Le médicament a été ajouté avec succès !");
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Erreur",
          `Erreur lors de l'envoi des données : ${errorData.message || "Erreur inconnue"}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données à l'API:", error);
      Alert.alert("Erreur", "Impossible d'envoyer les données à l'API.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton de retour */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("HomeScreen")} // Redirection vers HomeScreen
      >
        <Ionicons name="chevron-back" size={24} color="#007AFF" />
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Sélectionner une image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        analysis && (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.analysisContainer}>
              <Text style={styles.analysisTitle}>Analyse :</Text>
              <Text style={styles.analysisText}>
                {typeof analysis === "string"
                  ? analysis
                  : JSON.stringify(analysis, null, 2)}
              </Text>
            </View>
          </ScrollView>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F9FF",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "90%",
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: "contain",
  },
  loader: {
    marginTop: 20,
  },
  scrollContainer: {
    width: "100%",
    marginTop: 20,
  },
  analysisContainer: {
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 3,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  analysisText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
});

export default Scan;
