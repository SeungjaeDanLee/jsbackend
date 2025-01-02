var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema for a person
const personSchema = new Schema({
    name: String,
    age: Number,
    email: { type: String, required: true},
});

// Create a model using the schema
module.exports = mongoose.model('Person', personSchema);