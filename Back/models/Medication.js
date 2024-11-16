const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dosage: {
    type: String,
    required: true,
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
    evening: {
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Medication', medicationSchema);