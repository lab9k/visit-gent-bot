const axios = require('axios');
const fs = require('fs');
const path = require('path');
const rawParse = require('../util/rawParse');

class SparqlAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.options = {
      format: 'application/sparql-results+json',
      debug: 'on',
    };
  }

  getAttractions() {
    const query = fs.readFileSync(path.join(__dirname, 'queries', 'attractions.rq')).toString();
    return this.query(query).then(data => rawParse(data));
  }

  getEvents() {
    const query = fs.readFileSync(path.join(__dirname, 'queries', 'events.rq')).toString();
    return this.query(query).then(data => rawParse(data));
  }

  query(query) {
    return axios.get(this.baseUrl, { params: { ...this.options, query } }).then(({ data }) => data);
  }
}

module.exports = SparqlAPI;
