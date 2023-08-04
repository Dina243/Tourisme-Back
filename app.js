var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var app = express();
const port = 3000;

// Ajout pour notif 04/08/2023
const admin = require('firebase-admin');
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

// Import de la route pour les notifications
// const notificationsRoute = require('./routes/notifications');

require('./database/connexion') ;

/*******************
*    MIDDLEWARE    *
*******************/
app.use(cors()) ;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/********************************************************************
*    LOGIN / INSCRIPTION / LOGOUT DO NOT NEED TOKEN VERIFICATION    *
********************************************************************/
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('Bienvenue dans notre petit coin de web service 📦🗳️!');
});

// Gestionnaire pour ignorer la requête /favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/send-push-notification', async (req, res) => {
  const deviceToken = 'le_token_du_dispositif'; // celui-ci est le token de l'appareil Android
  const message = {
    notification: {
      title: 'Nouvelle notification',
      body: 'Vous avez une nouvelle notification importante de MADE à GASCAR!',
    },
    token: deviceToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notification envoyée avec succès:', response);
    res.send('Notification push envoyée.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification:', error);
    res.status(500).send('Erreur lors de l\'envoi de la notification.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/***********************
*    CONTROLE TOKEN    *
***********************/
// const { controle } = require('./service/ControleService') ;
// app.use('*', controle) ;

/*************
*    PATH    *
*************/
// app.use('/lieuxemblematiques', require('./routes/lieuxemblematique'));
// app.use('/lieuxdetails', require('./routes/lieuxdetail')) ;
// app.use('/fiches', require('./routes/fiche')) ;
// app.use('/parametres', require('./routes/parametre'));
// app.use('/notifications', require('./routes/notification')) ;

// Utiliser la route pour les notifications
// app.use('/notifications', notificationsRoute);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const CommentSchema = new mongoose.Schema({
  author: String,
  content: String,
  created_at: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', CommentSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint pour afficher tous les commentaires
app.get('/commentaires', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    } else {
      res.json(comments);
    }
  });
});

// Endpoint pour ajouter un commentaire
app.post('/commentaires', (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    res.status(400).json({ error: 'L\'auteur et le contenu du commentaire sont requis' });
  } else {
    const newComment = new Comment({
      author,
      content,
    });

    newComment.save((err, savedComment) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement du commentaire' });
      } else {
        res.json(savedComment);
      }
    });
  }
});

module.exports = app;
