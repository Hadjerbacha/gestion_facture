const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connectez-vous à la base de données MongoDB (remplacez "mongodb://localhost:27017/sonatrach" par votre URL de connexion)
mongoose.connect('mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/my_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Lancez le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

// ... Le reste du code pour les routes et le serveur reste inchangé ...
/*
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const infoRoutes = require('./routes/info');
const apiRoutes = require('./api'); 

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connexion à MongoDB (assurez-vous que MongoDB est en cours d'exécution sur votre machine)
mongoose.connect('mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Utilisez la route /api
app.use('/api', apiRoutes);

// Routes pour les informations
app.use('/api/infos', infoRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
*/


/*const express = require('express');
const app = express();
const port = 3000;

const connectToMongoDB = require('./db');

app.get('/', (req, res) => {
  res.send('./App');
});

// Définir une route pour récupérer tous les éléments (fonction find_all)
app.get('/api/elements', (req, res) => {
  // TODO: Implémenter la fonction find_all pour récupérer tous les éléments depuis la base de données MongoDB
  // Remplacez cette réponse factice par les éléments réels provenant de la base de données
  const elements = [
    { id: 1, nom: 'Element 1' },
    { id: 2, nom: 'Element 2' },
    { id: 3, nom: 'Element 3' },
  ];
  res.json(elements);
});

// Démarrer le serveur et se connecter à MongoDB avant
connectToMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
  });
*/
  /*const express = require('express');
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
});*/
/*
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connexion à MongoDB (assurez-vous que MongoDB est en cours d'exécution sur votre machine)
mongoose.connect('mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const infoSchema = new mongoose.Schema({
  nom: String,
  age: Number,
});

const Info = mongoose.model('Info', infoSchema);

// Ajouter une nouvelle information à la base de données
app.post('/api/infos', async (req, res) => {
  try {
    const { nom, age } = req.body;
    const newInfo = new Info({ nom, age });
    await newInfo.save();
    res.status(201).send(newInfo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Récupérer toutes les informations depuis la base de données
app.get('/api/infos', async (req, res) => {
  try {
    const infos = await Info.find();
    res.status(200).send(infos);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
*/
/*
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const infoRoutes = require('./routes/info');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connexion à MongoDB (assurez-vous que MongoDB est en cours d'exécution sur votre machine)
mongoose.connect('mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes pour les informations
app.use('/api/infos', infoRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
*/

