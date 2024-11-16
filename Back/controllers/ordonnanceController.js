const Ordonnance = require('../models/ordonnanceModel');

// Créer une ordonnance
exports.createOrdonnance = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.create(req.body);
    res.status(201).json({ message: 'Ordonnance créée avec succès', ordonnance });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error });
  }
};

// Récupérer toutes les ordonnances
exports.getAllOrdonnances = async (req, res) => {
  try {
    const ordonnances = await Ordonnance.find();
    res.status(200).json(ordonnances);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};

// Récupérer une ordonnance par ID
exports.getOrdonnanceById = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findById(req.params.id);
    if (!ordonnance) {
      return res.status(404).json({ message: 'Ordonnance non trouvée' });
    }
    res.status(200).json(ordonnance);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};

// Mettre à jour une ordonnance
exports.updateOrdonnance = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ordonnance) {
      return res.status(404).json({ message: 'Ordonnance non trouvée' });
    }
    res.status(200).json({ message: 'Ordonnance mise à jour avec succès', ordonnance });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// Supprimer une ordonnance
exports.deleteOrdonnance = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findByIdAndDelete(req.params.id);
    if (!ordonnance) {
      return res.status(404).json({ message: 'Ordonnance non trouvée' });
    }
    res.status(200).json({ message: 'Ordonnance supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
};
