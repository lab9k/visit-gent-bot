const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

router.get('/ping', (req, res, next) => {
  res.json({ ping: 'pong' });
  return next();
});

module.exports = router;
