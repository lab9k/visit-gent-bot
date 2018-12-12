const express = require('express');
const axios = require('axios');
// const getData = require('../services/index');

const router = express.Router();

function sendMessage(recipientId, message) {
  axios
    .post('https://graph.facebook.com/v3.0/me/messages', {
      params: {
        access_token: process.env.FB_ACCESS_TOKEN,
      },

      method: 'POST',
      data: {
        recipient: { id: recipientId },
        message,
      },
    })
    .then((error, response, body) => {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
      console.log(JSON.stringify(body));
    })
    .catch(err => console.log(err));
}

router.post('/', (req, res) => {
  const events = req.body.entry[0].messaging;
  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];
    if (event.message && event.message.text) {
      sendMessage(event.sender.id, { text: `Echo: ${event.message.text}` });
    }
  }
  res.sendStatus(200);

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
