const express = require('express');
// const getData = require('../services/index');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(JSON.stringify({ ...req.body }));
  return res.json({
    message: {
      text: 'Here is a quick reply!',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Search',
          payload: 'kdjnf',
        },
      ],
    },
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
