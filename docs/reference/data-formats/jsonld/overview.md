---
sidebar_position: 1
title: General Overview
---

# JSON-LD Primer

JSON-LD is a version of JSON, the popular data exchange format used by web APIs, used to express linked data.

- Linked Data is an approach to data publication that allows data from various sources to be easily integrated. JSON-LD accomplishes this by mapping terms from a source data system to a machine-readable definition of that term available on the web, allowing different attribute names from different data sources to be consistently interpreted together.
- Commonly, JSON-LD is embedded within the script header of an HTML page, allowing search engines and applications to parse the information available from web addresses (URLs).

:::tip

For an in-depth exploration and multimedia resources, refer to the [JSON-LD official site](https://json-ld.org) and its [learning section](https://json-ld.org/learn.html).

:::

## Special Keys

| Key       | Description                                                                                               |
|-----------|-----------------------------------------------------------------------------------------------------------|
| `@context`| Identifies the IRIs (Internationalized Resource Identifiers) used in the JSON-LD document. <br/><br/>  These IRIs refer to a website where the ontology for a data type can be found.                                             |
| `@id`    | Furnishes a uniform resource identifier (URI) for subjects in the JSON-LD document, enabling the subjects to be interconnected with data elsewhere due to the consistency of the id.                                               |
| `@type`  | Specifies the type of the data being described. Allows a client to know how to use the output data. |
| **`<script type="application/ld+json"> ... <script>`** | The HTML tag needed to embed the JSON-LD document in your landing page |

:::note

`@context` can be thought of as defining variables for the ontologies for the JSON-LD document. In the example here, `gsp` is a name that maps to the geosparql vocabulary, so any time we refer to `gsp` (such as within `"gsp:hasGeometry":`) we are referring to the `hasGeometry` property in the geosparql vocabulary. 

```json
"gsp": "http://www.opengis.net/ont/geosparql#"
```

:::


## An example JSON-LD document

This document is located inside a `<script>` tag within a `<head>` or `<body>` section of an HTML page.

```json
<script type="application/ld+json">
// !link[/"(http.*?)"/gm]
{
  "@context": {
    "@vocab": "https://schema.org/",
    "ex": "https://example.com/schema/",
    "locType": "https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType"
  },
  "@id": "https://example.com/well/1234",
  "@type": "schema:Place",
  "name": "Well 1234",
  "description": "Well at 1234 Place St., USA",
  "locType": "well",
  "subjectOf": {
    "@id": "https://datasystem.org/dataset1",
    "@type": "schema:Dataset",
    "name": "Well Locations Dataset",
    "ex:recordCount": 500
  }
}
</script>
```

## Keywords and their significance in reference to the example

**`@context`** includes two properties:

- `@vocab` sets the default document vocabulary to `https://schema.org/`, which is a standard vocabulary for web-based structured data. This means that in general, attributes in the document will be assumed to have `https://schema.org/` as a prefix, so JSON-LD parsers will map `name` to https://schema.org/name
- `ex` is a custom context prefix representing `https://example.com/schema/`, signifying specific extensions or custom data definitions specific to our website. 
  - The prefix can be used on other attributes so that JSON-LD parsers do the appropriate mapping. Thus, `ex:name` will be parsed as `https://example.com/schema/recordCount`.
- `locType` is a custom direct attribute mapping, specifying that this attribute exactly matches to the concept identified by this HTTP identifier https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType. 
  - Using this direct mapping approach allows data publishers to map their arbitrary terminology to any publicly accessibly and well-identified standard term.

**`@id`** occurs twice:

- Well 1234 has the identifier `https://example.com/well/1234`.
- The dataset that it is about, "Well Locations Dataset", has its unique identifier as `https://datasystem.org/dataset1`.

**`@type`**: 

- Well 1234 is specified as a "Place" from the schema.org vocabulary (`schema:Place`).
- Well Locations Dataset's type is a "Dataset" from the schema.org vocabulary (`schema:Dataset`).

**`Nodes`** are not an explicit keyword but instead represent entities in JSON-LD, with each entity having properties associated with it. In the example:

- The main node is Well 1234, possessing properties like `name`, `description`, `locType`, and `subjectOf`.
- `subjectOf` property itself is a node representing a dataset that is about Well 1234. Apart from the "name" property, the dataset now also has a property called `ex:recordCount` (using the `ex:` prefix from `@context`) indicating the number of rows in the dataset. 
  - This extension showcases the flexibility and strength of JSON-LD, where you can seamlessly integrate standard vocabulary with custom definitions, ensuring rich and well-structured interconnected data representations. 


## Our Example Parsed

Due to the fact that we have a `@context` where our ontologies are defined with consistent names, and the fact we have unique `@id` values for each location or dataset, our JSON-LD document can be easily transformed into a variety of formats. 

View the [JSON-LD playground](/docs/playground/jsonld.md) for more examples.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="original" label="Original" default>

```json

{
  "@context": {
    "@vocab": "https://schema.org/",
    "ex": "https://example.com/schema/",
    "locType": "https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType"
  },
  "@id": "https://example.com/well/1234",
  "@type": "schema:Place",
  "name": "Well 1234",
  "description": "Well at 1234 Place St., USA",
  "locType": "well",
  "subjectOf": {
    "@id": "https://datasystem.org/dataset1",
    "@type": "schema:Dataset",
    "name": "Well Locations Dataset",
    "ex:recordCount": 500
  }
}

```
  </TabItem>
  <TabItem value="expanded" label="Expanded">
    ```json
     // This is functionally the same data, but transformed in a way 
     // that might be easier for client web applications to use 
      [
        {
          "@id": "https://example.com/well/1234",
          "@type": [
            "schema:Place"
          ],
          "https://schema.org/description": [
            {
              "@value": "Well at 1234 Place St., USA"
            }
          ],
          "https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType": [
            {
              "@value": "well"
            }
          ],
          "https://schema.org/name": [
            {
              "@value": "Well 1234"
            }
          ],
          "https://schema.org/subjectOf": [
            {
              "@id": "https://datasystem.org/dataset1",
              "@type": [
                "schema:Dataset"
              ],
              "https://example.com/schema/recordCount": [
                {
                  "@value": 500
                }
              ],
              "https://schema.org/name": [
                {
                  "@value": "Well Locations Dataset"
                }
              ]
            }
          ]
        }
      ]
    ```
  </TabItem>
  <TabItem value="quads" label="N-Quads">
   JSON-LD is not constrained to just outputting JSON. It can also output N-Quads. This format can be used to create a knowledge graph and the output data describes the subject, predicate, object, and optionally, a label. 
  ```
<https://datasystem.org/dataset1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <schema:Dataset> .
<https://datasystem.org/dataset1> <https://example.com/schema/recordCount> "500"^^<http://www.w3.org/2001/XMLSchema#integer> .
<https://datasystem.org/dataset1> <https://schema.org/name> "Well Locations Dataset" .
<https://example.com/well/1234> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <schema:Place> .
<https://example.com/well/1234> <https://schema.org/description> "Well at 1234 Place St., USA" .
<https://example.com/well/1234> <https://schema.org/name> "Well 1234" .
<https://example.com/well/1234> <https://schema.org/subjectOf> <https://datasystem.org/dataset1> .
<https://example.com/well/1234> <https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType> "well" .
  ```
  </TabItem>
</Tabs>

