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
/*
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

app.get('/api/facture/next-number', async (req, res) => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');

    // Trouvez le dernier enregistrement avec un numéro dans le mois et l'année actuels
    const lastFacture = await Facture.findOne({
      N: { $exists: true },
      Datefacture: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${year}-${month + 1}-01`),
      },
    }).sort({ N: -1 });

    let nextNumber = 1;
    if (lastFacture) {
      nextNumber = lastFacture.N + 1;
    }

    const formattedNumber = `${nextNumber}-${month}/${year}`;

    // Enregistrez le prochain numéro dans la base de données
    const newFacture = new Facture({
      N: nextNumber,
      // ... d'autres champs de facture
      Datefacture: new Date(),
    });
    await newFacture.save();

    res.json({ nextNumber: formattedNumber });
  } catch (error) {
    console.error('Erreur lors de la récupération du prochain numéro de facture:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du prochain numéro de facture' });
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
// Route pour ajouter une nouvelle facture
app.post('/api/facture', async (req, res) => {
  try {
    // Générez la valeur "N" en fonction de la condition id-mois_actuel/annee_actuel
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const generatedN = `${year}-${month}`;

    // Ajoutez la valeur "N" aux données du formulaire
    const factureData = {
      ...req.body,
      N: generatedN,
    };

    const newFacture = new Facture(factureData);
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

// Route pour récupérer les factures archivées par année
app.get('/api/archives/:year', async (req, res) => {
  const year = req.params.year;
  try {
    const factures = await Facture.find({ N: { $regex: `^${year}` } });
    res.json(factures);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des archives' });
  }
});

// Route pour générer et télécharger un fichier CSV pour une année donnée
app.get('/api/download-csv/:year', async (req, res) => {
  const year = req.params.year;
  try {
    const factures = await Facture.find({ N: { $regex: `^${year}` } });
    if (factures.length === 0) {
      return res.status(404).json({ error: 'Aucune archive trouvée pour cette année' });
    }

    const csvData = "N,Prestataire_fournisseur,factureN,Datefacture,montant,bonCommande,transmisDPT,transmisDFC,observations,dateVirement,arrivee,imputation,fichier\n";
    factures.forEach((facture) => {
      csvData += `${facture.N},${facture.Prestataire_fournisseur},${facture.factureN},${facture.Datefacture},${facture.montant},${facture.bonCommande},${facture.transmisDPT},${facture.transmisDFC},${facture.observations},${facture.dateVirement},${facture.arrivee},${facture.imputation},${facture.fichier}\n`;
    });

    res.setHeader('Content-Disposition', `attachment; filename=factures_${year}.csv`);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csvData);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la génération du fichier CSV' });
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});*/
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
const { ObjectId } = require('mongodb');
//const pdfkit = require('pdfkit');
//const nodemailer = require('nodemailer');
//const fs = require('fs');

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
  actif:Boolean,
  role: String,
});

const User = mongoose.model('User', userSchema);

// Route pour l'inscription (signup)
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

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
      actif:true,
      role,
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
  userId:String,
   
});

const prestataireSchema = new mongoose.Schema({
  Nom_pres: String,
  Region_pres: String,
  userid:String,
  lieux:String,
  selectedUserId: String,

});

  
//comment
const Facture = mongoose.model('Facture', factureSchema);
const Prestataire = mongoose.model('Prestataire', prestataireSchema);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, 'uploads', filename));
});
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
app.put('/api/user/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification de lutilisateur ' });
  }
});
app.put('/api/user/delete/:id', async (req, res) => {
  try {
    req.body.actif = false;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification de lutilisateur ' });
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

app.get('/api/users', async (req, res) => {
	try {
	  const users = await User.find({});
	  res.json(users);
	} catch (error) {
	  res.status(500).json({ error: 'Erreur lors de la récupération des factures' });
	}
  });

  /*app.post('/send-email', (req, res) => {
    // Récupérez les données de la requête client (par exemple, le numéro de début et de fin)
    const { startNum, endNum } = req.body;
  
    // Générez le PDF dynamiquement
    const doc = new pdfkit();
    doc.text(`Factures de ${startNum} à ${endNum}`);
    // Ajoutez le contenu du PDF en fonction des données
  
    const pdfFileName = `temp-pdf-${Date.now()}.pdf`;
    const pdfFilePath = path.join(__dirname, 'temp', pdfFileName);
  
    doc.pipe(fs.createWriteStream(pdfFilePath));
    doc.end();
  
    
    const transporter = nodemailer.createTransport({
      service: 'Outlook', // Utilisez le service Outlook
      auth: {
        user: 'hadjerb11@outlook.com', // Remplacez par votre adresse e-mail Outlook
        pass: '', // Remplacez par votre mot de passe Outlook
      },
    });
    const mailOptions = {
      from: 'hadjerb11@outlook.com',
  to: 'hadjern224@gmail.com', // Adresse e-mail du destinataire
  subject: 'Sujet de l\'e-mail',
  text: 'Contenu du message',
      attachments: [
        {
          filename: 'facture.pdf',
          path: pdfFilePath, // Chemin du PDF temporaire
        },
      ],
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail' });
      } else {
        console.log('E-mail envoyé :', info.response);
        res.json({ message: 'E-mail envoyé avec succès' });
  
        // Supprimez le PDF temporaire après l'envoi
        fs.unlink(pdfFilePath, (unlinkError) => {
          if (unlinkError) {
            console.error('Erreur lors de la suppression du PDF temporaire :', unlinkError);
          } else {
            console.log('PDF temporaire supprimé');
          }
        });
      }
    });
  });*/
  


const port = 5000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

