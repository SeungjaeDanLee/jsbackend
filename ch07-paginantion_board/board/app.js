const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// load services
const postService = require('./services/post-service');
const { ObjectId } = require('mongodb');

// mongodb connection
const mongodbConnection = require('./configs/mongodb-connection');

// resister handlebars engine
app.engine(
    'handlebars',
    handlebars.create({
        helpers: require('./configs/handlebars-helpers')
    }).engine,
);
// set view engine
app.set('view engine', 'handlebars');
// set views directory
app.set('views', __dirname + '/views');

// set router
app.get('/', async (req, res) => {
    const page = req.query.page || "";
    const search = req.query.search || "";
    try {
        // get posts and paginator from postService.list
        const [posts, paginator] = await postService.list(collection, page, search);

        // list page rendering
        res.render('home', { title: "test board", search, paginator, posts });
    } catch (error) {
        console.error(error);
        res.render('home', { title: "test board" });
    }
});

// move to write page, mode is create
app.get('/write', (req, res) => {
    res.render('write', { title: "write board", mode: "create" });
});

// write post
app.post('/write', async (req, res) => {
    const post = req.body;
    // response the result after writing post
    const result = await postService.writePost(collection, post);
    // moving to detail page using the id of the post
    res.redirect(`/detail/${result.insertedId}`);
});

// move to detail page
app.get('/detail/:id', async (req, res) => {
    // get post
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render('detail', {
        title: "detail board",
        post: result,
    });
});

// check the password
// get the post by id and password
app.post('/check-password', async (req, res) => {
    const { id, password } = req.body;
    const post = await postService.getPostByIdAndPassword(collection, { id, password });

    // if data exists, isExist is true, otherwise false
    if (!post) {
        return res.status(404).json({ isExist: false });
    } else {
        return res.json({ isExist: true });
    }
});

// move to modify page
app.get('/modify/:id', async (req, res) => {
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render('write', { title: "modify board", mode: "modify", post });
});

// update post API
app.post('/modify/', async (req, res) => {
    const { id, title, writer, password, content } = req.body;

    const post = { title, writer, password, content, createdDt: new Date().toISOString(), };

    // response the result after updating post
    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});

// delete post API
app.delete('/delete', async (req, res) => {
    const { id, password } = req.body;
    try {
        // delete post
        const result = await collection.deleteOne({ _id: new ObjectId(id), password: password });
        if (result.deletedCount !== 1) {
            console.log('Delete failed');
            return res.json({ isSuccess: false });
        }
        return res.json({ isSuccess: true });
    } catch (error) {
        // error handling
        console.error(error);
        return res.json({ isSuccess: false });
    }
});

// add comment API
app.post('/write-comment', async (req, res) => {
    const { id, name, password, comment } = req.body;

    const post = await postService.getPostById(collection, new ObjectId(id));

    if (post.comments) {
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    } else {
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            },
        ];
    }

    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});

// delete comment API
app.delete('/delete-comment', async (req, res) => {
    const { id, idx, password } = req.body;

    const post = await collection.findOne(
        {
            _id: new ObjectId(id),
            comments: { $elemMatch: { idx: parseInt(idx), password } },
        },
        postService.projectionOption,
    );

    if (!post) {
        return res.json({ isSuccess: false });
    }

    post.comments = post.comments.filter((comment) => comment.idx != idx);
    postService.updatePost(collection, id, post);
    return res.json({ isSuccess: true });
});

let collection;
app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');
    
    // connect to MongoDB
    const mongoClient = await mongodbConnection();

    // get collection
    collection = mongoClient.db().collection('post');
    console.log('Connected to MongoDB');
});