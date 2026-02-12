---
sidebar_position: 4
title: "Features in Geoconnex"
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
import GeoconnexFeaturesMap from '@site/src/components/GeoconnexFeaturesMap';


<Tabs>
  <TabItem value="map" label="Map" default>
    <div style={{width: "100%", height: "80vh", border: "none"}}>
      <GeoconnexFeaturesMap />
    </div>
  </TabItem>

  <TabItem value="help" label="Help and Background Info">
      <h2> Geoconnex Features Playground </h2>
      This map is a playground for exploring the vector geospatial features in the Geoconnex system. To use it, click on a point on the map. The client will then make a request to the list of features and render them on the map.
      
      This playground is meant as a demonstration of the <a href="https://github.com/internetofwater/geoconnex-client-ts" target="_blank">geoconnex-client-ts</a>  libary for fetching and displaying geospatial features.  For discovering datasets within Geoconnex more generally, see the <a href="https://explorer.geoconnex.us/"> Geoconnex Explorer </a>.
  </TabItem>
</Tabs>