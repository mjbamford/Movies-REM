const express = require('express');
const bodyParser = require('body-parser');

// Create the server
const server = express();

// Movies router/controller
const moviesRouter = require('./routes/movies');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
server.use('/movies', moviesRouter);

server.get('/', (req, res) => {
  res.json({
    resources: [{
      movies: '/movies'
    }]
  })
});

const port = 7000;
server.listen(port, () => {
  console.log(`Movies API Server running on ${port}`);
});
