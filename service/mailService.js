const nodemailer = require('nodemailer') ;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com" ,
    port: 465 , 
    secure: true ,
    auth: {
        user: "nandrianinaomega.itu@gmail.com" ,
        pass: "idservemore"
    }
}) ;

const sendMail = async (sendTo, contenu) => {
    transporter.sendMail({
        from: "madeagascar@gmail.com" ,
        to: sendTo ,
        subject: "MADE à GASCAR" ,
        text: contenu
    }, function (err, info) {
        if (err) console.log(err) ;
    }) ;
}

module.exports = {
    sendMail
}