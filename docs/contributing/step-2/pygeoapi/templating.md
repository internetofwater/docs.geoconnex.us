---
title: Creating landing pages via templating
sidebar_position: 2
---

# Creating pygeoapi landing pages via templating

:::tip
It is recommended to take a look at [the geoconnex JSON-LD reference](../../../reference/data-formats/jsonld/overview.md) or the [pygeoapi docs](https://docs.pygeoapi.io/en/latest/html-templating.html) before beginning to template your data. 
:::

Pygeoapi can leverage Jinja templates to change the structure of the JSON data output by your API. 
- Templating is needed in order to change the default JSON-LD output by pygeoapi into either the [location-oriented](../../../reference/data-formats/jsonld/primer/location-oriented.md) or [dataset-oriented](../../../reference/data-formats/jsonld/primer/dataset-oriented.md) JSON-LD output format for Geoconnex.
- To add extra templates, open your [pygeoapi config file](https://docs.pygeoapi.io/en/latest/configuration.html) and create a new collection block that links to the new `item_template` you made for your JSON-LD `linked-data`. 




<details>
<summary>
Referring to your template in the pygeoapi config
</summary>

`my-custom-template-name.j2` refers to the name of your new template file.

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

</details>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="raw" label="Example JSON-LD output" default>

    This is an example of one provider. Place this within a pre-existing `collection` block in the `.yml` file.
  </TabItem>

  <TabItem value="template" label="An example custom jinja template">
  test
  </TabItem>

  <TabItem value="templated" label="Custom templated JSON-LD">
  test
  </TabItem>
</Tabs>
