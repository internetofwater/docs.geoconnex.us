---

sidebar_position: 1
---

# Reference Features

It is possible to view example features for Geoconnex before they are ingested into the knowledge graph. The source for these features be found within the [the ref namespace within the geoconnex.us repo](https://github.com/internetofwater/geoconnex.us/tree/master/namespaces/ref). You can dynamically explore individual features within the web portal at [reference.geoconnex.us](https://reference.geoconnex.us/)

## Explore Example Reference Features

To view the collection of all the items in HUC2 watershed one can visit [https://reference.geoconnex.us/collections/hu02/items](https://reference.geoconnex.us/collections/hu02/items). This displays a landing page for the dataset, but if you [query the endpoint with `?f=jsonld` at the end](https://reference.geoconnex.us/collections/hu02/items?f=jsonld), it will output the JSON-LD needed for the geoconnex crawler. 
