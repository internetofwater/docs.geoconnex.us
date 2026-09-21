---
sidebar_position: 1
title: Building Geoconnex JSON-LD
---

# Building Geoconnex JSON-LD

Geoconnex harvests JSON-LD and uses it to generate a graph of linked features and datasets. 

:::note 

See the [contributing](/contributing/overview) page for more information regarding how and why to contribute.

:::

The JSON-LD should describe a real-world feature (like a streamgage, a well, a reservoir, a water system service area) or the datasets that can be downloaded about it.

Since Geoconnex is a graph, the content that makes it up is defined by a single [SHACL shape](../../shacl_shape.md). If your JSON-LD does not conform to this shape, the content may be skipped and not linked properly within the graph. Thus it is likely to be missing from SPARQL queries and the visualizations that rely upon them.

:::tip

To test for conformance, refer to the methods [here](/reference/data-formats/shacl_shape#how-to-validate)

:::

## Two categories: `schema:Place` and `schema:Dataset`

Geoconnex JSON-LD documents must be typed via `@type` as either:
- a [Geospatial Feature](./feature.md) type as a `schema:Place`
- a [Dataset](./dataset.md) typed as a `schema:Dataset`. 

Within this single JSON-LD document, there can be multiple `schema:Place` and `schema:Dataset` nodes. Note that you must use one of these types explicitly since many RDF engines do not support inferencing at scale.
