---
sidebar_position: 10
---

# FAQs

> What is the relationship between pygeoapi and Geoconnex

pygeoapi is an open source Python server implementation of the OGC API suite of standards. pygeoapi can be used to implement the ETL operations for various geospatial data providers and expose a REST endpoint. Because it can expose JSON-LD, it is often a convenient way to expose geospatial data to Geoconnex without needing to create a custom web service for your data. Geoconnex uses pygeoapi to host the Geoconnex reference features but the Geoconnex knowledge graph is separate from pygeoapi.

> What is the relationship between JSON, JSON-LD, and GeoJSON

JSON is a standard data exchange format for the web. GeoJSON provides a standard for how to represent geospatial data within JSON files. JSON-LD is a version of JSON that is used to express linked data. GeoJSON and JSON-LD are separate specifications and can be used independently or in combination with each other (i.e. for linked geospatial data). Both formats are valid JSON, but any particular JSON document is not guaranteed to be valid GeoJSON or JSON-LD.
