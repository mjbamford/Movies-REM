const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

// Create the server
const server = express();

server.use(require('cookie-parser')());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
server.use(require('express-session')(
  { secret: 'secret', resave: false, saveUninitialized: false }
));
server.use(authMiddleware.initialize);

// Movies router/controller
const moviesRouter = require('./routes/movies');
server.use('/movies', moviesRouter);
server.use('/auth', require('./routes/auth'));

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
