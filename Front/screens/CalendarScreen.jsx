import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

  // Obtenir la date actuelle au format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Liste des événements avec description
  const events = {
    '2020-01-04': { marked: true, dotColor: '#ff4081', title: "Rendez-vous chez le médecin" },
    '2020-01-08': { marked: true, dotColor: '#ff4081', title: "Médicament à prendre à 10h" },
  };

  // Générer les dates marquées avec l'état de sélection
  const generateMarkedDates = () => {
    const markedDates = { ...events };

    // Ajouter la date d'aujourd'hui avec un style spécifique
    markedDates[today] = {
      ...markedDates[today], // Conserver les événements existants
      selected: true,
      selectedColor: '#00bcd4',
      selectedTextColor: 'white',
      title: "Aujourd'hui",
    };

    // Ajouter la date sélectionnée avec un style spécifique
    if (selectedDate) {
      markedDates[selectedDate] = {
        ...markedDates[selectedDate], // Conserver les événements existants
        selected: true,
        selectedColor: '#ff5722', // Couleur différente pour la sélection
        selectedTextColor: 'white',
      };
    }

    return markedDates;
  };

  // Fonction pour récupérer les données des médicaments
  const fetchMedications = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/medication`);
      const data = await response.json();
      setMedications(data.medications);
    } catch (error) {
      console.error('Erreur lors de la récupération des médicaments :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  // Header de la liste
  const ListHeaderComponent = () => (
    <>
      <Text style={styles.title}>Agenda prise de médicaments</Text>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          todayTextColor: '#00bcd4',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#00bcd4',
          arrowColor: '#00bcd4',
        }}
        markedDates={generateMarkedDates()}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        monthFormat={'MMMM yyyy'}
        enableSwipeMonths={true}
      />
      <Text style={styles.sectionTitle}>Médicaments</Text>
    </>
  );

  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <View style={styles.medicationCard}>
          <Text style={styles.medicationName}>{item.name}</Text>
          <Text style={styles.medicationDosage}>
            Dosage : {item.dosage || 'Non spécifié'}
          </Text>
          <Text style={styles.medicationSchedule}>
            Morning: {item.schedule.morning} | Afternoon: {item.schedule.afternoon} | Evening: {item.schedule.evening} | Night: {item.schedule.night}
          </Text>
          {item.instructions && (
            <Text style={styles.medicationInstructions}>
              Instructions: {item.instructions}
            </Text>
          )}
        </View>
      )}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" color="#00bcd4" style={styles.loader} />
        ) : (
          <Text style={styles.emptyText}>Aucun médicament trouvé.</Text>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  loader: {
    marginTop: 20,
  },
  medicationCard: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  medicationSchedule: {
    fontSize: 14,
    color: '#777',
  },
  medicationInstructions: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginVertical: 20,
  },
});

export default CalendarScreen;
