const axios = require('axios');

class SparqlAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getAttractions() {
    const query = 'PREFIX schema: <http://schema.org/> PREFIX n3: <http://schema.org/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT DISTINCT ?attraction ?name ?description ?page WHERE { ?attraction a <http://schema.org/TouristAttraction> . ?attraction n3:name ?name . ?attraction n3:description ?description . ?attraction foaf:page ?page FILTER (langMatches(lang(?name), lang(?description))) . } LIMIT 1000 OFFSET 0.';
    const options = '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';
    const queryUrl = `${this.baseUrl}?query=${encodeURIComponent(query)}${options}`;
    console.log(queryUrl);
    return axios
      .get(this.baseUrl, {
        params: {
          format: 'application/sparql-results+json',
          debug: 'on',
          query,
        },
      })
      .then(({ data }) => {
        console.log(data);
        return data;
      });
  }
}

module.exports = SparqlAPI;
