const Medication = require('../models/Medication');

// Ajouter un médicament
// exports.addMedication = async (req, res) => {
//   try {
//     const { name, dosage, schedule, instructions} = req.body;

//     const newMedication = new Medication({
//       name,
//       dosage,
//       schedule,
//       instructions
//     });

//     await newMedication.save();
//     res.status(201).json({ message: "Médicament ajouté avec succès", medication: newMedication });
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de l'ajout du médicament", error: error.message });
//   }
// };
// Ajouter un ou plusieurs médicaments
exports.addMedication = async (req, res) => {
  try {
    const medications = req.body; // Attendez un tableau d'objets

    if (!Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ message: "Aucun médicament fourni" });
    }

    // Enregistrez tous les médicaments en une seule opération
    const savedMedications = await Medication.insertMany(medications);

    res.status(201).json({
      message: "Médicaments ajoutés avec succès",
      medications: savedMedications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout des médicaments",
      error: error.message,
    });
  }
};


// Obtenir tous les médicaments
exports.getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.status(200).json({ medications });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des médicaments", error: error.message });
  }
};

// Obtenir un médicament par ID
exports.getMedicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const medication = await Medication.findById(id);

    if (!medication) {
      return res.status(404).json({ message: "Médicament non trouvé" });
    }

    res.status(200).json({ medication });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du médicament", error: error.message });
  }
};

// Mettre à jour un médicament
exports.updateMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedMedication = await Medication.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedMedication) {
      return res.status(404).json({ message: "Médicament non trouvé" });
    }

    res.status(200).json({ message: "Médicament mis à jour avec succès", medication: updatedMedication });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du médicament", error: error.message });
  }
};

// Supprimer un médicament
exports.deleteMedication = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMedication = await Medication.findByIdAndDelete(id);

    if (!deletedMedication) {
      return res.status(404).json({ message: "Médicament non trouvé" });
    }

    res.status(200).json({ message: "Médicament supprimé avec succès", medication: deletedMedication });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du médicament", error: error.message });
  }
};