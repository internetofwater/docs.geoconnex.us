---
title: Socrata
---

# Ingesting data from Socrata into pygeoapi

1. Create a new section in the `local.config.yml` config file

2. Fill in the values for `data` (the domain of the SODA endpoint), `resource_id` (the 4x4 resource id pattern), `geom_field` (the location for the geometry) and `token` an optional param to pass an app token to Socrata


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

    This is an example of just the  provider section. Place this within a pre-existing `collection` block in the `.yml` file. For clarification on the general pattern of adding providers, read about the general pattern [here](/contributing/step-2/pygeoapi/providers/#the-general-pattern-for-adding-a-new-data-endpoint).

    ```yml local.config.yml
    providers:
        - type: feature
          name: Socrata
          data: https://soda.demo.socrata.com/
          resource_id: emdb-u46w
          id_field: earthquake_id
          geom_field: location
          time_field: datetime # Optional time_field for datetime queries
          token: my_token # Optional app token
```

