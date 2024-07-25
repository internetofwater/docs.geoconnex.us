# Ingesting data from common providers into pygeoapi

The pygeoapi fork we [previously setup](../deployment.md) makes it easier to publish water data with pygeoapi. 

In addition to the [default feature providers](https://docs.pygeoapi.io/en/latest/data-publishing/ogcapi-features.html) in pygeoapi core, the [internetofwater/pygeoapi](https://github.com/internetofwater/pygeoapi) fork includes feature providers for:
- the ESRI FeatureServer
-  the CKAN Data API
- the SODA API
- Geopandas
- SPARQL

It also includes modifications that enable the injection of custom templated JSON-LD into the script headers of the HTML pages. Both the HTML pages and JSON-LD responses are generated using jinja templates.

:::tip

View the [pygeoapi-geoconnex-examples](https://github.com/cgs-earth/pygeoapi-geoconnex-examples) repo for sample code that demonstrates how this is done in a test application.

:::


### Customization Overview

There are two main steps to add an additional provider into your pygeoapi endpoint

1. Create a new section in the local pygeoapi config file that corresponds to your new collection
1. [Create a template](../templating.md) for the new collection that specifies how to map the data to JSON-LD





