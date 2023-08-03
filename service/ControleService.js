const jwt = require("jsonwebtoken");
const { idNotExist } = require('./UserService') ;

const SECRET_KEY = 'APP' ;

const controle = async (req, res, next) => {
    const headToken = req.headers.token ;
    const error = {
        'error': 'Veuillez vous connecter s\'il vous plaît' ,
        'body': req.body
    } ;
    if (headToken && headToken.split(' ').length == 2) {
        const token = headToken.split(' ')[1] ;
        if (token) {
            jwt.verify(token, SECRET_KEY, async (err, decoded) => {
                if (err) res.status(200).json(error) ;
                else {
                    const notExist = await idNotExist(decoded.id) ;
                    if (notExist) res.status(200).json(error) ;
                    else next() ;
                }
            })
        } else res.status(200).json(error) ;
    } else res.status(200).json(error) ;
}

module.exports = {
    controle
}