const express = require('express');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

// Register a new user
router.post('/register',
  authMiddleware.register,
  (req, res) => {
    res.json({ user: req.user })
  }
);

// Sign in a user
router.post('/signin',
  authMiddleware.signIn,
  (req, res) => {
    res.json({ user: req.user })
  }
);

router.get('/movies',
  authMiddleware.signIn,
  (req, res) => {
    res.send({ movies: [ 'Movies!' ]})
  }
);

module.exports = router;