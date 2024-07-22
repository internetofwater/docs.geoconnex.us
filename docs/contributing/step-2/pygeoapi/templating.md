---
title: Creating landing pages via templating
sidebar_position: 2
---


:::tip
It is recommended to take a look at [the geoconnex json-ld reference](../../../reference/data-formats/jsonld/overview.md) before beginning to template your data
:::

Pygeoapi can leverage jinja templates to quickly generate HTML landing pages for your entire dataset. More documentation for templating can be found on the [pygeoapi docs](https://docs.pygeoapi.io/en/latest/html-templating.html).

To add extra templates, open your [pygeoapi config file](https://docs.pygeoapi.io/en/latest/configuration.html) and create a new collection block that links to the new `item_template` you made for your JSON-LD `linked-data`. 

An example could be something like the following.

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