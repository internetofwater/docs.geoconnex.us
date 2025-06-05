---
sidebar_position: 2
title: "SPARQL Query Builder"
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
import BrowserOnly from '@docusaurus/BrowserOnly';
import SparqlEditor from '@site/src/components/SparqlEditor';

<Tabs>
<TabItem value="search" label="Search" default>
<div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em"}}>
<h1>Geoconnex SPARQL Query Builder</h1>
</div>

<BrowserOnly fallback={<div>Loading...</div>}>
  {() => <SparqlEditor />}
</BrowserOnly>
</TabItem>
<TabItem value="help" label="Help and Background Info" >

<!-- bigger but not ## because otherwise ## will show up in the heading when the tab isn't in focus -->
<div style={{fontSize: "1.5em", fontWeight: "bold", margin: "1em 0 0.5em 0"}}>
SPARQL Query Builder Overview
</div>

This page allows you to create SPARQL queries to fetch data from the Geoconnex graph database located at [graph.geoconnex.us](https://graph.geoconnex.us). Since the Geoconnex graph database has a public endpoint, you can use both this page or any HTTP client to fetch data.

For more detail about accessing data in Geoconnex, view the [access data](/access/overview) section generally and the [SPARQL section](/access/examples/datasets#sparql) in particular.

</TabItem>
</Tabs>