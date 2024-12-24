// make a http object
const http = require("http");
let count = 0;

// create a server object
const server = http.createServer((req, res) => {
    // increment of the count 1
    log(count);
    
    // result 200
    res.statusCode = 200;

    // response header
    res.setHeader('Content-Type', 'text/plain');

    // response body
    res.write('hello\n');

    // end the response
    // after 2 seconds, Node.js will be printed.
    setTimeout(() => {
        res.end('Node.js\n');
    }, 2000);
});

function log(count) {
    console.log(count += 1);
}

// listen to the port 8000
server.listen(8000, () => console.log("Hello, Node.js"));