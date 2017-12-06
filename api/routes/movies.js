const express = require('express');
const Movie = require('../models/movie');
const Person = require('../models/person');

const router = express.Router();

router.get('/', (req, res) => {
  Movie.find()
    .populate('director')
    .populate('crew.person')
    .populate('cast.actor')
    .populate('cast.character')
    .then(movies => res.json(movies))
    .catch(error => res.json({ error }))
});

router.post('/', (req, res) => {
  Movie.create(req.body)
    .then((movie) => {
      res.status(201).json(movie).end();
    })
    .catch(error => res.json({ error }))
});

module.exports = router;