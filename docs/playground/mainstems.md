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
      <h2> Mainstem Association Playground </h2>
      Associating vector features to <a href="https://en.wikipedia.org/wiki/Drainage_basin"> hydrologic catchments </a> and their associated mainstem rivers are essential part of the Geoconnex system. This playground allows you to explore catchments around the United States and find their associated mainstem rivers. By clicking on a point, it will load all catchments in a bbox around the area. By selecting a particular catchment, it will load the associated mainstem river as a red line on the map. 

      The map displays a link to the URI of the Geoconnex PID for the mainstem as well as a series of properties from the original NHDPlus dataset that may be useful for exploration.

      <b>Note, not all catchments have an associated mainstem.</b> This is since the original NHDPlus dataset is not always high resolution enough to associate smaller hydrological features. Future releases of the dataset will increase resolution and add more associations. For more details on NHDPlus and how the data is being sourced, read the [mainstem association documentation](../about/system-architecture/mainstems.md).
  </TabItem>
</Tabs>