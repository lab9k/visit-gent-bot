const express = require('express');

const router = express.Router();
const { WebhookClient } = require('dialogflow-fulfillment');
const log = require('../util/log')(__filename.split('/').pop());

/**
 * Map that maps intent names to handlers
 * @type {Map<string, function>}
 */
const intentMap = new Map();
intentMap.set('Default Welcome Intent', agent => agent.add('welcome!'));

/**
 * Routes HTTP POST requests to index. It catches all fulfillment's from Dialogflow.
 */
router.post('/', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send('Empty body');
  }

  const agent = new WebhookClient({ request: req, response: res });
  agent.handleRequest(intentMap).catch(err => log.log('error', err));
});

module.exports = router;
