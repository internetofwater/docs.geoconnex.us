---
sidebar_position: 2
title: "@context and Vocabularies"
---

# `@context` and Vocabularies

The `@context` maps the short keys in your JSON document onto the full IRIs that define what those keys mean. The [SHACL shape](../../shacl_shape.md) is written entirely in terms of those full IRIs, so a document only validates properly if you use the properly declared prefixes.

The three most commonly used prefixes within Geoconnex are:

| Prefix | Usage |
| --- | --- |
| `https://schema.org/` | Our default metadata vocabulary. Used for names, date ranges, organizational info, etc.  |
| `http://www.opengis.net/ont/geosparql#` | Used for defining geometries |
| `https://www.opengis.net/def/schema/hy_features/hyf/` | Used for describing features with hydrological metadata like their flow network relationships |

:::warning

When creating JSON-LD for Geoconnex, a common mistake is to set `"@vocab": "https://schema.org/"` and then write `"@type": "schema:Place"` **without** also declaring a `schema` prefix. JSON-LD does not expand `schema:Place` using `@vocab`; it is left as the opaque IRI `schema:Place`, which is not `https://schema.org/Place`. The shape never matches, and the validator rejects the document with:

```
the top level node of the jsonld must have '@type': 'schema:Place' or '@type': 'schema:Dataset'
```

Either declare the prefix and use `schema:` consistently (recommended), or use `@vocab` and write bare terms like `"@type": "Place"` and `"name": "..."`. Do not mix the two.

:::

## All Prefixes used in Geoconnex

The following is a list of prefixes used within Geoconnex.The first four are enough for most documents; the rest become useful as you add richer variable and method metadata but the downside is that their terms are less likely to be linked between datasets due to infrequent use.

The `curl` command in each row fetches a content-negotiated machine-readable version of the vocabulary as JSON-LD, RDF Turtle, or RDF/XML if you wish to introspect the vocabulary.

| Prefix | Used for | Machine-readable content | Documentation |
| --- | --- | --- | --- |
| `schema` | Core vocabulary: names, descriptions, datasets, organizations, downloads | `curl -L -H "Accept: application/ld+json" https://schema.org/version/latest/schemaorg-current-https.jsonld` | https://schema.org/docs/schemas.html |
| `gsp` | GeoSPARQL geometry (`hasGeometry`, `asWKT`, `crs`) | `curl -L -H "Accept: text/turtle" http://www.opengis.net/ont/geosparql#` | https://opengeospatial.github.io/ogc-geosparql/geosparql11/geo.html |
| `hyf` | HY_Features: hydrologic location types, catchments, positions on a river network | `curl -L -H "Accept: text/turtle" https://www.opengis.net/def/schema/hy_features/hyf/` | https://docs.ogc.org/is/14-111r6/14-111r6.html |
| `dc` | Dublin Core: `accrualPeriodicity`, `conformsTo` | `curl -L -H "Accept: text/turtle" http://purl.org/dc/terms/` | https://www.dublincore.org/specifications/dublin-core/dcmi-terms/ |
| `qudt` | Quantities, units, dimensions and types | `curl -L -H "Accept: text/turtle" http://qudt.org/schema/qudt/` | https://qudt.org/doc/DOC_SCHEMA-QUDT.html |
| `qudt-units` | Standard unit identifiers for `schema:unitCode` | `curl -L -H "Accept: text/turtle" http://qudt.org/vocab/unit/` | https://qudt.org/doc/DOC_VOCAB-UNITS.html |
| `qudt-quantkinds` | Kinds of measurement, e.g. `VolumeFlowRate` | `curl -L -H "Accept: text/turtle" http://qudt.org/vocab/quantitykind/` | https://qudt.org/doc/DOC_VOCAB-QUANTITY-KINDS.html |
| `locType` | ODM2 site type classifications | `curl -L -H "Accept: application/rdf+xml" "http://vocabulary.odm2.org/api/v1/sitetype/?format=skos"` | http://vocabulary.odm2.org/sitetype/ |
| `odm2var` | ODM2 variable names | `curl -L -H "Accept: application/rdf+xml" "http://vocabulary.odm2.org/api/v1/variablename/?format=skos"` | http://vocabulary.odm2.org/variablename/ |
| `odm2varType` | ODM2 variable types | `curl -L -H "Accept: application/rdf+xml" "http://vocabulary.odm2.org/api/v1/variabletype/?format=skos"` | http://vocabulary.odm2.org/variabletype/ |
| `dcat` | Data catalog terms, e.g. `dcat:temporalResolution` | `curl -L -H "Accept: application/ld+json" https://www.w3.org/ns/dcat#` | https://www.w3.org/TR/vocab-dcat-3/ |
| `sosa` | Sampling relationships, e.g. relating a well to an aquifer | `curl -L -H "Accept: text/turtle" http://www.w3.org/ns/sosa/` | https://www.w3.org/TR/vocab-ssn/ |
| `xsd` | XML Schema datatypes, used in typed literals | not available | https://www.w3.org/TR/xmlschema-11-2/ |

## Extending with your own terms

The SHACL shape for Geoconnex is *open*. That means that properties it does not mention are allowed. You can use arbitrary vocabularies to add novel relationships within your data. However, novel ad-hoc metadata is likely to be ignored by downstream users of the graph due to a lack of linked relationships between datasets. You should therefore use existing vocabularies and defer to common shapes in the examples whenever possible. 
