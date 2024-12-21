# Ingesting data from common providers into pygeoapi

Once we have [pygeoapi setup](../deployment.md), we can use it to ingest data from common providers and expose it via an API endpoint. 

For most common data providers there are already configurations created which allow you to ingest data into pygeoapi simply by editing a config file.

:::note 


Becuase we are using the [internetofwater/pygeoapi](https://github.com/internetofwater/pygeoapi) fork, we can also ingest feature data from:
- ESRI FeatureServer or MapServer
- CKAN Data API
- Socrata Open Data API
- Geopandas
- and more

pygeoapi allows the injection of custom templated JSON-LD into the script headers of the HTML pages. Both the HTML pages and JSON-LD responses are generated using Jinja templates to modify the response from pygeoapi and return richer content.

:::tip

View the [pygeoapi-geoconnex-examples](https://github.com/cgs-earth/pygeoapi-geoconnex-examples) repository for sample code that demonstrates how this is done in a test application.

:::


## The general pattern for adding a new data endpoint

pygeoapi providers are ingested by adding a `collection` within the `resources` block in the pygeoapi config file and specifying the provider `name`. For instance, if we are reading in a local `.geojson` file, the provider should have `name: GeoJSON`.

For full documentation on other providers and the pygeoapi config generally see the [pygeoapi docs](https://docs.pygeoapi.io/en/latest/data-publishing/ogcapi-features.html#providers)

After you have ingested your data into pygeoapi, you will need to [template it](../templating.md)

## Full example config for adding a new provider 

```yml local.config.yml
# We add our new collection into the resources block which should 
# already exist in the default configuration file
resources:

    # ... Rest of configuration file abbreviated for brevity

    #  We specify a new collection called lakes
    lakes:

        #  We describe its metadata
        type: collection
        title:
            en: Large Lakes
            fr: Grands Lacs
        description:
            en: lakes of the world, public domain
            fr: lacs du monde, domaine public
        keywords:
            en:
                - lakes
                - water bodies
            fr:
                - lacs
                - plans d'eau
        links:
            - type: text/html
              rel: canonical
              title: information
              href: http://www.naturalearthdata.com/
              hreflang: en-US

        #  We define the bounding box of the collection
        extents:
            spatial:
                bbox: [-180,-90,180,90]
                crs: http://www.opengis.net/def/crs/OGC/1.3/CRS84
            temporal:
                begin: 2011-11-11T11:11:11Z
                end: null  # or empty (either means open ended)

        # We define the provider for the collection and how the data will be ingested via pygeoapi
        providers:
            - type: feature
              name: GeoJSON
              data: tests/data/ne_110m_lakes.geojson
              id_field: id
              title_field: name

```


