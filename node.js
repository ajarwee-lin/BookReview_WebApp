const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

const BookSchema = new Schema({
  title: String,
  author: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

const ReviewSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  rating: Number
});

const User = mongoose.model('User', UserSchema);
const Book = mongoose.model('Book', BookSchema);
const Review = mongoose.model('Review', ReviewSchema);
