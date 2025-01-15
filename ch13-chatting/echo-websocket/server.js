const WebSocket = require('ws');
// Creating server instance
const server = new WebSocket.Server({ port: 3000 });

// Event handler connected to server
server.on('connection', ws => {
    // When a client connects, a message is sent to the client.
    ws.send('[Server connection completed!]');

    // Event handler when a message is received from the client.
    ws.on('message', message => {
        ws.send(`response from a server: ${message}`);
    });

    // Client dsiconnection event 
    ws.on('close', () => {
        console.log(' Disconnect client');
    });
});