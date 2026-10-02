// Shared configuration for the Geoconnex SPARQL playground: the public
// endpoint, the namespace prefixes used throughout the graph, and the sample
// queries (generated from src/components/sparql/examples/*.rq by
// scripts/build-sparql-examples.js -- see that directory's README to add more).
import generatedExamples from "./examples.generated.json";

// The production Geoconnex SPARQL endpoint (GraphDB-backed).
export const GEOCONNEX_ENDPOINT = "https://graph.geoconnex.us";

// A QLever-backed mirror of the same graph, used as the playground's default
// endpoint during development. Switch SPARQL_ENDPOINT back to
// GEOCONNEX_ENDPOINT once this is ready to point at production again.
export const QLEVER_DEV_ENDPOINT = "https://qlever.internetofwater.app";

export const SPARQL_ENDPOINT = QLEVER_DEV_ENDPOINT;

// Namespace prefixes used across the Geoconnex graph. Keep in sync with
// docs/access/examples/datasets.md and docs/access/examples/sparql.sh.
export const GEOCONNEX_PREFIXES: Record<string, string> = {
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  schema: "https://schema.org/",
  gsp: "http://www.opengis.net/ont/geosparql#",
  hyf: "https://www.opengis.net/def/schema/hy_features/hyf/",
};

export function prefixDeclarations(prefixes: Record<string, string> = GEOCONNEX_PREFIXES): string {
  return Object.entries(prefixes)
    .map(([prefix, uri]) => `PREFIX ${prefix}: <${uri}>`)
    .join("\n");
}

export interface SparqlExample {
  title: string;
  category: string;
  tags: string[];
  query: string;
}

export const SPARQL_EXAMPLES: SparqlExample[] = generatedExamples;

export const DEFAULT_QUERY = `${prefixDeclarations()}

SELECT * WHERE {
  ?sub ?pred ?obj
}
LIMIT 10`;
