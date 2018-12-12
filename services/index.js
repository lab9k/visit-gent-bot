const Sparql = require('../services/sparql');

const getData = (kind) => {
  const api = new Sparql('https://stad.gent/sparql');
  switch (kind) {
    case 'attractions':
      return cb => api.getAttractions().then(data => cb(null, data));
    case 'events':
      return cb => api.getEvents().then(data => cb(null, data));
    case 'combined':
      return cb => Promise
        .all([api.getAttractions(), api.getEvents()])
        .then(data => cb(null, data));
    default:
      return cb => Promise.resolve('No valid datatype specified.').then(err => cb(new Error(err), null));
  }
};

module.exports = getData;
