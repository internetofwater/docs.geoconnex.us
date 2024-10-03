---
sidebar_position: 1
---

# Overview

In this section we demonstrate how to use the Geoconnex Reference Feature server API. We'll explore various use cases for working with hydrological and related spatial data. These use cases can be groups into three categories:

1.  Finding identifiers and spatial geometries for real-world features
2.  Finding features that are hydrologically related to a feature of interest (if that information is available)
3.  Finding datasets related to a feature of interest

:::tip

The R examples can also be found formatted as one longer Quarto notebook [here](https://kyleonda.quarto.pub/using-the-geoconnex-reference-feature-server-with-r/#intersection-by-url-reference)

:::

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

### Useful resources for Geoconnex queries

The Geoconnex reference feature server implements the OGC API - Features specification, and its full API documentation is available [here](https://reference.geoconnex.us/openapi) for those who wish to explore its capabilities further than what is demonstrated in these examples.

Although we do not use them in these examples, there are additional client libraries that provide wrappers over the Geoconnex reference feature server API for easier querying.
- [HyRiver](https://docs.hyriver.io/) provides a Python client library and allows for queries by spatial areas, by ID, and using CQL filters. Documentation for using HyRiver with Geoconnex can be found [here](https://docs.hyriver.io/examples/notebooks/geoconnex.html).
- [nhdplusTools](https://doi-usgs.github.io/nhdplusTools/index.html) is an R package for accessing and working with the NHDPlus and other US hydrographic data. It contains helper functions for working with Geoconnex.
    - [get_geoconnex_reference()](https://doi-usgs.github.io/nhdplusTools/reference/get_geoconnex_reference.html) queries the geoconnex reference feature server for features of interest.
    - [discover_geoconnex_reference()](https://doi-usgs.github.io/nhdplusTools/reference/get_geoconnex_reference.html) queries the geoconnex.us reference feature server for available layers and attributes.

    
