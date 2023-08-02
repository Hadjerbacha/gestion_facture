// models/info.js

const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  age: { type: Number, required: true },
});

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
