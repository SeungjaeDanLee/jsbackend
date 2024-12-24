const express = require("express");
const app = express();
// Set an empty array to store posts
let posts = [];

// For using req.body, it is necessary to use JSON middleware.
// Otherwise, req.body will be undefined.
// middleware
app.use(express.json());

// If content-type is application/x-www-form-urlencoded, it is parsing.
// JSON is parsed by middleware.
app.use(express.urlencoded({ extended: true }));

// GET
// board list page rendering JSON data
app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    // Get the post data from the request body
    const { title, name, text } = req.body;
    // Add the post data to the posts array
    posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() });
    // Send the response
    res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
    // Get the id from the request parameter
    const id = req.params.id;
    // Filter out the post with the id
    const filteredPosts = posts.filter((post) => post.id !== +id);
    // Update the posts array
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;

    if (isLengthChanged) {
        res.json("Successfully deleted");
        return;
    }

    res.json("Not Changed");
});

app.listen(3000, () => {
    console.log("welcome posts START!");
});


// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "title=제목1&name=Andy&text=Hello everyone~" http://localhost:3000/posts
// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "title=제목2&name=Park&text=I am Park." http://localhost:3000/posts
// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "title=제목3&name=Lee&text=Have a good day~~" http://localhost:3000/posts

// curl -X DELETE http://localhost:3000/posts/2 => "Successfully deleted"
// curl -X DELETE http://localhost:3000/posts/2 => "Not Changed"