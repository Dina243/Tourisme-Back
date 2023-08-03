const mongoose = require('mongoose') ;
const fs = require('fs');
const { MongoClient } = require('mongodb');

const imagePath = [
    'images/img/isalo.png',
    'images/img/baobab.png',
    'images/img/nosybe.png',
    'images/img/ranomafana.png',
    'images/img/anja.png'
  ];

// const videoPath = [
//     'images/video/isalo.mp4',
//     'images/video/baobab.mp4',
//     'images/video/nosybe.mp4',
//     'images/video/ranomafana.mp4',
//     'images/video/anja.mp4'
//   ];

// Fonftion pour lire une image et retourner base64 representation
function readImageAsBase64(imagePath) {
    const imageData = fs.readFileSync(imagePath);
    return imageData.toString('base64');
}

// Fonction pour lire 

// Encodage données images et videos
const encodedImages = imagePath.map((path) => readImageAsBase64(path));
// const encodedVideos = videoPath.map((path) => readFileAsBase64(path));


// Lecture de l'image en tant que données binaires
//const imageData = fs.readFileSync(imagePath);

// Lecture de la vidéo en tant que données binaires
// const videoData = fs.readFileSync(videoPath);

// Encodage en base64
// const encodedImage = imageData.toString('base64');

// Encodage en base64
// const encodedVideo = videoData.toString('base64');

const ATLAS_URI = 'mongodb+srv://androidm1p10-manoa-dina:mdpprom13@androidm1p10-manoa-dina.8atoyrn.mongodb.net/?retryWrites=true&w=majority' ;
const client = new MongoClient(ATLAS_URI);

mongoose.connect(ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("=> Connected successfully") ;
        // Insert images and videos into MongoDB
        // insertDataIntoMongoDB();
    }).catch((err) => console.log(err)) ;

// Connexion à la base de données MongoDB et insertion du document contenant image et vidéo encodées en base64
// async function insertDataIntoMongoDB() {
//   try {
//     const database = mongoose.connection.db;
//     const collection = database.collection('Lieux');

//     const documents = encodedImages.map((image, index) => ({
//       nom: 'Lieux',
//       image: image,
//       video: encodedVideos[index],
//     }));

//     await collection.insertMany(documents);

//     console.log('L\'insertion d\'images et vidéos dans MongoDB a été un succès.');
//   } catch (error) {
//     console.error('Erreur lors de l\'insertion de l\'image dans MongoDB :', error);
//   } finally {
//     mongoose.disconnect(); // Close the MongoDB connection after insertion
//   }
// }

// // insertDataIntoMongoDB();

// Connexion à la base de données MongoDB et insertion du document contenant l'image encodée en base64
async function insertImageIntoMongoDB() {
  try {
    await client.connect();

    const database = client.db('m1p10android-Manoa-Dina');
    const collection = database.collection('Lieux');

    const document = {
      nom: 'Lieux',
      // Stockez le chemin d'accès ou l'URL vers le fichier image
      image: encodedImages,
    };

    await collection.insertOne(document);

    console.log('Image insérée avec succès dans MongoDB.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'image dans MongoDB :', error);
  } finally {
    // fermer la connexion après utilisation.
    await client.close();
  }
}

insertImageIntoMongoDB();

// Connexion à la base de données MongoDB et insertion du document contenant la vidéo encodée en base64
// async function insertVideoIntoMongoDB() {
//     try {
//       await client.connect();
  
//       const database = client.db('m1p10android-Manoa-Dina');
//       const collection = database.collection('Lieux');
  
//       const document = {
//         nom: 'Lieux',
//         // Stockez le chemin d'accès ou l'URL vers le fichier vidéo
//         video: encodedVideo,
//       };
  
//       await collection.insertOne(document);
  
//       console.log('Vidéo insérée avec succès dans MongoDB.');
//     } catch (error) {
//       console.error('Erreur lors de l\'insertion de la vidéo dans MongoDB :', error);
//     } finally {
//       // fermer la connexion après utilisation.
//       await client.close();
//     }
//   }
  
//   insertVideoIntoMongoDB();