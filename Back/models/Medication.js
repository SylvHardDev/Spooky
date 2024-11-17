const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dosage: {
    type: String,
    trim: true,
  },
  schedule: {
    morning: {
      type: Number,
      default: 0,
    },
    afternoon: {
      type: Number, 
      default: 0,
    },
    night: {
      type: Number, 
      default: 0,
    },
  },
  instructions: {
    type: String,
    trim: true,
  },
quantity: {
  type: Number
}
});

module.exports = mongoose.model('Medication', medicationSchema);