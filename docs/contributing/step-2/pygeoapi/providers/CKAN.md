---
title: CKAN
---

# Ingesting data from CKAN into pygeoapi

1. To ingest CKAN data you must be using the [internetofwater/pygeoapi](https://github.com/internetofwater/pygeoapi) fork or another pygeoapi environment with the [cgs-earth/pygeoapi-plugins](https://github.com/cgs-earth/pygeoapi-plugins) package installed.
2. Create a new section in the `local.config.yml` config file
3. Fill in the values for `data` (the domain of the CKAN endpoint), `resource_id` (the CKAN resource id), `id_field` (the id of each feature) and `x_field` and `y_field` (the location for the geometry)


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

    This is an example of just the  provider section. Place this within a pre-existing `collection` block in the `.yml` file. For clarification on the general pattern of adding providers, read about the general pattern [here](/contributing/step-2/pygeoapi/providers/#the-general-pattern-for-adding-a-new-data-endpoint).

    ```yml local.config.yml
    providers:
      - type: feature
        name: CKAN
        data: https://catalog.newmexicowaterdata.org/api/3/action/datastore_search
        resource_id: 08369d21-520b-439e-97e3-5ecb50737887
        id_field: _id
        x_field: LONDD
        y_field: LATDD
```

