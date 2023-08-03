const Lieux = require('../models/Lieux');

/* Nouveau lieu */
const save = async (req, res) => {
    // Récupération des données
    const nom = req.body.nom ;
    const description = req.body.description ;
    const categorie = req.body.categorie ;
    const region = req.body.region ;
    const image = req.body.image ;
    const video = req.body.video;

    // Contrôle unitaire
    if (!nom) sendResult(res, { 'error': 'Le champ nom est obligatoire', 'body': req.body })
    else {
        if (!description || !categorie || !region || !image || !video || description === '' || categorie === '' || region === '' || image === '' || video === '') sendResult(res, { 'error': 'Veuillez compléter les champs', 'body': req.body }) ;
        else {
            const nomNotE = await nomNotExist(nom) ;
            if (nomNotE) {
                new Lieux({nom: nom, description: description, categorie: categorie, region: region, image: image, video: video}).save() ;
                sendResult(res, { 'success': 'Enregistrement effectué avec succés', 'body': req.body }) ;
            } else sendResult(res, { 'error': 'Ce nom est déjà utilisé', 'body': req.body }) ;
        }
    }
} ;

/* Liste de tous les lieux */
const find = async (req, res) => {
    Lieux.find({}).then((result) => sendResult(res, result)) ;
} ;

/*************
 * FUNCTIONS *
 ************/
/* Récupération à partir du nom */
function findByNom(nom) {
    return Lieux.findOne({'nom': nom}).then((result) => { return result ; }) ;
}

/* Contrôle Nouveau lieu */
function nomNotExist(nom) {
    return Lieux.findOne({'nom': nom}).count().then((result) => { return result == 0 ; }) ;
}

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

module.exports = {
    save ,
    find ,
    findByNom
}