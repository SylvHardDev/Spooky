import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../utils/authContext.js";

const HomeScreen = ({ navigation }) => {
  const [importedFile, setImportedFile] = useState(null);
  const [todaysMeds, setTodaysMeds] = useState([]); // Médicaments du jour
  const [loading, setLoading] = useState(false); // État de chargement
  const { user, logout } = useContext(AuthContext);
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

  // Génère l'URL complète de l'image de profil
  const profileImageUrl = user?.profile_image
    ? `${apiBaseUrl}/${user.profile_image.replace(/\\/g, "/")}`
    : null;

  useEffect(() => {
    fetchTodaysMeds();
  }, []);

  const fetchTodaysMeds = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://10.166.4.101:5001/api/medication");
      if (response.ok) {
        const data = await response.json();
        setTodaysMeds(data.medications); // Met à jour les médicaments
      } else {
        throw new Error("Erreur lors de la récupération des médicaments.");
      }
    } catch (error) {
      console.error("Erreur :", error.message);
      Alert.alert("Erreur", "Impossible de charger les médicaments.");
    } finally {
      setLoading(false);
    }
  };

  const handleMedicationPress = (med) => {
    console.log(med);
    navigation.navigate("MedicationDetailScreen", { medication: med });
  };

  const redirect = () => {
    navigation.navigate("Scan");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>
          Bienvenue, {user?.username || "Utilisateur"}
        </Text>

        {profileImageUrl ? (
          <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
        ) : (
          <Text style={styles.noImage}>Aucune image de profil disponible</Text>
        )}

        <Text style={styles.info}>Email: {user?.email || "Non disponible"}</Text>

        <Button
          title="Déconnexion"
          onPress={() => {
            logout();
            navigation.navigate("Login");
          }}
        />

        <View style={styles.header}>
          <Text style={styles.title}>MedicAlert</Text>
          <FontAwesome5 name="bell" size={24} color="#1E88E5" />
        </View>

        <Text style={styles.description}>
          Scannez vos ordonnances : Importez rapidement vos ordonnances en PDF
          ou en photo. Rappels personnalisés : Recevez des notifications
          discrètes au moment de prendre vos médicaments. Agenda complet :
          Visualisez votre planning de traitement en un coup d'œil.
        </Text>

        <View style={styles.scheduleCard}>
          <View style={styles.scheduleHeader}>
            <FontAwesome5 name="calendar-alt" size={20} color="#1E88E5" />
            <Text style={styles.scheduleTitle}>Aujourd'hui</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#1E88E5" />
          ) : todaysMeds.length > 0 ? (
            todaysMeds.map((med, index) => (
              <TouchableOpacity
                key={index}
                style={styles.medicationItem}
                onPress={() => handleMedicationPress(med)}
                activeOpacity={0.7}
              >
                <View style={styles.medicationInfo}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: med.taken ? "#43A047" : "#1E88E5" },
                    ]}
                  />
                  <Text style={styles.medicationName}>{med.name}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <FontAwesome5 name="clock" size={16} color="#666" />
                  <Text style={styles.timeText}>{med.schedule.morning > 0 ? "Matin" : "Soir"}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>
              Aucun médicament prévu pour aujourd'hui.
            </Text>
          )}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Respect du{"\n"}traitement</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3/4</Text>
            <Text style={styles.statLabel}>Prises{"\n"}aujourd'hui</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#1E88E5" }]}
            onPress={redirect}
          >
            <FontAwesome5 name="camera" size={24} color="white" />
            <Text style={styles.actionButtonText}>
              Importer{"\n"}une ordonnance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#43A047" }]}
          >
            <FontAwesome5 name="plus-circle" size={24} color="white" />
            <Text style={styles.actionButtonText}>
              Scanner{"\n"}une ordonnance
            </Text>
          </TouchableOpacity>
        </View>

        {importedFile && (
          <View style={styles.importedFileContainer}>
            <Text style={styles.importedFileText}>
              Fichier importé : {importedFile.name}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    width: "48%",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
  scheduleCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  medicationInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "500",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    marginLeft: 5,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  importedFileContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
  },
  importedFileText: {
    fontSize: 14,
    color: "#1E88E5",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  noImage: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default HomeScreen;


