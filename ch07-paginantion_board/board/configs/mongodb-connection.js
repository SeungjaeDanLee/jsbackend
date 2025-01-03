const { MongoClient } = require('mongodb');

// MongoDB connection
const uri = "mongodb+srv://<ID>:<PASSWORD>@cluster0.u6tys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};