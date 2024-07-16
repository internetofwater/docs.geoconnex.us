---
sidebar_position: 1
title: Overview
---

# Contributing to the [geoconnex.us](https://geoconnex.us) knowledge graph

At a very high level, contributing to the geoconnex.us knowledge graph involves three steps:

1. Publishing landing pages about each real-world feature of interest you have data about.
    * For example, the USGS has a different webpage for each of their stream gauges. These pages are entry points to more detailed information that may be available elsewhere
2. Embedding structured, linked data  with rich descriptive information about the feature formatted as JSON-LD within each landing page
    * The metadata should include reference features, providing information on where the data came from (e.g., watershed, city, state, agency, etc.) and what kind of water data the site houses (e.g., groundwater vs surface water, depth, temperature, volume, etc.).
    * For example, if a data provider has a landing page about a well in a county (County X), their metadata should be structured to say, “The data on this page is within County X.” 
    * This metadata improves the relevance of search results and enables data discovery by the Geoconnex web crawler

3. Associating persistent identifiers for the data with the [geoconnex.us GitHub repository](https://github.com/internetofwater/geoconnex.us)
    * Similar to the DOI system for academic articles, water data PIDs take users directly to a linked landing page. 
    * If their landing page changes, they can then return to Geoconnex.us and remap their PID to the new URL, preserving the integrity of the search index and preventing the recurrence of broken URLs.
