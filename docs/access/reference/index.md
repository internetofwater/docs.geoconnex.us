---
sidebar_position: 2
---

import DocCardList from '@theme/DocCardList';

# Access Geoconnex reference features

Many organizations publish data about the same real-world things.  (e.g. watersheds, monitoring locations, dams, bridges, etc.)

The Geoconnex Reference Feature Server refers to these features with persistent identifiers so they are standardized across organizations. This allows users to ask:
- what is the identifier and spatial geometry for this thing? Does it exist?
- what features are hydrologically related?
- What datasets are available about a given feature?

The endpoint for the Geoconnex Reference Feature Server can be found at [reference.geoconnex.us](https://reference.geoconnex.us/) and is an implementation of OGC API - Features using pygeoapi. 

The reference feature server is used by the [Geoconnex graph](https://graph.geoconnex.us/) to link crawled data with consistent identifiers. 

<DocCardList />      

