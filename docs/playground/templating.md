---
title: "Jinja templating"
hide_title: true
---

import Playground from '@site/src/components/Playground';


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="play" label="Playground" default>
<Playground/>
</TabItem>
<TabItem value="help" label="Help and Info" >

## Templating Help

This page allows you to explore templating JSON-LD with Jinja so that it is easier to [contribute and expose your data](/docs/contributing/overview.md) for Geoconnex.

The left editor contains raw JSON-LD output from pygeoapi. The center editor contains the Jinja template that processes it. The right editor shows the final templated output. 

It is important to note that pygeoapi applies jinja templates in a way that is slightly different than standard.  The `properties` key is referred to as `data` turing templating. 
This playground is programmed to reflect that. For instance, in the default example in the editor, the use of `data["name"]` in the template actually ends up sourcing `properties["name"]`. 


</TabItem>
</Tabs>