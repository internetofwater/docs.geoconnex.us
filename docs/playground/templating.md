---
title: "Jinja templating"
hide_title: true
hide_table_of_contents: true
---

<!-- this is hacky fix to allow for full width https://stackoverflow.com/questions/74666779/override-max-width-of-specific-docs-not-all-docs -->
<head>
  <html class="fullWidthContent">
  </html>
</head>


import Playground from '@site/src/components/Playground';


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="play" label="Playground" default>
<Playground/>
</TabItem>
<TabItem value="help" label="Help and Background Info" >

<!-- bigger but not ## because otherwise ## will show up in the heading when the tab isn't in focus -->
<div style={{fontSize: "1.5em", fontWeight: "bold", margin: "1em 0 0.5em 0"}}>
Templating Overview
</div>

This page allows you to explore templating JSON-LD with Jinja so that it is easier to [contribute and expose your data](/docs/contributing/overview.md) for Geoconnex.
 
- The left editor contains raw JSON-LD output from pygeoapi. 
- The center editor contains the Jinja template that processes it.
- The right editor shows the final templated output. 

<div style={{fontSize: "1.0em", fontWeight: "bold", margin: "1em 0 0.5em 0"}}>
Notes on templating within pygeoapi
</div>

When pygeoapi applies a Jinja template, it considers the entire source JSON-LD to be the top-level key named `data`. Otherwise, the Jinja templating in pygeoapi is standard and follows expected patterns.

:::note

For info on getting pygeoapi running locally, see [step 2](/contributing/step-2/pygeoapi/deployment) of the contribution guide.

:::

</TabItem>
</Tabs>