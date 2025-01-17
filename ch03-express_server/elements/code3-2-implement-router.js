const http = require('http');
// loading url module
const url = require('url');
http.
    createServer((req, res) => {
        // Set path
        const path = url.parse(req.url).pathname;
        res.setHeader('Content-Type', 'text/html');

        if (path === '/user') {
            // Set /user response
            res.end("[user] name : andy, age : 30");
        } else if (path === '/feed') {
            // Set /feed response
            res.end(`<ul>
                        <li>picture1</li>
                        <li>picture2</li>
                        <li>picture3</li>
                    </ul>`
            );
        } else {
            res.statusCode = 404;
            res.end("404 page not found");
        }
    })
    .listen(3000, () => console.log('making router!'));