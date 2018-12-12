const axios = require('axios');

class SparqlAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.options = {
      format: 'application/sparql-results+json',
      debug: 'on',
    };
  }

  getAttractions() {
    const query = 'PREFIX schema: <http://schema.org/> PREFIX n3: <http://schema.org/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT DISTINCT ?attraction ?name ?description ?page WHERE { ?attraction a <http://schema.org/TouristAttraction> . ?attraction n3:name ?name . ?attraction n3:description ?description . ?attraction foaf:page ?page FILTER (langMatches(lang(?name), lang(?description))) . } LIMIT 1000 OFFSET 0.';
    return this.query(query);
  }

  getEvents() {
    const query = 'PREFIX schema: <http://schema.org/> PREFIX n3: <http://schema.org/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?attraction ?name ?description ?page FROM <http://stad.gent/tourism/events/> WHERE { ?attraction a <http://schema.org/Event> . ?attraction n3:name ?name . ?attraction n3:description ?description . ?attraction foaf:page ?page FILTER (langMatches(lang(?name), lang(?description))) . } LIMIT 1000 OFFSET 0.';
    return this.query(query);
  }

  query(query) {
    return axios.get(this.baseUrl, { params: { ...this.options, query } }).then(({ data }) => data);
  }
}

module.exports = SparqlAPI;
