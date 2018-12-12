const express = require('express');
// const getData = require('../services/index');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.json({
    content_type: 'text',
    title: '<BUTTON_TEXT>',
    payload: 'koekoek',
  });

  // getData('combined')((err, data) => (!err ? res.json(data) : res.json({ error: err.message })));
});

module.exports = router;
