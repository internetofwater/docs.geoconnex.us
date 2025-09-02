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

<Tabs>
  <TabItem value="search" label="Search" default>
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em"}}>
      <h1>Geoconnex SPARQL Query Helper</h1>
    </div>

    <div style={{width: "100%", height: "80vh", border: "none"}}>
      <iframe
        src="https://sparql-ui-414886575015.us-central1.run.app/"
        style={{width: "100%", height: "100%", border: "none"}}
        title="SPARQL Query Builder"
      />
    </div>
  </TabItem>

  <TabItem value="help" label="Help and Background Info">
    <div style={{fontSize: "1.5em", fontWeight: "bold", margin: "1em 0 0.5em 0"}}>
      SPARQL Query Helper Overview
    </div>

    This page allows you to create SPARQL queries to fetch data from the Geoconnex graph database located at [graph.geoconnex.us](https://graph.geoconnex.us). Since the Geoconnex graph database has a public endpoint, you can use both this page or any HTTP client to fetch data.

    If your query returns well-known-text (wkt) geometry, you can view it on a map by changing the output from `Table` to `Map` in the bottom left of the editor.

    For more detail about accessing data in Geoconnex, view the [access data](/access/overview) section generally and the [SPARQL section](/access/examples/datasets#sparql) in particular.
  </TabItem>
</Tabs>
