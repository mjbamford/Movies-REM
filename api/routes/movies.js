const express = require('express');
const Movie = require('../models/movie.js');

const router = express.Router();

router.get('/', (req, res) => {
  Movie.find().then(movies => {
    res.json({ movies });
  });
});

router.post('/', (req, res) => {
  Movie.create(req.body)
    .then((movie) => {
      res.status(201).json(movie).end();
    })
});

module.exports = router;
