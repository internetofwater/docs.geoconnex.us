---
sidebar_position: 4
title: "Mainstem Association"
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
import MainstemsMap from '@site/src/components/MainstemsMap';


<Tabs>
  <TabItem value="map" label="Map" default>
    <div style={{width: "100%", height: "80vh", border: "none"}}>
      <MainstemsMap />
    </div>
  </TabItem>

  <TabItem value="help" label="Help and Background Info">
    <div style={{fontSize: "1.5em", fontWeight: "bold", margin: "1em 0 0.5em 0"}}>
    </div>
  </TabItem>
</Tabs>