---
title: Creating landing pages via templating
sidebar_position: 2
---


:::tip
It is recommended to take a look at [the geoconnex JSON-LD reference](../../../reference/data-formats/jsonld/overview.md) before beginning to template your data. 
:::

Pygeoapi can leverage Jinja templates to change the structure of the data output by your API. More documentation for templating can be found within the [pygeoapi docs](https://docs.pygeoapi.io/en/latest/html-templating.html).

Templating is needed in order to change the default JSON-LD output by pygeoapi into either the [location-oriented](../../../reference/data-formats/jsonld/primer/location-oriented.md) or [dataset-oriented](../../../reference/data-formats/jsonld/primer/dataset-oriented.md) JSON-LD output format for Geoconnex.

To add extra templates, open your [pygeoapi config file](https://docs.pygeoapi.io/en/latest/configuration.html) and create a new collection block that links to the new `item_template` you made for your JSON-LD `linked-data`. 

An example could be something like the following, where `my-custom-template-name.j2` is the name of your new template file.

```yml title="local.config.yml"
 MyNamespace/MyData:
    type: collection
    title: MyData
    description: MyData is exposed as a collective effort by MyOrganization
    keywords:
      - MyOrganization
    linked-data:
    // highlight-next-line
        item_template: my-custom-template-name.j2
```



Notice how `"@id"` is the URL for the API call. This can be configured to be an exteral URI instead, such as those [minted with geoconnex.us](../../step-3/minting.md). You can then add these identifiers as a field in your data, whether in a local file or at an ESRI or CKAN api endpoint, and then specify this field as the `uri_field:` in the pygeoapi configuration yml file in the `providers:` block, like so:

```yaml
demo-ckan:
  type: collection
  title: geoconnex landing page demo (CKAN web service)
  description: Demonstration Geoconnex Landing Pages (from CKAN REST service source)
  keywords:
    - Existing Sites
  template: jsonld/hydrologic-location.jsonld
  links:
    - type: application/html
      rel: canonical
      title: data source
      href: https://data.ca.gov/dataset/gsp-monitoring-data/resource/72612518-e45b-4900-9cab-72b8de09c57d
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
      name: CKAN
      data: https://data.ca.gov/api/3/action/datastore_search?resource_id=72612518-e45b-4900-9cab-72b8de09c57d
      id_field: EXISTING_INFO_ID
      uri_field: EXAMPLE_URI_FIELD_RENAME_AS_NECESSARY
      x_field: LONGITUDE
      y_field: LATITUDE
```