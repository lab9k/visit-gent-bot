1. Fetch all attractions with their name, description and website.
   One record per language.

```sql
PREFIX schema: <http://schema.org/>
PREFIX n3: <http://schema.org/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT DISTINCT ?attraction ?name ?description ?page
WHERE {
  ?attraction a <http://schema.org/TouristAttraction> .
  ?attraction n3:name ?name .
  ?attraction n3:description ?description .
  ?attraction foaf:page ?page
  FILTER (langMatches(lang(?name), lang(?description))) .
} LIMIT 1000 OFFSET 0.
```
