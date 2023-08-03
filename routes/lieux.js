var express = require('express');
var router = express.Router();

const { save, find } = require('../service/LieuxService') ;

/* Enregistrement d'un nouveau lieu */
router.post('/lieux', save) ;

/* Liste de tous les lieux */
router.get('/', find) ;

module.exports = router;