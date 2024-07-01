const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);
app.use(express.json());
const sockets = {};

app.listen(3001, () => {
    console.log('Listening on port 3001!');
});

app.post('/:topicId', (req, res) => {
    const {topicId} = req.params;
    const message = req.body;
    console.log(message);
    const topicSockets = sockets[topicId] || [];    
    let cnt = 1;
    for(const socket of topicSockets) {
        console.log("socket ", cnt);
        cnt++;
        socket.send(JSON.stringify(message));
    }
});

app.ws('/:topicId', (socket, req) => {
    const {topicId} = req.params;
    console.log("websocket logic")
    if(!socket[topicId]) sockets[topicId] = [];

    const topicSockets = sockets[topicId];
    topicSockets.push(socket);
    // socket[topicId].push(socket);
    socket.on('close', () => {
        topicSockets.splice(topicSockets.indexOf(socket), 1);
    })
    
})