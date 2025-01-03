// // screens/MedicationDetailScreen.jsx
// import React, { useState } from 'react';
// import {
//   Button,
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { sendMessageToChatGPT } from '../services/chatgptService';

// const MedicationDetailScreen = ({ navigation }) => {

//   const [messages, setMessages] = useState([])
//   const [input, setInput] = useState("")
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);

//   // Données statiques de démonstration
//   const medicationData = {
//     name: "Paracétamol",
//     dosage: "1000mg",
//     form: "Comprimé",
//     frequency: "3x par jour",
//     duration: "5 jours",
//     nextDose: "14:00",
//     stock: 12,
//     instructions: [
//       "Prendre avec un grand verre d'eau",
//       "À prendre pendant les repas"
//     ],
//     sideEffects: [
//       "Nausées",
//       "Maux de tête",
//       "Somnolence"
//     ]
//   };

//   // Fonction pour envoyer un message au chat
//   // const sendMessage = () => {
//   //   if (message.trim()) {
//   //     setChatHistory([...chatHistory, { text: message, user: true }]);
//   //     setMessage('');
//   //     // Simuler une réponse de l'IA
//   //     setTimeout(() => {
//   //       setChatHistory(prev => [...prev, {
//   //         text: "Je peux vous aider avec vos questions sur le Paracétamol.",
//   //         user: false
//   //       }]);
//   //     }, 1000);
//   //   }
//   // };

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };

//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const botReply = await sendMessageToChatGPT([...messages, userMessage]);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: botReply },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Error: Could not get a response." },
//       ]);
//     }

//     setInput("");
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="chevron-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Détails du médicament</Text>
//       </View>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}
//       >
//         <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//           {/* Card principale */}
//           <View style={styles.mainCard}>
//             <Text style={styles.medicationName}>{medicationData.name}</Text>
//             <Text style={styles.medicationSubtitle}>
//               {medicationData.dosage} - {medicationData.form}
//             </Text>

//             {/* Tags */}
//             <View style={styles.tagContainer}>
//               <View style={styles.tag}>
//                 <Ionicons name="time-outline" size={16} color="#6200ee" />
//                 <Text style={styles.tagText}>{medicationData.frequency}</Text>
//               </View>
//               <View style={styles.tag}>
//                 <Ionicons name="calendar-outline" size={16} color="#6200ee" />
//                 <Text style={styles.tagText}>{medicationData.duration}</Text>
//               </View>
//             </View>
//           </View>

//           {/* Prochaine prise */}
//           <View style={styles.sectionCard}>
//             <Text style={styles.sectionTitle}>Prochaine prise</Text>
//             <View style={styles.nextDoseBox}>
//               <Ionicons name="alarm-outline" size={24} color="#6200ee" />
//               <View style={styles.nextDoseInfo}>
//                 <Text style={styles.nextDoseTime}>{medicationData.nextDose}</Text>
//                 <Text style={styles.nextDoseDate}>Aujourd'hui</Text>
//               </View>
//             </View>
//           </View>

//           {/* Instructions */}
//           <View style={styles.sectionCard}>
//             <Text style={styles.sectionTitle}>Instructions</Text>
//             {medicationData.instructions.map((instruction, index) => (
//               <View key={index} style={styles.instructionItem}>
//                 <Ionicons name="information-circle-outline" size={24} color="#6200ee" />
//                 <Text style={styles.instructionText}>{instruction}</Text>
//               </View>
//             ))}
//           </View>

//           {/* Section Chat */}
//           <View style={[styles.sectionCard, styles.lastSection]}>
//             <Text style={styles.sectionTitle}>Besoins d'aide ?</Text>

//             {/* Historique du chat */}
//             <View style={styles.chatHistory}>
//               {chatHistory.map((chat, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.chatBubble,
//                     chat.user ? styles.userBubble : styles.aiBubble
//                   ]}
//                 >
//                   <Text
//                     style={chat.user ? styles.userText : styles.aiText}
//                   >
//                     {chat.text}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             {/* Input de chat */}
//             {/* <View style={styles.chatInputContainer}>
//               <TextInput
//                 style={styles.chatInput}
//                 value={message}
//                 onChangeText={setMessage}
//                 placeholder="Posez votre question..."
//                 multiline
//               />
//               <TouchableOpacity
//                 style={styles.sendButton}
//                 onPress={sendMessage}
//               >
//                 <Ionicons name="send" size={24} color="#6200ee" />
//               </TouchableOpacity>
//             </View> */}

