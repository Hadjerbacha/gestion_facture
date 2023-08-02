const { MongoClient } = require('mongodb');

// Remplacez ces informations par vos propres informations de connexion
const uri = 'mongodb+srv://hadjer:bachasais123@cluster0.1llqcfq.mongodb.net/'; // URL de votre base de données MongoDB
const dbName = 'sonatrach'; // Remplacez 'ma_base_de_donnees' par le nom de votre base de données
const collectionName = 'facture'; // Remplacez 'ma_collection' par le nom de votre collection (table)

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connectez-vous à la base de données
    await client.connect();

    // Accédez à la base de données et à la collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Exécutez une requête de recherche pour récupérer tous les documents dans la collection
    const documents = await collection.find({}).toArray();

    // Affichez les documents dans la console
    console.log('Documents dans la collection :');
    console.log(documents);
  } catch (e) {
    console.error('Erreur lors de la récupération des données :', e);
  } finally {
    // Fermez la connexion à la base de données
    await client.close();
  }
}

main().catch(console.error);
