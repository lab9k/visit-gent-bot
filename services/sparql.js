const axios = require('axios');
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
    const query = 'PREFIX schema: <http://schema.org/> PREFIX n3: <http://schema.org/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT DISTINCT ?attraction ?name ?description ?page (GROUP_CONCAT(?image; SEPARATOR=", ") AS ?images) WHERE { ?attraction a <http://schema.org/TouristAttraction> . ?attraction n3:name ?name . ?attraction n3:description ?description . ?attraction foaf:page ?page . ?attraction n3:image ?image . FILTER (langMatches(lang(?name), lang(?description))) . } GROUP BY ?attraction ?name ?description ?page';
    return this.query(query).then(data => rawParse(data));
  }

  getEvents() {
    const query = 'PREFIX schema: <http://schema.org/> PREFIX n3: <http://schema.org/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?attraction ?name ?description ?page (GROUP_CONCAT(?image; SEPARATOR=", ") AS ?images) FROM <http://stad.gent/tourism/events/> WHERE { ?attraction a <http://schema.org/Event> . ?attraction n3:name ?name . ?attraction n3:description ?description . ?attraction foaf:page ?page . ?attraction n3:image ?image . FILTER (langMatches(lang(?name), lang(?description))) . } GROUP BY ?attraction ?name ?description ?page';
    return this.query(query).then(data => rawParse(data));
  }

  query(query) {
    return axios.get(this.baseUrl, { params: { ...this.options, query } }).then(({ data }) => data);
  }
}

module.exports = SparqlAPI;
