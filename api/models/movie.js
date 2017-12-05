const mongoose = require('mongoose');
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on('open', () => { console.log('Successful connection to MongoDB')});
mongoose.connect('mongodb://localhost/movies'); //default port

const movieSchema = mongoose.Schema({
  title: String,
  yearReleased: Number,
  star: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie
