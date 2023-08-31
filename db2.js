// db.js
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/my_db";

const connect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connecté à la base de données MongoDB');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données', error);
    process.exit(1); // Quittez le processus Node.js en cas d'erreur de connexion
  }
};

module.exports = connect;