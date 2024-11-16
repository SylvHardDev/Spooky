import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MEDICATIONS = [
  { id: '1', name: 'Doliprane', dosage: '1000mg', type: 'Comprimé', time: '08:00 - 20:00' },
  { id: '2', name: 'Advil', dosage: '200mg', type: 'Comprimé', time: '08:00 - 20:00' },
  { id: '3', name: 'Smecta', dosage: '3g', type: 'Poudre', time: '08:00 - 20:00' },
  { id: '4', name: 'Spasfon', dosage: '80mg', type: 'Comprimé', time: '08:00 - 20:00' },
  { id: '5', name: 'Ventoline', dosage: '100μg', type: 'Inhalateur', time: '08:00 - 20:00' },
  { id: '6', name: 'Ventoline', dosage: '100μg', type: 'Inhalateur', time: '08:00 - 20:00' },
  { id: '7', name: 'Ventoline', dosage: '100μg', type: 'Inhalateur', time: '08:00 - 20:00' },
  { id: '8', name: 'Ventoline', dosage: '100μg', type: 'Inhalateur', time: '08:00 - 20:00' },
  { id: '9', name: 'Ventoline', dosage: '100μg', type: 'Inhalateur', time: '08:00 - 20:00' },
  { id: '10', name: 'Ventoline', dosage: '100μg', type: 'Inhalateur', time: '08:00 - 20:00' },
  { id: '11', name: 'Ventoline', dosage: '100μg', type: 'Inhalateur', time: '08:00 - 20:00' },
];

const MedicationList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedications = MEDICATIONS.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.medicationCard}>
      <View style={styles.medicationInfo}>
        <View style={styles.medicationAvatar}>
          <Ionicons name="medical" size={24} color="#fff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.medicationName}>{item.name}</Text>
          <Text style={styles.medicationDetails}>
            {item.dosage} - {item.type}
          </Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medications..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
      </View>

      <Text style={styles.title}>TOP MEDICATIONS</Text>

      <FlatList
        data={filteredMedications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#333',
  },
  listContainer: {
    padding: 20,
  },
  medicationCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicationAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default MedicationList;