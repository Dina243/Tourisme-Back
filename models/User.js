const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const UserSchema = new Schema({
    nom: { type: String, required: true } ,
    prenom: { type: String, required: true } ,
    mail: { type: String, required: true } ,
    mdp: { type: String, required: true } ,
    role: { type: ObjectId, ref: "Role", required: true }
}) ;

module.exports = mongoose.model("User", UserSchema) ;