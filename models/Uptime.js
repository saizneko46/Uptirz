// backend/models/Uptime.js
const mongoose = require('mongoose');

const uptimeSchema = new mongoose.Schema({
  websiteUrl: { type: String, required: true },
  status: { type: String, required: true },
  lastChecked: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Uptime', uptimeSchema);
