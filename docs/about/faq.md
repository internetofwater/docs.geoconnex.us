---
sidebar_position: 5
---

# FAQs

> What is the relationship between pygeoapi and Geoconnex



[pygeoapi](https://pygeoapi.io/) is an open-source Python reference implementation of the OGC API suite of standards. pygeoapi can be used to implement the ETL operations for various geospatial data providers and expose as OGC API - Features. OGC API - Features can expose JSON-LD on a feature level, which makes it a convenient way to expose geospatial data to Geoconnex without needing to create a custom web service for your data. Geoconnex uses pygeoapi to host the Geoconnex reference features located at https://reference.geoconnex.us


> What is the relationship between JSON, JSON-LD, and GeoJSON

JSON is a standard data exchange format for the web. GeoJSON provides a standard for how to represent geospatial data within JSON files. JSON-LD is a version of JSON that is used to express linked data. GeoJSON and JSON-LD are separate specifications and can be used independently or in combination with each other (i.e. for linked geospatial data). Both formats are valid JSON, but any particular JSON document is not guaranteed to be valid GeoJSON or JSON-LD.
