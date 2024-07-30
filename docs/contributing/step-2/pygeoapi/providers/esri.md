---
title: ESRI Feature Service
---
# Ingesting data from ESRI Feature Services into pygeoapi

1. Create a new section in the `local.config.yml` config file

<!-- This data comes from  https://docs.pygeoapi.io/en/latest/data-publishing/ogcapi-features.html#providers via a CC license -->

2. specify the URL for the service layer in the data field.

    - `id_field` will often be `OBJECTID`, `objectid`, or `FID`.

3. If the map or feature service is not shared publicly, the username and password fields can be set in the configuration to authenticate into the service.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

    This is an example of just the  provider section. Place this within a pre-existing `collection` block in the `.yml` file. For clarification on the general pattern of adding providers, read about the general pattern [here](/contributing/step-2/pygeoapi/providers/#the-general-pattern-for-adding-a-new-data-endpoint).

    ```yml title="local.config.yml"
    providers:
        - type: feature
          name: ESRI
          data: https://sampleserver5.arcgisonline.com/arcgis/rest/services/NYTimes_Covid19Cases_USCounties/MapServer/0
          id_field: objectid
          time_field: date_in_your_device_time_zone # Optional time field
          crs: 4326 # Optional crs (default is EPSG:4326)
          username: username # Optional ArcGIS username
          password: password # Optional ArcGIS password
```

