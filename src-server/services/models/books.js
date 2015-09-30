import mongoose from 'mongoose';

// Define a schema that describes what a book
// looks like in the database
const BookSchema = new mongoose.Schema({
  _id : String,
  description : String
});

// Create a Book class from the schema and make it
// available to anyone importing this file
module.exports = mongoose.model('Book', BookSchema);
