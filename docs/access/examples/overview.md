---
sidebar_position: 1
---

# Overview

In this section we demonstrate how to use the Geoconnex Reference Feature server API. We'll explore various use cases for working with hydrological and related spatial data. These use cases can be groups into three categories:

1.  Finding identifiers and spatial geometries for real-world features
2.  Finding features that are hydrologically related to a feature of interest (if that information is available)
3.  Finding datasets related to a feature of interest

:::tip

The R examples can also be found, formatted as one longer Quarto notebook, [here](https://kyleonda.quarto.pub/using-the-geoconnex-reference-feature-server-with-r/#intersection-by-url-reference)

:::


The Geoconnex reference feature server implements the OGC API - Features specification, and its full API documentation is available [here](https://reference.geoconnex.us/openapi) for those who wish to explore its capabilities further than what is demonstrated in these examples.

Throughout all examples, we will be using the following libraries/constants:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="lang">
<TabItem value="r" label="R">

```r
library(sf)
library(dplyr)
library(httr)
library(mapview)
library(jsonlite)
library(knitr)
library(DT)
base_url <- "https://reference.geoconnex.us"
```

</TabItem>
<TabItem value="py" label="Python">

```py
import requests
import pandas as pd
import urllib.parse
import requests
import geopandas as gpd
import folium
base_url = "https://reference.geoconnex.us"
```

</TabItem>
</Tabs>

### Other useful resources

Although we do not use it in these examples, [HyRiver](https://docs.hyriver.io/) provides a wrapper over the Geoconnex reference feature server and allows for queries by spatial areas, by ID, and using CQL filters. Documentation for using HyRiver with Geoconnex can be found [here](https://docs.hyriver.io/examples/notebooks/geoconnex.html).