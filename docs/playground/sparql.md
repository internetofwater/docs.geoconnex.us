---
sidebar_position: 2
title: "SPARQL Query Helper"
hide_title: true
hide_table_of_contents: true
---

<!-- this is hacky fix to allow for full width https://stackoverflow.com/questions/74666779/override-max-width-of-specific-docs-not-all-docs -->
<head>
  <html class="fullWidthContent">
  </html>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SparqlQueryEditor from '@site/src/components/sparql/SparqlQueryEditor';


<Tabs>
  <TabItem value="search" label="Search" default>
    <SparqlQueryEditor />
  </TabItem>

  <TabItem value="help" label="Help and Background Info">
    <div style={{fontSize: "1.5em", fontWeight: "bold", margin: "1em 0 0.5em 0"}}>
      SPARQL Query Helper Overview
    </div>

    This page allows you to create SPARQL queries to fetch data from the Geoconnex graph database located at [graph.geoconnex.us](https://graph.geoconnex.us). Since the Geoconnex graph database has a public endpoint, you can use both this page or any HTTP client to fetch data.

    The editor is built on [YASGUI](https://github.com/rdfjs/Yasgui) (Yet Another SPARQL GUI) and runs entirely client-side in your browser -- queries go straight from your browser to the SPARQL endpoint. The common Geoconnex namespace prefixes (`schema`, `gsp`, `hyf`, `rdf`, `rdfs`) are pre-populated in the starter query and every example. Class and property suggestions from schema.org, [HY_Features](https://github.com/opengeospatial/HY_Features), and GeoSPARQL pop up automatically as you type a prefixed name (e.g. right after typing `gsp:`) -- these vocabularies are bundled with the site at build time, so suggestions are instant and work offline rather than depending on an external vocabulary lookup service. Pick any entry from the "Example Queries" list on the left to load it into the editor.

    If your query returns well-known-text (wkt) geometry (e.g. via `gsp:asWKT`), a "geo" tab appears next to the results table so you can view it on a map.

    For more detail about accessing data in Geoconnex, view the [access data](/access/overview) section generally and the [SPARQL section](/access/examples/datasets#sparql) in particular.
  </TabItem>
</Tabs>