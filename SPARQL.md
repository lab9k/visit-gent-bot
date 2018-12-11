1. Fetch all attractions with their name and description.
   One record per language.

```sql
PREFIX schema: <http://schema.org/>
PREFIX n3: <http://schema.org/>
SELECT DISTINCT ?attraction ?name ?description
WHERE {
  ?attraction a <http://schema.org/TouristAttraction> .
  ?attraction n3:name ?name .
  ?attraction n3:description ?description .
  FILTER (langMatches(lang(?name), lang(?description))) .
} LIMIT 1000 OFFSET 0.
```
