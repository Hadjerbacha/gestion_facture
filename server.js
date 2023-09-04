
const path = require('path');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db'); 
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension); // Nom du fichier téléchargé
  },
});
const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectDB();
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Route pour l'inscription (signup)
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hash du mot de passe avant de le stocker dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Génération du token JWT pour l'authentification
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.status(201).json({ data: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Route pour l'authentification (login)
app.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.json({ data: token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const factureSchema = new mongoose.Schema({
  N:Number,
  Prestataire_fournisseur: String,
  factureN: String,
  Datefacture: String,
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

const prestataireSchema = new mongoose.Schema({
  Nom_pres: String,
  Region_pres: String,
});

const Facture = mongoose.model('Facture', factureSchema);
const Prestataire = mongoose.model('Prestataire', prestataireSchema);

// Routes pour récupérer toutes les factures
app.get('/api/facture', async (req, res) => {
  try {
    const factures = await Facture.find({});
    res.json(factures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des factures' });
  }
});

// Route pour consulter tous les prestataires
app.get('/api/prestataires', async (req, res) => {
  try {
    const prestataires = await Prestataire.find({});
    res.json(prestataires);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des prestataires' });
  }
});
// Route pour ajouter une nouvelle facture
app.post('/api/facture', async (req, res) => {
  try {
    const newFacture = new Facture(req.body);
    await newFacture.save();
    res.status(201).json(newFacture);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de facture' });
  }
});

// Route pour ajouter un nouveau prestataire
app.post('/api/prestataire', async (req, res) => {
  try {
    const newPrestataire = new Prestataire(req.body);
    await newPrestataire.save();
    res.status(201).json(newPrestataire);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de prestataire' });
  }
});
/////////////////////
app.post('/upload', upload.single('file'), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`; // L'URL de l'image
  res.json({ imageUrl });
});
// Route pour modifier une facture
app.put('/api/facture/:id', async (req, res) => {
  try {
    const updatedFacture = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFacture);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification de la facture' });
  }
});

// Route pour modifier un prestataire
app.put('/api/prestataire/:id', async (req, res) => {
  try {
    const updatedPrestataire = await Prestataire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPrestataire);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification du prestataire' });
  }
});

// Route pour supprimer une facture
app.delete('/api/facture/:id', async (req, res) => {
  try {
    await Facture.findByIdAndDelete(req.params.id);
    res.json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la facture' });
  }
});

// Route pour supprimer un prestataire
app.delete('/api/prestataire/:id', async (req, res) => {
  try {
    await Prestataire.findByIdAndDelete(req.params.id);
    res.json({ message: 'Prestataire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du prestataire' });
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

