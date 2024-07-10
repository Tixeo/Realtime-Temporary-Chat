const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'src')));

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'chat.html'));
});

io.on('connection', (socket) => {

    socket.on('message', (data) => {
        io.emit('message', data);
    });
});

const PORT = 5555;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
