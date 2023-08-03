const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Un client s\'est connecté.');

  // Écouter l'événement 'send_notification' du client Android
  socket.on('send_notification', (notification) => {
    console.log('Notification reçue:', notification);

    // Diffuser la notification à tous les clients connectés (y compris l'application Android)
    io.emit('receive_notification', notification);
  });

  // Écouter l'événement de déconnexion du client
  socket.on('disconnect', () => {
    console.log('Un client s\'est déconnecté.');
  });
});

http.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
