const fs = require("fs");
const path = require("path");
const N3 = require("n3");
const { RdfXmlParser } = require("rdfxml-streaming-parser");

// Pre-fetches and parses the vocabularies the SPARQL playground's autocomplete
// cares about (schema.org, HY_Features, GeoSPARQL) into a flat list of class
// and property IRIs, so the editor can suggest terms from them locally
// instead of calling out to a live vocabulary-lookup API on every keystroke.
// See src/components/sparql/SparqlQueryEditorImpl.tsx for how this is used.

const OUTPUT_PATH = path.resolve("src/components/sparql/vocab.generated.json");

const SCHEMA_ORG_URL = "https://schema.org/version/latest/schemaorg-current-https.jsonld";
const HYF_URL = "https://raw.githubusercontent.com/opengeospatial/HY_Features/master/ontology/ogc_ready/hyf.ttl";
const GEOSPARQL_URL = "https://schemas.opengis.net/geosparql/1.0/geosparql_vocab_all.rdf";

const HYF_NAMESPACE = "https://www.opengis.net/def/schema/hy_features/hyf/";
const GEOSPARQL_NAMESPACE = "http://www.opengis.net/ont/geosparql#";

const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const CLASS_TYPES = new Set([
  "http://www.w3.org/2002/07/owl#Class",
  "http://www.w3.org/2000/01/rdf-schema#Class",
]);
const PROPERTY_TYPES = new Set([
  "http://www.w3.org/2002/07/owl#ObjectProperty",
  "http://www.w3.org/2002/07/owl#DatatypeProperty",
  "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property",
]);

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function parseTurtle(text) {
  return new Promise((resolve, reject) => {
    const parser = new N3.Parser();
    const quads = [];
    parser.parse(text, (error, quad) => {
      if (error) return reject(error);
      if (quad) quads.push(quad);
      else resolve(quads);
    });
  });
}

function parseRdfXml(text) {
  return new Promise((resolve, reject) => {
    const parser = new RdfXmlParser();
    const quads = [];
    parser.on("data", (quad) => quads.push(quad));
    parser.on("error", reject);
    parser.on("end", () => resolve(quads));
    parser.write(text);
    parser.end();
  });
}

function extractTerms(quads, namespace) {
  const classes = new Set();
  const properties = new Set();
  for (const quad of quads) {
    if (quad.predicate.value !== RDF_TYPE) continue;
    if (!quad.subject.value.startsWith(namespace)) continue;
    if (CLASS_TYPES.has(quad.object.value)) classes.add(quad.subject.value);
    else if (PROPERTY_TYPES.has(quad.object.value)) properties.add(quad.subject.value);
  }
  return { classes: [...classes], properties: [...properties] };
}

async function buildSchemaOrgTerms() {
  const text = await fetchText(SCHEMA_ORG_URL);
  const data = JSON.parse(text);
  const prefix = data["@context"].schema;
  const classes = [];
  const properties = [];
  for (const entry of data["@graph"]) {
    if (typeof entry["@id"] !== "string" || !entry["@id"].startsWith("schema:")) continue;
    const iri = prefix + entry["@id"].slice("schema:".length);
    if (entry["@type"] === "rdfs:Class") classes.push(iri);
    else if (entry["@type"] === "rdf:Property") properties.push(iri);
  }
  return { classes, properties };
}

async function buildHyfTerms() {
  const text = await fetchText(HYF_URL);
  const quads = await parseTurtle(text);
  return extractTerms(quads, HYF_NAMESPACE);
}

async function buildGeosparqlTerms() {
  const text = await fetchText(GEOSPARQL_URL);
  const quads = await parseRdfXml(text);
  return extractTerms(quads, GEOSPARQL_NAMESPACE);
}

async function main() {
  const [schemaOrg, hyf, geosparql] = await Promise.all([
    buildSchemaOrgTerms(),
    buildHyfTerms(),
    buildGeosparqlTerms(),
  ]);

  const classes = [...schemaOrg.classes, ...hyf.classes, ...geosparql.classes].sort();
  const properties = [...schemaOrg.properties, ...hyf.properties, ...geosparql.properties].sort();

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ classes, properties }, null, 2) + "\n");
  console.log(
    `✅ Wrote ${classes.length} classes (schema.org: ${schemaOrg.classes.length}, hyf: ${hyf.classes.length}, gsp: ${geosparql.classes.length}) ` +
      `and ${properties.length} properties (schema.org: ${schemaOrg.properties.length}, hyf: ${hyf.properties.length}, gsp: ${geosparql.properties.length}) ` +
      `to ${OUTPUT_PATH}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
