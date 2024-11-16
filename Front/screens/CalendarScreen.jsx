import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  // État pour stocker les détails de l'événement sélectionné
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Liste des événements avec description
  const events = {
    '2020-01-04': { marked: true, dotColor: '#ff4081', color: '#ff4081', textColor: 'white', title: "Rendez-vous chez le médecin" },
    '2020-01-08': { marked: true, dotColor: '#ff4081', color: '#ff4081', textColor: 'white', title: "Médicament à prendre à 10h" },
    '2020-01-11': { marked: true, dotColor: '#4caf50', color: '#4caf50', textColor: 'white', title: "Examen médical prévu" },
    '2020-01-15': { marked: true, dotColor: '#ff4081', color: '#ff4081', textColor: 'white', title: "Ordonnance à renouveler" },
    '2020-01-18': { marked: true, dotColor: '#4caf50', color: '#4caf50', textColor: 'white', title: "Visite de contrôle" },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.patientName}>John</Text>
        <Text style={styles.subtitle}>Ordonnance médicale</Text>
        <Text style={styles.contact}>034 22 831 21</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Agenda prise de médicaments</Text>

      {/* Calendar */}
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
        markedDates={events}
        onDayPress={(day) => {
          const event = events[day.dateString];
          setSelectedEvent(event ? event.title : "Aucun événement pour cette date");
        }}
        monthFormat={'MMMM yyyy'}
        enableSwipeMonths={true}
      />

      {/* Event Details */}
      {selectedEvent && (
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>Événement :</Text>
          <Text style={styles.eventDescription}>{selectedEvent}</Text>
        </View>
      )}

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#ff4081' }]} />
          <Text style={styles.legendText}>Occupied</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#4caf50' }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    backgroundColor: '#00bcd4',
    padding: 20,
    alignItems: 'center',
  },
  patientName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  contact: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
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
  eventDetails: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});

export default CalendarScreen;
