const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const serviceAccount = require('D:/Dina/Cours_Master1_P10/ProjetFinal_Android_MrRojo_M1_P10/projet/clé_API/mada-tourisme7-firebase-adminsdk-mx1vz-d69a153297.json');
// Pour le déploiement le chemin d'accès spécifié ne fonctionnera pas donc
        // Définir une variable d'environnement temporaire dans cmd :
                // SET FIREBASE_SERVICE_ACCOUNT_KEY_PATH=D:\Dina\Cours_Master1_P10\ProjetFinal_Android_MrRojo_M1_P10\projet\clé_API\mada-tourisme7-firebase-adminsdk-mx1vz-d69a153297.json
        // Définir une variable d'environnement permanente dans cmd :
                // setx FIREBASE_SERVICE_ACCOUNT_KEY_PATH "D:\Dina\Cours_Master1_P10\ProjetFinal_Android_MrRojo_M1_P10\projet\clé_API\mada-tourisme7-firebase-adminsdk-mx1vz-d69a153297.json"
    // const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// envoi de notification => Android
const registrationToken = 'DEVICE_REGISTRATION_TOKEN'; // celui-ci est le token de l'appareil Android
const message = {
  data: {
    title: 'Titre de la notification',
    body: 'Contenu de la notification',
  },
  token: registrationToken,
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Notification envoyée avec succès :', response);
  })
  .catch((error) => {
    console.error('Erreur lors de l\'envoi de la notification :', error);
  });
/*
// Définir la route pour envoyer la notification => Android
router.post('/', (req, res) => {
  const registrationToken = req.body.registrationToken;
  const message = {
    data: {
      title: 'Titre de la notification',
      body: 'Contenu de la notification',
    },
    token: registrationToken,
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Notification envoyée avec succès :', response);
      res.status(200).json({ success: true, response });
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi de la notification :', error);
      res.status(500).json({ success: false, error });
    });
});
*/

module.exports = router;



// const PushNotifications = require('node-pushnotifications');

// const settings = {
//     gcm: {
//       id: 'CLE_DE_SERVEUR_FCM',
//     },
    
//   };
  
//   const push = new PushNotifications(settings);