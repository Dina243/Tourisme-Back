var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var app = express();
const port = 3000;

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

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
