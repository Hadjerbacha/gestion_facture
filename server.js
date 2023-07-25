const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000; // Le port sur lequel votre serveur écoutera les requêtes.

// Connexion à MongoDB
mongoose.connect('mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion réussie à MongoDB');
}).catch((error) => {
  console.error('Erreur lors de la connexion à MongoDB:', error);
});

// Définition du schéma Mongoose et du modèle
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Autres propriétés...
});

const User = mongoose.model('User', userSchema);

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Route pour ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
