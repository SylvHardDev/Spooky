const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

// Route pour ajouter un médicament
router.post('/', medicationController.addMedication);

// Route pour obtenir tous les médicaments
router.get('/', medicationController.getAllMedications);

// Route pour obtenir un médicament par ID
router.get('/:id', medicationController.getMedicationById);

// Route pour mettre à jour un médicament
router.put('/:id', medicationController.updateMedication);

// Route pour supprimer un médicament
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;