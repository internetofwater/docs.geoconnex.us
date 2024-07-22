---
sidebar_position: 10
---

# FAQs

> What is the relationship between pygeoapi and Geoconnex

pygeoapi is an open source Python server implementation of the OGC API suite of standards. pygeoapi can be used to implement the ETL operations for various geospatial data providers and expose a REST endpoint. Because it can expose JSON-LD, it is often a convenient way to expose geospatial data to Geoconnex without needing to create a custom web service for your data. Geoconnex uses pygeoapi to host the Geoconnex reference features but the Geoconnex knowledge graph is separate from pygeoapi.
