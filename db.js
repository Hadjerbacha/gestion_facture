/*const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/";
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}


  Print the names of all available databases
  @param {MongoClient} client A MongoClient that is connected to a cluster
 
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

module.exports = main;
 */
// db.js
const mongoose = require('mongoose');

// Remplacez "mongodb://localhost:27017/sonatrach" par votre URL de connexion
const mongoURI = "mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/";

const connectDB = async () => {
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

module.exports = connectDB;
