---
title: ESRI
---


# Ingesting ESRI Data into pygeoapi


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