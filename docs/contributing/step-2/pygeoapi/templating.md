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

```yml
 MyNamespace/MyData:
    type: collection
    title: MyData
    description: MyData is exposed as a collective effort by 
    keywords:
      - SensorThings
      - MyOrganization
    linked-data:
        item_template: my-custom-template-name.j2
```