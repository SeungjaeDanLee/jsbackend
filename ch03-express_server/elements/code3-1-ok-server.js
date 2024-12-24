const http = require('http');
const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.setHeader('Content-Type', 'text/html');

    // Set the response body
    res.end("OK");
});

// connect server to port 3000
server.listen(3000, () => console.log('Ok server is running!'));