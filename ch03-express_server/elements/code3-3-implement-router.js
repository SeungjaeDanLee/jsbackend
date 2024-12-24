const http = require('http');
// loading url module
const url = require('url');
http.
    createServer((req, res) => {
        // Set path
        const path = url.parse(req.url).pathname;
        res.setHeader('Content-Type', 'text/html');

        if (path === '/user') {
            // user() function
            user(res, req);
        } else if (path === '/feed') {
            // feed() function
            feed(res, req);

        } else {
            // notFound() function
            notFound(res, req);
        }

            
    })
    .listen(3000, () => console.log('making router!'));


    const user = (res, req) => {
        res.end("[user] name : andy, age : 30");
    };

    const feed = (res, req) => {
        res.end(`<ul>
                    <li>picture1</li>
                    <li>picture2</li>
                    <li>picture3</li>
                </ul>`
        );
    };

    const notFound = (res, req) => {
        res.statusCode = 404;
        res.end("404 page not found");
    };