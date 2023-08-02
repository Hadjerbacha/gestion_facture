const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connectez-vous à la base de données MongoDB (remplacez "mongodb://localhost:27017/sonatrach" par votre URL de connexion)
connectDB();

// Créez un schéma pour la collection "facture"
const factureSchema = new mongoose.Schema({
  prestataire: String,
  facteurNo: String,
  dateFacteur: String,
  montant: Number,
  bonCommande: String,
  transmisDPT: String,
  transmisDFC: String,
  observations: String,
  dateVirement: String,
  arrivee: String,
  imputation: String,
  fichier: String,
});

// Créez un modèle pour la collection "facture" en utilisant le schéma
const Facture = mongoose.model('Facture', factureSchema);

// Routes pour récupérer toutes les factures
app.get('/api/factures', async (req, res) => {
  try {
    const factures = await Facture.find({});
    res.json(factures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des factures' });
  }
});

// Route pour ajouter une nouvelle facture
app.post('/api/factures', async (req, res) => {
  try {
    const newFacture = new Facture(req.body);
    await newFacture.save();
    res.status(201).json(newFacture);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la facture' });
  }
});

// Route pour modifier une facture existante
app.put('/api/factures/:id', async (req, res) => {
  try {
    const facture = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(facture);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la facture' });
  }
});

// Route pour supprimer une facture existante
app.delete('/api/factures/:id', async (req, res) => {
  try {
    const facture = await Facture.findByIdAndDelete(req.params.id);
    res.json(facture);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la facture' });
  }
});

// Lancez le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
