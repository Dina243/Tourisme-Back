const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const LieuxSchema = new Schema({
    nom: { type: String, required: true } ,
    description: { type: String, required: true } ,
    categorie: { type: String, required: true },
    region: { type: String, required: true},
    image: { type: String, required: true},
    video: { type: String, required: true}
}) ;

module.exports = mongoose.model("Lieux", LieuxSchema) ;
