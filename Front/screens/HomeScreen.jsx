import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = () => {
  const todaysMeds = [
    { name: "Doliprane 1000mg", time: "08:00", taken: false },
    { name: "Amoxicilline", time: "12:30", taken: true },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MedicAlert</Text>
        <FontAwesome5 name="bell" size={24} color="#1E88E5" />
      </View>

      {/* Texte sous MediScan */}
      <Text style={styles.description}>
      Scannez vos ordonnances : Importez rapidement vos ordonnances en PDF ou en photo.
      Rappels personnalisés : Recevez des notifications discrètes au moment de prendre vos médicaments.
      Agenda complet : Visualisez votre planning de traitement en un coup d'œil.
      </Text>

      <View style={styles.scheduleCard}>
        <View style={styles.scheduleHeader}>
          <FontAwesome5 name="calendar-alt" size={20} color="#1E88E5" />
          <Text style={styles.scheduleTitle}>Aujourd'hui</Text>
        </View>
        {todaysMeds.map((med, index) => (
          <View key={index} style={styles.medicationItem}>
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
              <Text style={styles.timeText}>{med.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Respect du{'\n'}traitement</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3/4</Text>
          <Text style={styles.statLabel}>Prises{'\n'}aujourd'hui</Text>
        </View>
      </View>

   
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#1E88E5" }]}>
          <FontAwesome5 name="camera" size={24} color="white" />
          <Text style={styles.actionButtonText}>Importer{'\n'}une ordonnance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#43A047" }]}>
          <FontAwesome5 name="plus-circle" size={24} color="white" />
          <Text style={styles.actionButtonText}>Scanner{'\n'}une ordonnance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F9FF", // Couleur de fond claire
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
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    color: "#1E88E5",
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
});

export default HomeScreen;
