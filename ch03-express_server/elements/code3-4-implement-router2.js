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
        // query string parsing using url module
        const userInfo  = url.parse(req.url, true).query;
        
        // response to client with user information(name, age)
        res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
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