---
sidebar_position: 1
---


# Building Geoconnex Web Resources

This section provides step-by-step guidance to build Geoconnex Web Resources, which should be an HTML webpage with a unique URL within which is embedded an JSON-LD document.

## Geoconnex JSON-LD elements

A Geoconnex JSON-LD document should be embedded in a human-readable website that is about either a **Location** or a **Dataset**. 
  - Documents about **Locations** should ideally include references to relevant **Hydrologic Features**, **Cataloging Features**, and **Datasets**. 
  - Documents about **Datasets** *must* include references to one or more relevant Reference **Monitoring Locations** or **Hydrologic Features** or **Cataloging Features**, or declare their spatial coverage.

### Context 

Geoconnex JSON-LD documents can have varying contexts. There are several vocabularies other than `schema.org` that may be useful, depending on the type of location and dataset being described and the level of specificity for which metadata is produced by the data provider. The example context below can serve as general-purpose starting point, although simpler contexts may be sufficient for many documents:

``` json
  "@context": {
    "@vocab": "https://schema.org/", 
    "xsd": "https://www.w3.org/TR/xmlschema-2/#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "dc": "http://purl.org/dc/terms/",
    "dcat": "https://www.w3.org/ns/dcat#",
    "freq": "http://purl.org/cld/freq/",
    "qudt": "http://qudt.org/schema/qudt/",
    "qudt-units": "http://qudt.org/vocab/unit/",
    "qudt-quantkinds": "http://qudt.org/vocab/quantitykind/",
    "gsp": "http://www.opengis.net/ont/geosparql#",
    "locType": "http://vocabulary.odm2.org/sitetype",
    "odm2var":"http://vocabulary.odm2.org/variablename/",
    "odm2varType": "http://vocabulary.odm2.org/variabletype/",
    "hyf": "https://www.opengis.net/def/schema/hy_features/hyf/",
    "skos": "https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType",
    "ssn": "http://www.w3.org/ns/ssn/",
    "ssn-system":  "http://www.w3.org/ns/ssn/systems/"
  }
```

#### Prefixes

