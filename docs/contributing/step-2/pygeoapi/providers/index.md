# Ingesting data from common providers into pygeoapi

Once we have [pygeoapi setup](../deployment.md), we can use it to ingest data from common providers and expose it via the endpoint. 

:::note 


Becuase we are using the [internetofwater/pygeoapi](https://github.com/internetofwater/pygeoapi) fork, it includes feature providers for:
- the ESRI FeatureServer
-  the CKAN Data API
- the SODA API
- Geopandas
- SPARQL
- and more

It also includes modifications that enable the injection of custom templated JSON-LD into the script headers of the HTML pages. Both the HTML pages and JSON-LD responses are generated using jinja templates.

:::tip

View the [pygeoapi-geoconnex-examples](https://github.com/cgs-earth/pygeoapi-geoconnex-examples) repo for sample code that demonstrates how this is done in a test application.

:::


### Customization Steps

There are two main steps to add an additional provider into your pygeoapi endpoint

#### 1. Create a new section in the local pygeoapi config file that corresponds to your new collection

#### 2. [Create a template](../templating.md) for the new collection that specifies how to map the data to JSON-LD





