---
sidebar_position: 3
title: "JSON-LD SHACL Validation"
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
import ShaclPlayground from '@site/src/components/ShaclPlayground';


<Tabs>
  <TabItem value="search" label="Search" default>
    <div style={{width: "100%", height: "80vh", border: "none"}}>
      <ShaclPlayground />
    </div>
  </TabItem>

  <TabItem value="help" label="Help and Background Info">
    <div style={{fontSize: "1.5em", fontWeight: "bold", margin: "1em 0 0.5em 0"}}>
      Check conformance of your JSON-LD data against the Geoconnex SHACL shape
    </div>
    This page allows you to validate arbitrary JSON-LD data against the Geoconnex SHACL shape. Paste your JSON-LD data into the left text box and click `Run SHACL Validation`. The results will be displayed in the validation report box below. 

    The backend service used for SHACL validation can also be used locally and pulled as a docker container. See the [nabu repo](https://github.com/internetofwater/nabu) for more information.

    For more detail about SHACL, view the [SHACL documentation](/reference/data-formats/shacl_shape) section.  
  </TabItem>
</Tabs>