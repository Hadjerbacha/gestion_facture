/*const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const nodemailer = require('nodemailer');
const port = 5000;
const connectDB = require('./db'); 
const connect = require('./db2');


app.use(cors());
app.use(express.json());

connectDB();
// Créez un schéma pour la collection "facture"
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

// Créez un modèle pour la collection "facture" en utilisant le schéma
const Facture = mongoose.model('Facture', factureSchema);

// Routes pour récupérer toutes les factures
app.get('/api/facture', async (req, res) => {
  try {
    const factures = await Facture.find({});
    res.json(factures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des factures' });
  }
});

// Route pour ajouter une nouvelle facture
app.post('/api/facture', async (req, res) => {
  try {
    const newFacture = new Facture(req.body);
    await newFacture.save();
    res.status(201).json(newFacture);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la facture' });
  }
});

// Route pour modifier une facture existante
app.put('/api/facture/:id', async (req, res) => {
  try {
    const facture = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(facture);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la facture' });
  }
});

// Route pour supprimer une facture existante
app.delete('/api/facture/:id', async (req, res) => {
  try {
    const facture = await Facture.findByIdAndDelete(req.params.id);
    res.json(facture);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la facture' });
  }
});

// Route pour envoyer un e-mail avec une pièce jointe PDF
app.post('/api/send-email', async (req, res) => {
  const { filename, filePath, recipientEmail } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: 'hadjerb11@outlook.com', // Remplacez par votre adresse e-mail
      pass: '112003hadjer' // Remplacez par votre mot de passe
    }
  });

  const mailOptions = {
    from: 'hadjerb11@outlook.com', // Remplacez par votre adresse e-mail
    to: recipientEmail,
    subject: 'Tableau PDF',
    text: 'Veuillez trouver ci-joint le fichier PDF contenant votre tableau.',
    attachments: [
      {
        filename: filename,
        path: filePath
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

const prestataireSchema = new mongoose.Schema({
  Nom_pres: String,
  Region_pres: String,
});

connect();
const Prestataire = mongoose.model('Prestataire', prestataireSchema);

// Ajoutez cette route avant la route POST pour ajouter un prestataire
app.get('/api/prestataire', async (req, res) => {
  try {
    const prestataires = await Prestataire.find({});
    res.json(prestataires);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des prestataires' });
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


// Lancez le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});*/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db'); 
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectDB();

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.json({ data: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