The following table describes the JSON-LD context [prefixes](https://www.w3.org/TR/json-ld11/#dfn-prefix)  above which serve as base vocabularies used in Geoconnex. A `curl` command line is also provided to fetch a server preferred content-negotiated representation of the machine-readable vocabulary for each prefix delivered as JSON-LD, RDF Turtle, or RDF/XML RDF formats.  The table also provides links  to a human readable html document of each respective vocabulary that can be viewed in a web browser. 


| Prefix                | Description                                                                                                                                                                                                                     | Machine-Readable Content          | Documentation URL            |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|------------------------------|
| `@vocab`           | Core vocabulary for general web resource descriptions (names descriptions URLs etc.)                                                                                                                                    | `curl -L -H "Accept: application/ld+json" https://schema.org/version/latest/schemaorg-current-https.jsonld` | https://schema.org/docs/schemas.html |
| `xsd`              | XML Schema definitions for data types                                                                                                                                             | not available | https://www.w3.org/TR/xmlschema-11-2/ |
| `rdfs`             | RDF Schema vocabulary for basic RDF concepts                                                                                                                                                                             | `curl -L -H "Accept: application/ld+json"  http://www.w3.org/2000/01/rdf-schema#` | https://www.w3.org/TR/rdf-schema/|
| `dc`               | Dublin Core terms for metadata elements (temporal coverage conformance)                                                                              | `curl -L -H "Accept: text/turtle" http://purl.org/dc/terms/` | https://www.dublincore.org/specifications/dublin-core/dcmi-terms/ |
| `dcat`             |Data Catalog vocabulary for dataset descriptions                                                                                                    | `curl -L -H "Accept: application/ld+json"  https://www.w3.org/ns/dcat#` | https://www.w3.org/TR/vocab-dcat-3/ |
| `freq`             | Frequency codes for temporal patterns               | `curl -L -H "Accept: application/rdf+xml" http://purl.org/cld/freq/` | https://www.dublincore.org/specifications/dublin-core/collection-description/frequency/  |
| `qudt`            | Quantities Units Dimensions and Types vocabulary | `curl -L -H "Accept: text/turtle" http://qudt.org/schema/qudt/` | https://qudt.org/doc/DOC_SCHEMA-QUDT.html |
| `qudt-units`      | Standard units definitions  | `curl -L -H "Accept: text/turtle" http://qudt.org/vocab/unit/` | https://qudt.org/doc/DOC_VOCAB-UNITS.html |
| `qudt-quantkinds` | Quantity kinds (types of measurements)                                                                    | `curl -L -H "Accept: text/turtle" http://qudt.org/vocab/quantitykind/` | https://qudt.org/doc/DOC_VOCAB-QUANTITY-KINDS.html |
| `gsp`              | GeoSPARQL vocabulary for spatial data representation                                                                                                                                                                      | `curl -L -H "Accept: text/turtle" http://www.opengis.net/ont/geosparql#` | https://opengeospatial.github.io/ogc-geosparql/geosparql11/geo.html |
| `locType` | ODM2 vocabulary for site type classifications | `curl -L -H "application/rdf+xml" http://vocabulary.odm2.org/api/v1/sitetype/?format=skos` | http://vocabulary.odm2.org/sitetype/ |
| `odm2var`          | ODM2 vocabulary for variable names                                     | `curl -L -H "application/rdf+xml" http://vocabulary.odm2.org/api/v1/variablename/?format=skos` |  http://vocabulary.odm2.org/variablename/ |
| `odm2varType`      | ODM2 vocabulary for variable types                                                                    | `curl -L -H "application/rdf+xml" http://vocabulary.odm2.org/api/v1/variabletype/?format=skos` | http://vocabulary.odm2.org/variabletype/ |
| `hyf`              | HY_Features model for hydrologic features                                             | `curl -L -H "text/turtle" https://www.opengis.net/def/schema/hy_features/hyf/` | https://docs.ogc.org/is/14-111r6/14-111r6.html |
| `skos`             | Simple Knowledge Organization System for concept schemes                                                           | `curl -L -H  "Accept: application/rdf+xml" http://www.w3.org/2004/02/skos/core#` | https://www.w3.org/2009/08/skos-reference/skos.html |
| `ssn`              | Semantic Sensor Network ontology                                                                                                                          | `curl -L  -H  "Accept: text/turtle" http://www.w3.org/ns/ssn/` | https://www.w3.org/TR/vocab-ssn/ |
| `ssn-system` | Semantic Sensor Network system concepts | `curl -L  -H  "Accept: text/turtle" http://www.w3.org/ns/ssn/systems/` | https://www.w3.org/TR/vocab-ssn/#System-capabilities |

### Reference Features 

Embedding links to URIs of Reference Features are the best way to ensure that your data can be related to other data providers' data. URIs for reference features are available from [the Geoconnex reference feature server](https://reference.geoconnex.us/collections). Reference features can be one of three types:

-   **Monitoring Locations** which are common locations that many organizations might have data about such as a streamgage station e.g. https://geoconnex.us/ref/gages/1143822
-   **Hydrologic Features** which are common specific features of the hydrologic landscape that many organizations have data about. These could include confluence points, aquifers, stream segments and river mainstems and named tributaries, e.g. https://geoconnex.us/ref/mainstems/29559>.
-   **Cataloging Features** which are larger area units that are commonly used to group and filter data, such as [HUCs](https://geoconnex.us/ref/hu04/0308)[^1], [states](https://geoconnex.us/ref/states/48)[^2], [counties](https://geoconnex.us/ref/counties/37003)[^3], PLSS grids, public agency operating districts, etc.

[^1]: https://geoconnex.us/ref/hu04/0308

[^3]: https://geoconnex.us/ref/counties/37003

## Location or Dataset oriented?

Depending on what kind of resource i.e. (location or dataset) and the level of metadata you have available to publish, you can use different elements of the `@context` or use Reference Features in various ways. 

There are two basic patterns to think about:

1.  `Location-oriented` webpages that include a catalog of parameters and periods of record for which there is data about the location. This pattern may be suitable where data can be accessed separately for each location and possibly for each parameter for each location. This is typical of streamgages, monitoring wells, water diversions, reservoirs, regulated effluent discharge locations, etc. where there is an ongoing monitoring or modeling program that includes data collection or generation for multiple parameters. The Monitor My Watershed Site pages published by the [Stroud Center](https://stroudcenter.org) are an example of this pattern. At [this page](https://monitormywatershed.org/sites/RH_MD/), one finds a variety of information about a specific location, such as that location's identifier and name and a map of where it is. In addition there is information about which continuous sensor and field water quality sample data are available about the location, and links to download these data.

2.  `Dataset-oriented` webpages that tag which locations are relevant to the dataset described at a given page. This pattern may be suitable for static datasets where data was collected or modeled for a consistent set of parameters for a pre-specified research question and time period across one or more locations, and where it would not make sense to publish separate metadata for the parts of the dataset that are relevant to each individual feature and parameter. This is typical of datasets created for, and published in association withm scientific and regulatory studies. [This dataset record](https://www.hydroshare.org/resource/11dd1840fe6a48abb9a33380ecaa6e1d/) published on [CUAHSI](https://cuahsi.org)'s [Hydroshare](https://hydroshare.org) platform is an example, where there is a "Related Geospatial Features" section that explicitly identifies several features that the dataset has data about.

In some cases, it is possible to set up a web architecture that implements both patterns. For example, the [Wyoming State Engineer's Office Web Portal](https://seoflow.wyo.gov) conceptualizes a time series for a specific parameter at a specific location as a dataset. Thus, webpages exist for both [Locations](https://seoflow.wyo.gov/Data/Location/Summary/Location/06280300/Interval/Latest) and [Datasets](https://seoflow.wyo.gov/Data/DataSet/Summary/Location/06280300/DataSet/Discharge/Discharge/Interval/Latest), and they link to each other where relevant. In this case, it is only necessary to implement Geoconnex embedded JSON-LD at either the Location or Dataset level, although both could be done as well.

