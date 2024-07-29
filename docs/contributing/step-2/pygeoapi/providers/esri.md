---
title: ESRI Feature Service
---


# Ingesting ESRI Data into pygeoapi


# Step 1: Create a new section in the `local.config.yml` config file

<!-- This data comes from  https://docs.pygeoapi.io/en/latest/data-publishing/ogcapi-features.html#providers via a CC license -->

- To publish an ESRI Feature Service or Map Service specify the URL for the service layer in the data field.

    - `id_field` will often be `OBJECTID`, `objectid`, or `FID`.

- If the map or feature service is not shared publicly, the username and password fields can be set in the configuration to authenticate into the service.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="brief" label="An example provider config" default>

    This is an example of one provider. Place this within a pre-existing `collection` block in the `.yml` file.

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
  </TabItem>

  <TabItem value="full" label="An example full collection (also contains a provider section)">

    This is an example of a full collection. It includes both the ESRI provider info and the referenec to the `template` file you will use for outputting your JSON-LD.

```yml title="local.config.yml"
# ABBREVIATED FOR BREVITY ...
demo-esri:
    type: collection
    title: geoconnex landing page demo (ESRI web service)
    description: Demonstration Geoconnex Landing Pages (from ESRI REST service source)
    keywords:
        - Existing Sites
    // highlight-next-line
    template: jsonld/hydrologic-location.jsonld
    links:
        - type: application/html
            rel: canonical
            title: data source
            href: https://data.ca.gov/dataset/gsp-monitoring-data/resource/ab3f524c-850f-40e4-b27a-6cae7154add5
            hreflang: en-US
    extents:
        spatial:
            bbox: [-170,15,-51,72]
            crs: http://www.opengis.net/def/crs/OGC/1.3/CRS84
        temporal:
            begin: null
            end: null
    providers:
        - type: feature
            name: ESRI
            data: https://services.arcgis.com/aa38u6OgfNoCkTJ6/ArcGIS/rest/services/GSP_Monitoring_Data/FeatureServer/0
            id_field: EXISTING_INFO_ID
```
  </TabItem>
</Tabs>


## Step 2: Creating a template
