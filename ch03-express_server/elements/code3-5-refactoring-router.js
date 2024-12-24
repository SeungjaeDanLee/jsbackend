const http = require('http');
const url = require('url');

http.
    createServer((req, res) => {
        const path = url.parse(req.url).pathname;
        res.setHeader('Content-Type', 'text/html');

        // check if path is in urlMap
        if (path in urlMap) {
            // call the function in urlMap
            urlMap[path](res, req);
        } else {
            notFound(res, req);
        }
    })
    .listen(3000, () => console.log('refactoring router!'));

const user = (res, req) => {
    const userInfo  = url.parse(req.url, true).query;
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

// Set urlMap object with path and function
const urlMap = {
    '/': (res, req) => res.end('Welcome to the homepage!'),
    '/user': user,
    '/feed': feed
};

