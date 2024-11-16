import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, SafeAreaView, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MEDICATIONS = [
  { id: '1', name: 'Doliprane', dosage: '1000mg', type: 'Comprimé', time: '08:00 - 20:00' },
  { id: '2', name: 'Advil', dosage: '200mg', type: 'Comprimé', time: '08:00 - 20:00' },
  { id: '3', name: 'Smecta', dosage: '3g', type: 'Poudre', time: '08:00 - 20:00' },
  { id: '4', name: 'Spasfon', dosage: '80mg', type: 'Comprimé', time: '08:00 - 20:00' },
  { id: '5', name: 'Ventoline', dosage: '100μg', type: 'Inhalateur', time: '08:00 - 20:00' },
];

const MedicationListScreen = () => {
  const [medications, setMedications] = useState(MEDICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null); // Medication being edited
  const [modalVisible, setModalVisible] = useState(false);

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (medication) => {
    setSelectedMedication(medication);
    setModalVisible(true);
  };

  const handleSave = () => {
    setMedications((prevMedications) =>
      prevMedications.map((med) =>
        med.id === selectedMedication.id ? selectedMedication : med
      )
    );
    setModalVisible(false);
    setSelectedMedication(null);
  };

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
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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

      {/* Modal for Editing */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Medication</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={selectedMedication?.name}
              onChangeText={(text) =>
                setSelectedMedication((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Dosage"
              value={selectedMedication?.dosage}
              onChangeText={(text) =>
                setSelectedMedication((prev) => ({ ...prev, dosage: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Type"
              value={selectedMedication?.type}
              onChangeText={(text) =>
                setSelectedMedication((prev) => ({ ...prev, type: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Time"
              value={selectedMedication?.time}
              onChangeText={(text) =>
                setSelectedMedication((prev) => ({ ...prev, time: text }))
              }
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  editButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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

export default MedicationListScreen;