---
sidebar_position: 1
title: Overview
---

# Contributing to the Geoconnex Knowledge Graph

Any organization can contribute either datasets or vector geospatial features to the Geoconnex knowledge graph that are in some way relevant to hydrological analysis. Each will have a persistent identifier and after harvesting can be linked to other data inside the graph. 

You can contribute to the Geoconnex Graph in 2 main ways. Each has a different advantage and disadvantage.

1. [Hosting live landing pages](./api/index.md) with embedded JSON-LD for your water data and having the Geoconnex crawler crawl them
    - Allows organizations maximum control over the data they publish and a clear source of truth for redirects. However, it may not scale well for large datasets or require maintaining infrastructure.
2. [Submitting reference to a Docker container](./bulk/index.md) that the Geoconnex crawler can pull and run in order to generate JSON-LD
    - Allows organizations to publish data without having to maintain infrastructure. However, it abstracts away 

After creating either the CSV with each landing page or the Docker container, you should submit a [pull request](https://github.com/internetofwater/geoconnex.us/pulls) to the [geoconnex.us repository](https://github.com/internetofwater/geoconnex.us) that specifies how to crawl or run it.

## Licensing of contributions

The geoconnex.us project intends to be a public-domain registry of feature identifiers and reference information. The infrastructure used to host geoconnex.us is expected to be funded through an evolving funding source but the content of geoconnex.us is to stay dedicated to and owned by the community.
