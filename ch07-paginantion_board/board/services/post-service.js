const paginator = require('../utils/paginator');
const { ObjectId } = require('mongodb');

// Wrting post
async function writePost(collection, post) {
    post.hits = 0;
    post.createdDt = new Date().toISOString();
    return await collection.insertOne(post);
}

// Post list
// async function list(collection, page, search) {
//     const perPage = 10;
//     const query = { title : new RegExp(search, 'i') };
//     const cursor = collection
//                             .find(query, { limit : perPage, skip : perPage * (page - 1) })
//                             .sort({ createdDt: -1, });

//     const totalCount = await collection.count(query);
//     const posts = await cursor.toArray();
//     const paginatorObj = paginator({ totalCount, page, perPage: perPage });                            
//     return [posts, paginatorObj];
// }

async function list(collection, page, search) {
    // posts per page
    const perPage = 10;
  
    // validate page value
    const validatedPage = Math.max(page, 1);
  
    // Set MongoDB query
    // If search value exists, set query to search title
    const query = search ? { title: new RegExp(search, "i") } : {};
    // skip value
    const skip = (validatedPage - 1) * perPage;
  
    // get posts
    const cursor = collection
      // set query, limit, skip, sort
      .find(query, { limit: perPage, skip })
      .sort({ createdDt: -1 });
    const posts = await cursor.toArray();
  
    // Count total posts
    const totalCount = await collection.countDocuments(query);
  
    // paginator object
    const paginatorObj = paginator({
      totalCount,
      // set validated page
      page: validatedPage,
      perPage,
    });
  
    return [posts, paginatorObj];
}

const projectionOption = {
    projection: {
        password: 0,
        "comments.password": 0,
    },
};

async function getDetailPost(collection, id) {
    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
    }

    // Using findOneAndUpdate of MongoDB Collection
    // Increase hits by 1 when the post is read
    return await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { hits: 1 } },
        projectionOption,
    );
}

async function getPostByIdAndPassword(collection, { id, password }) {
    // findOne of MongoDB Collection
    return await collection.findOne({_id: new ObjectId(id), password: password}, projectionOption);
}

// get data by id
async function getPostById(collection, id) {
    return await collection.findOne({_id: new ObjectId(id)}, projectionOption);
}

// update post
async function updatePost(collection, id, post) {
    const toUpdatePost = {
        $set: {
            ...post,
        },
    };
    return await collection.updateOne({_id: new ObjectId(id)}, toUpdatePost);
}

module.exports = {
    list,
    writePost,
    getDetailPost,
    getPostByIdAndPassword,
    getPostById,
    updatePost,
};