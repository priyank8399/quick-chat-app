const socketio = require('socket.io');
const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 5000;
const router = require('./router');
const { callbackify } = require('util');

const app = express();
const server = http.createServer(app);
//Come back to this https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked

//const io = socketio(server, connectionOptions);
const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });


io.on('connection', (socket) => {
    console.log('A new user has connected.');

    socket.on('login', ({ name, room }, callback) => {
        console.log(name, room);
        const error = true;
        if(error){
            callback({error: 'error!!'});
        }

    });

    socket.on('disconnect', () => {
        console.log('A user has left.')
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