//             <View style={styles.container}>
//               <ScrollView style={styles.chatContainer}>
//                 {messages.map((msg, index) => (
//                   <Text
//                     key={index}
//                     style={msg.role === "user" ? styles.userMessage : styles.botMessage}
//                   >
//                     {msg.content}
//                   </Text>
//                 ))}
//               </ScrollView>
//               <TextInput
//                 style={styles.input}
//                 value={input}
//                 onChangeText={setInput}
//                 placeholder="Type your message..."
//               />
//               <Button title="Send" onPress={handleSendMessage} />
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   chatContainer: { flex: 1, marginBottom: 10 },
//   userMessage: {
//     alignSelf: "flex-end",
//     backgroundColor: "#d1e7dd",
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   botMessage: {
//     alignSelf: "flex-start",
//     backgroundColor: "#f8d7da",
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },


//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   mainCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   medicationImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 16,
//   },
//   medicationName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   medicationSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 16,
//   },
//   tagContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   tag: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0e6ff',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   tagText: {
//     color: '#6200ee',
//     marginLeft: 4,
//     fontSize: 14,
//   },
//   sectionCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 16,
//   },
//   nextDoseBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0e6ff',
//     padding: 16,
//     borderRadius: 12,
//   },
//   nextDoseInfo: {
//     marginLeft: 12,
//   },
//   nextDoseTime: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#6200ee',
//   },
//   nextDoseDate: {
//     fontSize: 14,
//     color: '#666',
//   },
//   instructionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   instructionText: {
//     marginLeft: 12,
//     fontSize: 16,
//     color: '#333',
//     flex: 1,
//   },
//   sideEffectsContainer: {
//     backgroundColor: '#fff5f5',
//     padding: 16,
//     borderRadius: 12,
//   },
//   sideEffectItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   sideEffectText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#ff6b6b',
//   },
//   stockInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   stockText: {
//     marginLeft: 12,
//     fontSize: 16,
//     color: '#333',
//   },
//   reorderButton: {
//     backgroundColor: '#f0e6ff',
//     padding: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   reorderButtonText: {
//     color: '#6200ee',
//     fontWeight: '600',
//   },
//   lastSection: {
//     marginBottom: 32,
//   },
//   chatHistory: {
//     marginBottom: 16,
//   },
//   chatBubble: {
//     padding: 12,
//     borderRadius: 16,
//     marginBottom: 8,
//     maxWidth: '80%',
//   },
//   userBubble: {
//     backgroundColor: '#6200ee',
//     alignSelf: 'flex-end',
//   },
//   aiBubble: {
//     backgroundColor: '#f0e6ff',
//     alignSelf: 'flex-start',
//   },
//   userText: {
//     color: '#fff',
//   },
//   aiText: {
//     color: '#333',
//   },
//   chatInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   chatInput: {
//     flex: 1,
//     fontSize: 16,
//     minHeight: 40,
//     maxHeight: 100,
//   },
//   sendButton: {
//     marginLeft: 8,
//     padding: 8,
//   },
// });

// export default MedicationDetailScreen;
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MedicationDetailScreen = ({ navigation, route }) => {
  // Récupérer les paramètres du médicament
  const { medication } = route.params || {};

  // Vérification pour s'assurer que les données sont disponibles
  if (!medication) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Aucun médicament sélectionné.</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du médicament</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Détails principaux */}
        <View style={styles.mainCard}>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.medicationSubtitle}>
            {medication.dosage || "Dosage non spécifié"}
          </Text>

          {/* Fréquences */}
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Ionicons name="time-outline" size={16} color="#6200ee" />
              <Text style={styles.tagText}>
                Matin : {medication.schedule?.morning || 0}
              </Text>
            </View>
            <View style={styles.tag}>
              <Ionicons name="time-outline" size={16} color="#6200ee" />
              <Text style={styles.tagText}>
                Après-midi : {medication.schedule?.afternoon || 0}
              </Text>
            </View>
            
            <View style={styles.tag}>
              <Ionicons name="time-outline" size={16} color="#6200ee" />
              <Text style={styles.tagText}>
                Soir : {medication.schedule?.night || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Instructions */}
        {medication.instructions && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructionText}>{medication.instructions}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: "#fff",
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  medicationName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  medicationSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0e6ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  tagText: {
    color: "#6200ee",
    marginLeft: 4,
    fontSize: 14,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 16,
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: "#ff4d4d",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default MedicationDetailScreen;
