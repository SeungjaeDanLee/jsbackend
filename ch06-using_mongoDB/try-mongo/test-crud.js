const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<ID>:<PASSWORD>@cluster0.u6tys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { useNewUrlParser: true });

async function main() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        console.log("Connected to MongoDB!");

        // Get person collection from the test database
        const collection = client.db("test").collection("person");

        // Insert a document into the person collection
        await collection.insertOne({ name: "Andy", age : 30 });
        console.log("Inserted a document into the person collection.");

        // Find a document in the person collection
        const documents = await collection.find({ name: "Andy" }).toArray();
        console.log("Found a document in the person collection:");

        // Update the document in the person collection
        await collection.updateOne({ name: "Andy" }, { $set: { age: 31 } });
        console.log("Updated the document in the person collection.");

        // Find the updated document in the person collection
        const updatedDocuments = await collection.find({ name: "Andy" }).toArray();
        console.log("Found an updated document in the person collection : ", updatedDocuments);

        // Delete the document in the person collection
        // await collection.deleteOne({ name: "Andy" });
        // console.log("Deleted the document in the person collection.");

        // Close the connection
        await client.close();
    } catch (error) {
        console.error(error);
    }
}

main();