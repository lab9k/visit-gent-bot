const Sparql = require('../services/sparql');

const getData = (kind) => {
  const api = new Sparql('https://stad.gent/sparql');
  switch (kind) {
    case 'attractions':
      return api.getAttractions().then(data => [null, data]);
    case 'events':
      return api.getEvents().then(data => [null, data]);
    case 'combined':
      return Promise.all([api.getAttractions(), api.getEvents()]).then(data => [null, data]);
    default:
      return Promise.resolve('No valid datatype specified.').then(err => [new Error(err), null]);
  }
};

module.exports = getData;
