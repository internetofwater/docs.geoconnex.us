#!/bin/bash

# Define the SPARQL query
read -r -d '' SPARQL_QUERY << EOM
PREFIX schema: <https://schema.org/>
PREFIX gsp: <http://www.opengis.net/ont/geosparql#>
PREFIX hyf: <https://www.opengis.net/def/schema/hy_features/hyf/>
SELECT DISTINCT ?monitoringLocation ?siteName ?datasetDescription ?type ?url
       ?variableMeasured ?variableUnit ?measurementTechnique ?temporalCoverage
       ?distributionName ?distributionURL ?distributionFormat ?wkt
WHERE {
  VALUES ?mainstem { <https://geoconnex.us/ref/mainstems/35394> }

  ?monitoringLocation hyf:referencedPosition/hyf:HY_IndirectPosition/hyf:linearElement ?mainstem ;
                      schema:subjectOf ?item ;
                      hyf:HydroLocationType ?type ;
                      gsp:hasGeometry/gsp:asWKT ?wkt .

  ?item schema:name ?siteName ;
        schema:temporalCoverage ?temporalCoverage ;
        schema:url ?url ;
        schema:variableMeasured ?variableMeasured .

  ?variableMeasured schema:description ?datasetDescription ;
                    schema:name ?variableMeasuredName ;
                    schema:unitText ?variableUnit ;
                    schema:measurementTechnique ?measurementTechnique .

  OPTIONAL {
    ?item schema:distribution ?distribution .
    ?distribution schema:name ?distributionName ;
                  schema:contentUrl ?distributionURL ;
                  schema:encodingFormat ?distributionFormat .
  }

  FILTER(REGEX(?datasetDescription, "temperature", "i"))
}
ORDER BY ?siteName
EOM

# URL encode the query so we can send it as a URL parameter
ENCODED_QUERY=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$SPARQL_QUERY'''))")

# Define the endpoint URL
ENDPOINT="https://graph.geoconnex.us/repositories/iow?query=$ENCODED_QUERY"

# Send the query as a GET request by using URL parameters and encoding the query
curl -X GET --header 'Accept: application/sparql-results+json' "$ENDPOINT"

# Send the query as a POST request by using the query in the body
curl -X POST --header 'Accept: application/sparql-results+json' --header 'Content-Type: application/sparql-query' --data "$SPARQL_QUERY" "$ENDPOINT"
