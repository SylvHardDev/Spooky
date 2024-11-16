import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  // Remplacez API_KEY par votre clé API Gemini
  const genAI = new GoogleGenerativeAI('AIzaSyB3DQmA901qpVRBViq5596TDSYkfvrEMgg');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Désolé, nous avons besoin des permissions pour accéder à la galerie !');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

      // Format corrigé pour la requête Gemini
      const prompt = [
        {
          text: "Décris cette image en détail en français"
        },
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg"
          }
        }
      ];

      
      const result = await model.generateContent(prompt);
      
      if (result && result.response) {
        const response = await result.response;
        setAnalysis(response.text());
      } else {
        throw new Error('Pas de réponse de l\'API');
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse de l\'image:', error);
      setAnalysis('Erreur lors de l\'analyse de l\'image: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Sélectionner une image</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        analysis && (
          <View style={styles.analysisContainer}>
            <Text style={styles.analysisTitle}>Analyse :</Text>
            <Text style={styles.analysisText}>{analysis}</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  analysisContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  analysisText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ImageAnalyzer;