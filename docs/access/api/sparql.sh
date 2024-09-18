#!/bin/bash

# Define the SPARQL query
read -r -d '' SPARQL_QUERY << EOM
## Prefixes define what ontologies can be used in our query predicates
PREFIX schema: <https://schema.org/>
PREFIX gsp: <http://www.opengis.net/ont/geosparql#>
PREFIX wiki: <https://www.wikidata.org/wiki/>
PREFIX hyf: <https://www.opengis.net/def/schema/hy_features/hyf/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# Specify which of the query results we want to return to the user
SELECT DISTINCT 
?mainstem 
?monitoringLocation 
?siteName 
?datasetDescription 
?type
?url
?variableMeasured
?variableUnit
?measurementTechnique
?temporalCoverage
?distributionName
?distributionURL
?distributionFormat
?wkt
WHERE {
  # limit results to just one mainstem
  VALUES ?mainstem { <https://geoconnex.us/ref/mainstems/29559> }
  
  # location info
  ?monitoringLocation hyf:HydroLocationType ?type;
                      hyf:referencedPosition/hyf:HY_IndirectPosition/hyf:linearElement ?mainstem;
                      schema:subjectOf ?dataset;
                      gsp:hasGeometry/gsp:asWKT ?wkt .

  # dataset info
  ## NOTE: we don't return ?dataset but use it as a variable to group all the metadata together
  ## otherwise in sparql it is possible to accidentally create a cross-product of each
  ?dataset  schema:variableMeasured ?var;
            schema:url ?url;
            schema:distribution ?distribution;
            schema:description ?datasetDescription;
            schema:temporalCoverage ?temporalCoverage;
            schema:name ?siteName.
  
  # variable metadata
  ## NOTE: just like ?dataset we don't return ?var
  ?var schema:name ?variableMeasured;
       schema:unitText ?variableUnit;
       schema:measurementTechnique ?measurementTechnique.
  
  # Dataset distribution / download info
  ## NOTE: just like ?dataset we don't return ?distribution
  ?distribution schema:name ?distributionName;
                schema:contentUrl ?distributionURL;
                schema:encodingFormat ?distributionFormat.
}
# We limit 10 for the sake of brevity
LIMIT 10
EOM

# URL encode the query so we can send it as a URL parameter
ENCODED_QUERY=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$SPARQL_QUERY'''))")

# Define the endpoint URL
ENDPOINT="https://graph.geoconnex.us/repositories/iow?query=$ENCODED_QUERY"

# Send the query as a GET request by using URL parameters and encoding the query
curl -X GET --header 'Accept: application/sparql-results+json' "$ENDPOINT"

# Send the query as a POST request by using the query in the body
curl -X POST --header 'Accept: application/sparql-results+json' --header 'Content-Type: application/sparql-query' --data "$SPARQL_QUERY" "$ENDPOINT"