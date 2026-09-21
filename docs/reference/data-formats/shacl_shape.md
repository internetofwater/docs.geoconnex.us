---
sidebar_position: 4
title: SHACL Shape
---

# SHACL Shape

import ShaclShape from '@site/src/components/ShaclShape';

[SHACL](https://en.wikipedia.org/wiki/SHACL), the Shapes Constraint Language, is a format for defining constraints on data in a knowledge graph. Geoconnex uses a **single canonical shape** to decide whether a JSON-LD document can be ingested. The shape below is the source of truth: the [JSON-LD guidance](./jsonld/primer/index.md) in these docs describes it in prose, but where the two disagree, the shape should be deemed authoritative.

## How to validate

To test for conformance, you can use:
- The browser-based [SHACL validation playground](/playground/shacl)
- The [nabu CLI tool](https://github.com/internetofwater/nabu) using the `nabu shacl` command
- Any SHACL-compliant validator in your language of choice, like [pyshacl](https://pypi.org/project/pyshacl/) or [goRDFLib](https://github.com/tggo/goRDFlib). 


## What it checks

The top-level node of your document must be typed `schema:Place` (or, for documents with no single feature, `schema:Dataset`). If it is not, validation stops immediately with:

```
the top level node of the jsonld must have '@type': 'schema:Place' or '@type': 'schema:Dataset'
```

The reason for this is that SHACL requires a node to match against. We must have a guarantee that the top-level node is a feature or a dataset.

Everything nested inside is then validated by whichever node shape matches its type or the property that points at it:

| Node shape | Applies to |
| --- | --- |
| `LocationOrientedShape` | any `schema:Place` — see [Features](./jsonld/primer/feature.md) |
| `DatasetShape` | any `schema:Dataset`, and anything under `schema:subjectOf` — see [Datasets](./jsonld/primer/dataset.md) |
| `ProviderShape` | any `schema:Organization`, `schema:GovernmentOrganization`, `schema:ResearchOrganization`, or `schema:Person` |
| `PublisherShape` | whatever a `schema:publisher` points at |
| `VariableShape` | whatever a `schema:variableMeasured` points at |
| `MeasurementMethodShape` | whatever a `schema:measurementMethod` points at |
| `DistributionShape` | any `schema:DataDownload` |
| `NoTypeShape` | whatever a `schema:about` points at — these must be bare IRIs carrying no type |

:::note

The shape is **open**. Properties it does not mention are neither required nor rejected, so you are free to include additional metadata from any vocabulary. Properties it *does* mention are constrained whenever they are present, even when they are optional — an `@type` you did not intend, a number where a string is expected, or a URI written as a string literal instead of an `@id` will all fail validation.

The shape is in active development and may be updated in the future. The copy rendered below is fetched from the [nabu repository](https://github.com/internetofwater/nabu/blob/main/shacl_validator/shapes/geoconnex.ttl) when this site is built.

:::

## The shape

<ShaclShape url="https://raw.githubusercontent.com/internetofwater/nabu/refs/heads/main/shacl_validator/shapes/geoconnex.ttl" />
