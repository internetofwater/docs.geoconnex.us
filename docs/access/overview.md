---
sidebar_position: 1
title: Overview
---

# Overview for accessing data in geoconnex

import CardLinks from '@site/src/components/CardLinks';


<CardLinks />

Users can make knowledge graph queries for Geoconnex data at [graph.geoconnex.us](https://graph.geoconnex.us/). The query functionality for the Geoconnex graph is in active development and there are plans to eventually develop a general purpose REST API for accessing the knowledge graph without needing to use a graph database query language like SPARQL.


 ## Geoconnex key data endpoints

[Reference features](./reference/index.md) and the [Geoconnex graph](https://graph.geoconnex.us/) are the two key data endpoints for Geoconnex.
- Reference features provide the stable URIs for the knowledge graph so that across organizations the same feature is tagged with the same persistent identifier. 
- The Geoconnex  graph includes both community reference features as well as those which are associated with a particular organization or database. All features listed in [the geoconnex uri repository](https://github.com/internetofwater/geoconnex.us) are harvested and included in the Geoconnex knowledge graph. 

- Behind the scenes, the knowledge graph uses reference features to link the data together. However, an end user can use either without necessarily needing to interact with the other. 
    - For instance, if a user wanted to determine the stream gages present on a given river, they could use sparql queries for the knowledge graph
    - If a user just wanted to determine the geometry of a river, they could access the reference features directly
