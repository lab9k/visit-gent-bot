const express = require('express');
// const getData = require('../services/index');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  return res.json({
    content_type: 'text',
    title: '<BUTTON_TEXT>',
    payload: 'koekoek',
  });

  // getData('combined')((err, data) => (!err ? res.json(data) : res.json({ error: err.message })));
});

router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const verifyToken = req.query['hub.verify_token'];
  if (verifyToken === process.env.FB_VER_VAR) {
    res.send(challenge);
  } else {
    res.send(mode);
  }
});

module.exports = router;
