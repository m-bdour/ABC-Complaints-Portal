const mongoose = require('mongoose');

// complaint Schema
const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  type: {
    type: String,
    require: true
  },
  detailes: {
    type: String,
    require: true
  },
  status: {
    type: String,
  },
  notes: {
    type: String,
  },

}, {
  timestamps: true,
});


module.exports = Complaint = mongoose.model('complaint', complaintSchema);