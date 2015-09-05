import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  _id: String,
  description: String
});

module.exports = mongoose.model('Book', BookSchema);
