var express = require('express');
var router = express.Router();

const { login, inscription, logout } = require('../service/UserService') ;

/* LOGIN */
router.post('/login', login) ;

/* INSCRIPTION */
router.post('/inscription', inscription) ;

/* LOGOUT */
router.post('/logout', logout) ;

/* TEST */
router.get('/test', function (req, res) {
    res.status(200).json('Test works normally !') ;
}) ;

module.exports = router;
