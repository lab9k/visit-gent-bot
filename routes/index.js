const express = require('express');
const getData = require('../services/index');

const router = express.Router();

router.get('/', (req, res) => {
  getData('combined')((err, data) => (!err ? res.json(data) : res.json({ error: err.message })));
});

module.exports = router;
