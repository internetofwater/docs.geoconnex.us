---
sidebar_position: 1
---


# Building Geoconnex Web Resources

This section provides step-by-step guidance to build Geoconnex Web Resources, which should be an HTML webpage with a unique URL within which is embedded an JSON-LD document (see @sec-primer). See @sec-complete-examples for completed example documents to skip the step-by-step.

## Geoconnex JSON-LD elements

A Geoconnex JSON-LD document should be embedded in a human-readable website that is about either a **Location** or a **Dataset**. 
  - Documents about **Locations** should ideally include references to relevant **Hydrologic Features**, **Cataloging Features**, and **Datasets**. 
  - Documents about **Datasets** *must* include references to one or more relevant Reference **Monitoring Locations** or **Hydrologic Features** or **Cataloging Features**, or declare their spatial coverage.

### Context 

Geoconnex JSON-LD documents can have varying contexts. However, there are several vocabularies other than `schema.org` that mqy be useful, depending on the type of location and dataset being described and the level of specificity for which metadata is produced by the data provider. The example context below can serve as general-purpose starting point, although simpler contexts may be sufficient for many documents:

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

-   `@vocab` specifies [`schema`](https://schema.org/) as the default vocabulary from https://schema.org

-   [`xsd`](https://www.w3.org/TR/xmlschema-2/) is a general web-enabled data types vocabulary (e.g., text vs number vs. datetime)

-   [`rdfs`](https://www.w3.org/TR/rdf12-schema/) is a general vocabulary for basic relationships

-   [`dc`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#) is the [Dublin Core](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/) vocabulary for general information metadata attributes

-   [`dcat`](https://www.w3.org/ns/dcat#) is the [Data Catalog (DCAT) Vocabulary](https://www.w3.org/TR/vocab-dcat-3), a vocabulary for dataset metadata attributes

-   [`freq`](http://purl.org/cld/freq/) is the [Dublin Core Collection Frequency Vocabulary](https://www.dublincore.org/specifications/dublin-core/collection-description/frequency/), a vocabulary for dataset temporal resolution and update frequency

-   [`qudt-units`](https://www.qudt.org/doc/DOC_VOCAB-UNITS.html) provides standard identifiers for units (e.g. [cubic feet per second](https://qudt.org/vocab/unit/FT3-PER-SEC))

-   [`qudt-quantkinds`](https://www.qudt.org/doc/DOC_VOCAB-QUANTITY-KINDS.html) provides ids for general phenomena (e.g. [Volume flow rate](https://qudt.org/vocab/quantitykind/VolumeFlowRate)) which may be measured in various units

-   [`gsp`](http://defs.opengis.net/vocprez/object?uri=http://www.opengis.net/def/function/geosparql) provides ids for spatial relationships (e.g. intersects)

-   [`odm2var`](http://vocabulary.odm2.org/variablename) is a supplement to `qudt-quantkinds`, and includes ids for many variables relevant to water science and management (e.g. [turbidity](http://vocabulary.odm2.org/variablename/turbidity/))

-   [`odm2varType`](http://vocabulary.odm2.org/variabletype/) is a supplement to `odm2var` that includes ids for large groupings of variables (e.g. [Water Quality](http://vocabulary.odm2.org/variabletype/WaterQuality/))

-   [`hyf`](https://www.opengis.net/def/schema/hy_features/hyf/) provides ids for surface water hydrology concepts (e.g. [streams](https://defs.opengis.net/vocprez/object?uri=https%3A//www.opengis.net/def/schema/hy_features/hyf/HY_River))

-   [`skos`](https://www.w3.org/TR/swbp-skos-core-spec/) provides general properties for relating different concepts (e.g. broader, [narrower,](https://www.w3.org/2009/08/skos-reference/skos.html#narrower) exact Match)

-   [`ssn`](https://www.w3.org/TR/vocab-ssn/) and `ssn-system` provide ids for aspects of observations and measurement (e.g. measurement methods)

### Reference Features 

Embedding links to URIs of Reference Features are the best way to ensure that your data can be related to other data providers' data. URIs for reference features are available from [the Geoconnex reference feature server](https://reference.geoconnex.us/collections). Reference features can be one of three types:

-   **Monitoring Locations** which are common locations that many organizations might have data about such as a streamgage station e.g. https://geoconnex.us/ref/gages/1143822
-   **Hydrologic Features** which are common specific features of the hydrologic landscape that many organizations have data about. These could include confluence points, aquifers, stream segments and river mainstems and named tributaries, e.g. https://geoconnex.us/ref/mainstems/29559>.
-   **Cataloging Features** which are larger area units that are commonly used to group and filter data, such as [HUCs](https://geoconnex.us/ref/hu04/0308)[^1], [states](https://geoconnex.us/ref/states/48)[^2], [counties](https://geoconnex.us/ref/counties/37003)[^3], PLSS grids, public agency operating districts, etc.

[^1]: https://geoconnex.us/ref/hu04/0308

[^2]: https://geoconnex.us/ref/states/48

[^3]: https://geoconnex.us/ref/counties/37003

## Location or Dataset oriented?

Depending on what kind of resource i.e. (location or dataset) and the level of metadata you have available to publish, you can use different elements of the `@context` or use Reference Features in various ways. 

There are two basic patterns to think about:

1.  `Location-oriented` webpages that include a catalog of parameters and periods of record for which there is data about the location. This pattern may be suitable where data can be accessed separately for each location and possibly for each parameter for each location. This is typical of streamgages, monitoring wells, water diversions, reservoirs, regulated effluent discharge locations, etc. where there is an ongoing monitoring or modeling program that includes data collection or generation for multiple parameters. The Monitor My Watershed Site pages published by the [Stroud Center](https://stroudcenter.org) are an example of this pattern. At [this page](https://monitormywatershed.org/sites/RH_MD/), one finds a variety of information about a specific location, such as that location's identifier and name and a map of where it is. In addition there is information about which continuous sensor and field water quality sample data are available about the location, and links to download these data.

2.  `Dataset-oriented` webpages that tag which locations are relevant to the dataset described at a given page. This pattern may be suitable for static datasets where data was collected or modeled for a consistent set of parameters for a pre-specified research question and time period across one or more locations, and where it would not make sense to publish separate metadata for the parts of the dataset that are relevant to each individual feature and parameter. This is typical of datasets created for, and published in association withm scientific and regulatory studies. [This dataset record](https://www.hydroshare.org/resource/11dd1840fe6a48abb9a33380ecaa6e1d/) published on [CUAHSI](https://cuahsi.org)'s [Hydroshare](https://hydroshare.org) platform is an example, where there is a "Related Geospatial Features" section that explicitly identifies several features that the dataset has data about.

In some cases, it is possible to set up a web architecture that implements both patterns. For example, the [Wyoming State Engineer's Office Web Portal](https://seoflow.wyo.gov) conceptualizes a time series for a specific parameter at a specific location as a dataset. Thus, webpages exist for both [Locations](https://seoflow.wyo.gov/Data/Location/Summary/Location/06280300/Interval/Latest) and [Datasets](https://seoflow.wyo.gov/Data/DataSet/Summary/Location/06280300/DataSet/Discharge/Discharge/Interval/Latest), and they link to each other where relevant. In this case, it is only necessary to implement Geoconnex embedded JSON-LD at either the Location or Dataset level, although both could be done as well.

Having chosen one of the patterns, proceed to [location-oriented](@sec-loc) or [dataset-oriented](@sec-data) guidance to start building a JSON-LD document.
