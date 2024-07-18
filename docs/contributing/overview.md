---
sidebar_position: 1
title: Overview
---

# Contributing to the [geoconnex.us](https://geoconnex.us) knowledge graph

At a very high level, contributing to the geoconnex.us knowledge graph involves three steps:

1. Publishing landing pages about each real-world feature of interest you have data about.
    * Typical examples could be water quality monitoring sites, wells, streamgages, water utilities, weather stations, or dams
        * For example, the USGS has a different webpage for each of their stream gauges. These pages are entry points to more detailed information that may be available elsewhere
    * We encourage you to read the [Internet of Water report](https://www.aspeninstitute.org/publications/internet-of-water/#:~:text=and%20Environment%20Program-,Internet%20of%20Water:%20Sharing%20and%20Integrating%20Water%20Data%20for%20Sustainability,and%20information%20to%20support%20sustainable) for rationale on why you should publish your data

2. Embedding structured, linked data  with rich descriptive information about the feature formatted as JSON-LD within each landing page
    * The metadata should include reference features, providing information on where the data came from (e.g., watershed, city, state, agency, etc.) and what kind of water data the site houses (e.g., groundwater vs surface water, depth, temperature, volume, etc.).
    * For example, if a data provider has a landing page about a well in a county (County X), their metadata should be structured to say, “The data on this page is within County X.” 
    * This metadata improves the relevance of search results and enables data discovery by the Geoconnex web crawler

3. Associating persistent identifiers for the data with the [geoconnex.us GitHub repository](https://github.com/internetofwater/geoconnex.us)
    * Similar to the DOI system for academic articles, water data PIDs take users directly to a linked landing page. 
    * If their landing page changes, they can then return to Geoconnex.us and remap their PID to the new URL, preserving the integrity of the search index and preventing the recurrence of broken URLs.


## About this tutorial

This tutorial assumes that have would like to publish a dataset you have available that in some way represents geospatial locations that include data related to water.

If you already publish some kind of website or data portal with feature-specific landing pages, then you only need to modify your landing pages to [include structure metadata formatted as JSON-LD](https://docs.geoconnex.us/principles/jsonld.html) and [mint persistent identifiers](https://docs.geoconnex.us/principles/pids.html) for those pages. If your data is being published through a web accessible folder or API, then it may be relatively simple for you to create [landing pages](https://docs.geoconnex.us/principles/lc.html) using your own web development tooling if you have not already done so. 

Otherwise, if you do not currently have a platform that publishes web content about individual [features](https://docs.geoconnex.us/principles/hydrofeatures.html), or you do not have the resources or time to make one, we show how to use [pygeoapi](https://docs.geoconnex.us/quickstart/pygeoapi.html) as a free and open-source option to so. 

## Licensing of geoconnex.us contributions.

The geoconnex.us project intends to be a public-domain registry of feature identifiers and reference information. The infrastructure used to host geoconnex.us is expected to be funded through an evolving funding source but the content of geoconnex.us is to stay dedicated to and owned by the community.
