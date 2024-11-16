const mongoose = require('mongoose');

const ordonnanceSchema = new mongoose.Schema({
  medicament: { type: String, required: true },
  dosage: { type: String, required: true },
  matin: { type: Number, default: 0 },
  apresMidi: { type: Number, default: 0 },
  soir: { type: Number, default: 0 },
  instructions: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ordonnance', ordonnanceSchema);
