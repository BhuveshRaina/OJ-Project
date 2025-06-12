const mongoose = require('mongoose');

const DefaultCodeSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  language: { type: String, required: true },
  code: { type: String, required: true }
});

const DefaultCode = mongoose.model('DefaultCode', DefaultCodeSchema);
module.exports = DefaultCode;