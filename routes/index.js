const express = require('express');
const Sparql = require('../services/sparql');

const router = express.Router();

/* GET home page. */
router.get('/attractions', (req, res) => {
  const api = new Sparql('https://stad.gent/sparql');
  api
    .getAttractions()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
