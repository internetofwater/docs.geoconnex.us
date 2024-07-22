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

## An example JSON-LD document

This document is located inside a `<script>` tag within a `<head>` or `<body>` section of an HTML page.

```json
<script type="application/ld+json">
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
### List of keywords and their significance

**`<script type="application/ld+json">`, `script>`** These are immutable HTML elements that tell machines to interpret everything between them as JSON-LD.

**`@context`** sets the stage for interpreting the data by mapping terms to IRIs (Internationalized Resource Identifiers). By doing so, properties and values are clearly defined and identified. Our updated example has two contexts:

- `@vocab` sets the default document vocabulary to `https://schema.org/`, which is a standard vocabulary for web-based structured data. This means that in general, attributes in the document will be assumed to have `https://schema.org/` as a prefix, so JSON-LD parsers will map `name` to https://schema.org/name>
- `ex` is a custom context prefix representing `https://example.com/schema/`, signifying specific extensions or custom data definitions specific to our website. The prefix can be used on other attributes so that JSON-LD parsers do the appropriate mapping. Thus, `ex:name` will be parsed as `https://example.com/schema/recordCount`.
- `locType` is a custom direct attribute mapping, specifying that this attribute exactly matches to the concept identified by this HTTP identifier https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType>. Using this direct mapping approach allows data publishers to map their arbitrary terminology to any publicly accessibly and well-identified standard term.

**`@id`** furnishes a uniform resource identifier (URI) for subjects in the JSON-LD document, enabling the subjects to be interconnected with data elsewhere. In this example:

- Well 1234 has the identifier `https://example.com/well/1234`.
- The dataset that it is about, "Well Locations Dataset", has its unique identifier as `https://datasystem.org/dataset1`.

**`@type`** stipulates the type or nature of the subject or node in the JSON-LD. It aids in discerning the entity being depicted. In the given context:

- Well 1234 is specified as a "Place" from the schema.org vocabulary (`schema:Place`).
- Well Locations Dataset's type is a "Dataset" from the schema.org vocabulary (`schema:Dataset`).

**`Nodes`** represent entities in JSON-LD, with each entity having properties associated with it. In the example:

- The main node is Well 1234, possessing properties like `name`, `description`, `locType`, and `subjectOf`.
- `subjectOf` property itself is a node representing a dataset that is about Well 1234. Apart from the "name" property, the dataset now also has a property called "ex:recordCount" (using the `ex:` prefix from `@context`) indicating the number of rows in the dataset. This extension showcases the flexibility and strength of JSON-LD, where you can seamlessly integrate standard vocabulary with custom definitions, ensuring rich and well-structured interconnected data representations. Below, you can see how JSON-LD tools would parse and standardize the JSON-LD in the example.