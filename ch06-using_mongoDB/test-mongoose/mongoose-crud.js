const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./person-model');

mongoose.set("strictQuery", false);

const app = express();
// Http request body parser
app.use(bodyParser.json());
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    const mongodbUrl = "mongodb+srv://<ID>:<PASSWORD>@cluster0.u6tys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    // Connect to MongoDB
    mongoose
        .connect(mongodbUrl, { useNewUrlParser: true })
        .then(console.log("Connected to MongoDB"))
});

// Get all persons
app.get('/person', async (req, res) => {
    const persons = await Person.find();
    res.json(persons);
});

// Get a person by email
app.get('/person/:email', async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.send(person);
});

// Create a person
app.post('/person', async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

// Update a person by email
app.put('/person/:email', async (req, res) => {
    const person = await Person.findOneAndUpdate(
        { email: req.params.email },
        { $set: req.body },
        { new: true }
    );
    console.log(person);
    res.send(person);
});

// Delete a person by email
app.delete('/person/:email', async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
});