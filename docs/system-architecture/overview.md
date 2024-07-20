---
sidebar_position: 1
title: Overview

---

# Overview of Geoconnex Architecture

The Geoconnex knowledge graph is populated by the following process:

1. An organization creates an endpoint for their water data and associates a list of persistent identifiers with their endpoints
2. The organization submits a pull request or submits the form at [register.geoconnex.us](https://register.geoconnex.us/) to upload their data
3. The Geoconnex crawler finds the endpoints via their published PIDs and downloads the JSON-LD for each endpoint
4. Using the JSON-LD data, the Geoconnex crawler produces [semantic triples](https://en.wikipedia.org/wiki/Semantic_triple) in the [PROV Ontology](https://www.w3.org/TR/prov-o/) 
5. The Geoconnex crawler populates the Geoconnex graph database

## A Visual Representation of the Geoconnex Architecture
![architecture diagram](./assets/bigpicture.png)