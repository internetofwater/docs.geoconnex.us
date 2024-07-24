---

sidebar_position: 3
---
# Dataset-oriented 

The purpose of dataset-oriented JSON-LD output is to give enough information about the data available and the area, locations, or features that it is relevant to that a water data user would be able to quickly determine whether and how to download the data after reading. 
* In this page we will refer to a sample [data resource about treated water demand that has been published at HydroShare](https://www.hydroshare.org/resource/4cf2a4298eca418f980201c1c5505299/) as an example for the type of content to put in dataset-oriented Geoconnex landing page web resources
* We will show how to map this content to embedded JSON-LD documents.

<!-- This dataset-oriented web resource includes this type of information

-   "This is my URI (which is a DOI-URL): https://geoconnex.us/ref/monitoring-location/08282300" [^13]

-   "This is my permanent identifier, which is a DOI": [^14]

-   "This is my URL https://www.hydroshare.org/resource/4cf2a4298eca418f980201c1c5505299" [^15]

-   "My creator is name"

-   "I am provided by HydroShare"

-   "My spatial coverage is the bounding box `"35.5463 -79.1235 36.0520 -78.3765"`"[^16]

-   "I have data between January 1, 2002 and December 31, 2020" [^17]

-   "My data is at a `1` `month` time step frequency" [^18]

-   "I am about the following features":[^19].

    -   [Raleigh Public Water System](https://geoconnex.us/ref/pws/NC0392010)
    -   [Cary Public Water System](https://geoconnex.us/ref/pws/NC0392020)
    -   [Durham Public Water System](https://geoconnex.us/ref/pws/NC0332010)
    -   [Apex Public Water System](https://geoconnex.us/ref/pws/NC0392045)
    -   [Orange Water and Sewer Authority](https://geoconnex.us/ref/pws/NC0368010)

-   "I have the following variables":

    -   Monthly Water demand measured in units of averaged millions of gallons per day
    -   Historic Mean monthly water demand over the period of record measured in units of millions of gallons per day
    -   The monthly water demand divided by historic mean monthly water demand, as a percent

-   "You can download me [here](https://www.hydroshare.org/hsapi/resource/4cf2a4298eca418f980201c1c5505299/) on HydroShare as a zipped csv file"

-   "I am accessible for free subject to this [license](http://creativecommons.org/licenses/by/4.0/).

[^13]: If a permanent identifier like a DOI is available

[^14]: for identifiers that are not HTTP URLs

[^15]: The actual URL where the resource

[^16]: Spatial coverage revers to maximum area extent of where data is about. For Geoconnex purposes, this is not necessary if the "about" elements with links to Geoconnex Reference Features is used

[^17]: refers to the first and last time for which data is available. It can be specified using [ISO 8061 interval format](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals) (`YYYY-MM-DD/YYYY-MM-DD`, with the start date first and the end date after the `/` . It can also include time like so `YYYY-MM-DDTHH:MM:SS/YYYY-MM-DDTHH:MM:SS` . If the dataset has no end date, as there is an active monitoring program, then this can be indicated like so `YYYY-MM-DD/..`

[^18]: refers to the minimum intended time spacing between observations in the case of regular time series data

[^19]: These should be geoconnex reference feature URIs. If the locations the dataset is about is not within https://reference.geoconnex.us/collections, then consider [creating location-based resources and minting geoconnex identifiers](https://github.com/internetofwater/geoconnex.us/blob/master/CONTRIBUTING.md). If the dataset is extensive over a vector feature spatial fabric, like all Census Tracts or HUC12s or NHD Catchments, then this can be a reference to a single reference fabric dataset rather than an array of identifiers for every single feature. If the dataset is extensive over an area but has no particular tie to a particular reference feature set, like a raster dataset, then this can be omitted. -->


Much is similar to the [guidance for location-oriented web resources](./location-oriented.md), so here we focus on the differences.


:::note

HydroShare automatically embeds JSON-LD. The JSON-LD examples below vary from HydroShare's default content to illustrate optional elements that would be useful for Geoconnex that are not currently implemented in HydroShare.

:::

## 1. Identifiers, provenance, license, and distribution.

The first part of a dataset-oriented JSON-LD document is the metadata about the dataset.

For basic identifying and descriptive information, [science-on-schema.org](https://github.com/ESIPFed/science-on-schema.org/blob/main/examples/dataset/minimal.jsonld) has appropriate guidance. In this case, note that a specific file download URL has been provided rather than an API endpoint, and that `dc:conformsTo` points to a data dictionary that is supplied at the same web resource.

``` json
{
  "@context": {
    "@vocab": "https://schema.org/", 
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "dc": "http://purl.org/dc/terms/",
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
  },
  "@type": "Dataset",
  "@id": "https://doi.org/10.4211/hs.4cf2a4298eca418f980201c1c5505299",
   "provider": {
    "url": "https://hydroshare.org",
    "@type": "ResearchOrganization",
    "name": "HydroShare"
  },
    "creator": {
    "@type": "Person",
    "affiliation": {
                    "@type": "Organization",
                    "name": "Internet of Water;Center for Geospatial Solutions;Lincoln Institute of Land Policy"
                  },
                  "email": "konda@lincolninst.edu",
                  "name": "Kyle Onda",
                  "url": "https://www.hydroshare.org/user/4850/"
            },
  "identifier": "doi:hs.4cf2a4298eca418f980201c1c5505299",
  "name": "Geoconnex Dataset Example: Data for Triangle Water Supply Dashboard",
  "description": "This is a dataset meant as an example of dataset-level schema.org markup for https://geoconnex.us. It uses as an example data from the NC Triangle Water Supply Dashboard, which collects and visualizes finished water deliveries by water utilities to their service areas in the North Carolina Research Triangle area",
  "url": "https://www.hydroshare.org/resource/4cf2a4298eca418f980201c1c5505299",
  "keywords": ["water demand", "water supply", "geoconnex"],
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "isAccessibleForFree": "true",
     "distribution": [                                                                                       
     {
      "@type": "DataDownload", 
      "name": "HydroShare file URL", 
      "contentUrl": "https://www.hydroshare.org/resource/4cf2a4298eca418f980201c1c5505299/data/contents/demand_over_time.csv",    
      "encodingFormat": ["text/csv"],                                                        
      "dc:conformsTo": "https://www.hydroshare.org/resource/4cf2a4298eca418f980201c1c5505299/data/contents/dataDictionary.xlsx"   
      },
```

## 2. Variables and Methods

The second section of the JSON-LD output for a dataset-oriented document specifies which variables are being measured in the dataset. In the example below, multiple `variableMeasured` are specified using a nested array. Other differences to point out:

-   The unit of "million gallons per day" is not available from the QUDT units vocabulary. It is in the [ODM2 units codelist](http://vocabulary.odm2.org/units/), so we populate `unitCode` with the url listed there.
-   The [`measurementMethod`](./reference.md#specific-geoconnex-json-ld-properties) for both variables, which are simply different aggregation statistics for the same variable, do not have known web resources or specific identifiers available, and so use `description` to clarify the method. 

``` json
  // ABBREVIATED FOR BREVITY
  // ..., 
   "variableMeasured": [
   {                                                                                      
   "@type": "PropertyValue",                                                                                 
   "name": "water demand",                                                                                    
   "description": "treated water delivered to distribution system",                                                   
   "propertyID": "http://vocabulary.odm2.org/variablename/waterUsePublicSupply/",                                                  
   "url": "http://vocabulary.odm2.org/variablename/waterUsePublicSupply/",     
   "unitText": "million gallons per day",
   "qudt:hasQuantityKind": "qudt-quantkinds:VolumeFlowRate",                                                  
   "unitCode": "http://his.cuahsi.org/mastercvreg/edit_cv11.aspx?tbl=Units&id=1125579048",        
   "measurementTechnique": "observation",                                                      
      "measurementMethod": {                                                                                     
        "name":"water meter",
        "description": "metered bulk value, accumlated over one month",
        "url": "https://www.wikidata.org/wiki/Q268503"                                                                   
        }                                                                                                        
      }, 
    {                                                                                      
      "@type": "PropertyValue",                                                                                
      "name": "water demand (monthly average)",                                                                                     
      "description": "average monthly treated water delivered to distribution system",                                                   
      "propertyID": "http://vocabulary.odm2.org/variablename/waterUsePublicSupply/",                                                   
      "url": "http://vocabulary.odm2.org/variablename/waterUsePublicSupply/",                                              
      "unitText": "million gallons per day",                                                                       
      "qudt:hasQuantityKind": "qudt-quantkinds:VolumeFlowRate",                                                
      "unitCode": "http://his.cuahsi.org/mastercvreg/edit_cv11.aspx?tbl=Units&id=1125579048",                                            
      "measurementTechnique": "observation",                                                  
      "measurementMethod": {                                                                               
        "name":"water meter",                                                   
        "description": "metered bulk value, average accumlated over each month for multiple years",                   
        "url": "https://www.wikidata.org/wiki/Q268503"                                                             
        }                                                                                                    
      },
    ],
   "temporalCoverage": "2002-01-01/2020-12-31",                                                                     
   "ssn-system:frequency": {                                                                                
     "value": "1",                                                                                        
     "unitCode": "qudt-units:Month"                                                                         
   },
   
```

## 3. Geoconnex Reference Feature Links and Spatial Coverage

The third and final section is to specify the spatial coverage of the dataset.
:::note

Unlike the location-based example, where a location is explicitly the `subjectOf` the dataset, here, the dataset must be described as being `about` certain features. If the dataset is not explicitly about any discrete features, such as raster datasets, then a Spatial Coverage should be specified.

:::

Using the `about` construction, a single geoconnex URI or an array of multiple can be constructed. In the below example, multiple are used. Note the nesting of nodes within the array so that each URI has an `@id` keyword and is `@type` `Place`. In this example, URIs from the geoconnex [reference features set for Public Water Systems](https://reference.geoconnex.us/collections/pws) are used.

``` json
// ABBREVIATED FOR BREVITY
// ...,
"about": [
      {
        "@id": "https://geoconnex.us/ref/pws/NC0332010",
        "@type": "Place"
      },
    
      {
        "@id": "https://geoconnex.us/ref/pws/NC0368010",
        "@type": "Place"
      },
    
      {
        "@id": "https://geoconnex.us/ref/pws/NC0392010",
        "@type": "Place"
      },
    
      {
        "@id": "https://geoconnex.us/ref/pws/NC0392020",
        "@type": "Place"
      },
      
      {
        "@id": "https://geoconnex.us/ref/pws/NC0392045",
        "@type": "Place"
      }
    ],
    // ...
```

To assist in finding reference features, https://reference.geoconnex.us allows queries following the [OGC-API Features](https://ogcapi.ogc.org/features/) API standard and the CQL [Common Query Language standard](https://portal.ogc.org/files/96288).

For example, to find the Geoconnex URI for the Raleigh public water system (PWS), we can construct the URL:

-   CQL filter API endpoint for the PWS feature collection https://reference.geoconnex.us/collections/pws/items
-   filter for name field `pws_name`: https://reference.geoconnex.us/collections/pws/items?filter=pws_name
-   filter for a name that includes "Raleigh": [https://reference.geoconnex.us/collections/pws/items?filter=pws_name ILIKE '%Raleigh%'](https://reference.geoconnex.us/collections/pws/items?filter=pws_name%20ILIKE "%Raleigh%")

Sometimes it is impossible to use feature URIs because the relevant specific features are not available from https://reference.geoconnex.us/collections. If so, feel free to [submit an issue to the geoconnex.us github repository](https://github.com/internetofwater/geoconnex.us/issues/new/choose) requesting a reference feature set.

Sometimes it is impractical to list all applicable reference features, whether or not they are in https://reference.geoconnex.us or another source. This is common for comprehensive datasets that are all about an entire reference dataset or other another dataset like a hydrofabric, such as datasets summmarizing values to U.S. Counties, or the National Water Model generating values for all NHDPlusV2 COMID flowlines. In this case it is best to declare that the Dataset is [isBasedOn](https://schema.org/isBasedOn) the source geospatial fabric. For example, if the example dataset were about all public water systems instead of just the 5 listed, instead of `about`, we should specify an identifier, name, description, and any URLs for other resources that describe the source fabric and how to interpret it:

``` json
// ABBREVIATED FOR BREVITY
// ...,
"isBasedOn": {
  "@id": "https://www.hydroshare.org/resource/9ebc0a0b43b843b9835830ffffdd971e/",
  "name": "U.S. Community Water Systems Service Boundaries, v4.0.0"
  "description": "This is a layer of water service boundaries for 45,973 community water systems that deliver tap water to 307.7 million people in the US.",
  "url": "https://github.com/SimpleLab-Inc/wsb"
},
// ...
```

Sometimes there are no particular features that a dataset is explicitly about. This is common with remote sensing raster data. In this case, it is best to specify a `spatialCoverage` polygon using WKT encoded geometry:

``` json
  "spatialCoverage": {
    "@type": "Place",
    "gsp:hasGeometry": {
      "@type": "http://www.opengis.net/ont/sf#MultiPolygon",
      "gsp:asWKT": {
        "@type": "http://www.opengis.net/ont/geosparql#wktLiteral",
        "@value": "MULTIPOLYGON (((-85.67957299999999 32.799514, -85.679637 32.822002999999995, -85.67199699999999 32.822063, -85.66421 32.821711, -85.647989 32.82224, -85.627966 32.822331, -85.627781 32.800716, -85.627496 32.778602, -85.635931 32.778656999999995, -85.645034 32.778146, -85.653352 32.778481, -85.67933699999999 32.778239, -85.67936399999999 32.784064, -85.679808 32.792068, -85.67957299999999 32.799514)))"
      }
    }
  }
```

## Full Example

<details >
<summary>

Full Dataset-oriented JSON-LD output (Identifiers, Variables, and Spatial Coverage)
</summary> 

:::note

From more information regarding the underlying concepts, see the [reference page](/reference/data-formats/jsonld/primer/reference#specific-geoconnex-json-ld-properties)

:::

```json
{
  // Identifiers, provenance, and context

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
  },
  "@type": "Dataset",
  "@id": "https://doi.org/10.4211/hs.4cf2a4298eca418f980201c1c5505299",
  "url": "https://doi.org/10.4211/hs.4cf2a4298eca418f980201c1c5505299",
  "identifier": "doi:hs.4cf2a4298eca418f980201c1c5505299",
  "name": "Geoconnex Dataset Example: Data for Triangle Water Supply Dashboard",
  "description": "This is a dataset meant as an example of dataset-level schema.org markup for https://geoconnex.us. It uses as an example data from the NC Triangle Water Supply Dashboard, which collects and visualizes finished water deliveries by water utilities to their service areas in the North Carolina Research Triangle area",
  "url": "https://www.hydroshare.org/resource/4cf2a4298eca418f980201c1c5505299",
   "provider": {
    "url": "https://hydroshare.org",
    "@type": "ResearchOrganization",
    "name": "HydroShare"
  },
    "creator": {
    "@type": "Person",
    "affiliation": {
                    "@type": "Organization",
                    "name": "Internet of Water;Center for Geospatial Solutions;Lincoln Institute of Land Policy"
                  },
                  "email": "konda@lincolninst.edu",
                  "name": "Kyle Onda",
                  "url": "https://www.hydroshare.org/user/4850/"
            },
  "keywords": [
    "water demand",
    "water supply",
    "geoconnex"
  ],
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "isAccessibleForFree": "true",
  "distribution": {
    "@type": "DataDownload",
    "name": "HydroShare file URL",
    "contentUrl": "https://www.hydroshare.org/resource/4cf2a4298eca418f980201c1c5505299/data/contents/demand_over_time.csv",
    "encodingFormat": [
      "text/csv"
    ],
    "dc:conformsTo": "https://www.hydroshare.org/resource/4cf2a4298eca418f980201c1c5505299/data/contents/dataDictionary.xlsx"
  },

  // Variables and Methods

  "variableMeasured": [
    {
      "@type": "PropertyValue",
      "name": "water demand",
      "description": "treated water delivered to distribution system",
      "propertyID": "http://vocabulary.odm2.org/variablename/waterUsePublicSupply/",
      "url": "http://vocabulary.odm2.org/variablename/waterUsePublicSupply/",
      "unitText": "million gallons per day",
      "qudt:hasQuantityKind": "qudt-quantkinds:VolumeFlowRate",
      "unitCode": "http://his.cuahsi.org/mastercvreg/edit_cv11.aspx?tbl=Units&id=1125579048",
      "measurementTechnique": "observation",
      "measurementMethod": {
        "name": "water meter",
        "description": "metered bulk value, accumlated over one month",
        "url": "https://www.wikidata.org/wiki/Q268503"
      }
    },
    {
      "@type": "PropertyValue",
      "name": "water demand (monthly average)",
      "description": "average monthly treated water delivered to distribution system",
      "propertyID": "http://vocabulary.odm2.org/variablename/waterUsePublicSupply/",
      "url": "http://vocabulary.odm2.org/variablename/waterUsePublicSupply/",
      "unitText": "million gallons per day",
      "qudt:hasQuantityKind": "qudt-quantkinds:VolumeFlowRate",
      "unitCode": "http://his.cuahsi.org/mastercvreg/edit_cv11.aspx?tbl=Units&id=1125579048",
      "measurementTechnique": "observation",
      "measurementMethod": {
        "name": "water meter",
        "description": "metered bulk value, average accumlated over each month for multiple years",
        "url": "https://www.wikidata.org/wiki/Q268503"
      }
    }
  ],
  "temporalCoverage": "2002-01-01/2020-12-31",
  "dc:accrualPeriodicity": "freq:daily",                                                               
  "dcat:temporalResolution": {"@value": "PT15M","@type":"xsd:duration"},
  
  // Feature Links

  "about": [
    {
      "@id": "https://geoconnex.us/ref/pws/NC0332010",
      "@type": "Place"
    },
    {
      "@id": "https://geoconnex.us/ref/pws/NC0368010",
      "@type": "Place"
    },
    {
      "@id": "https://geoconnex.us/ref/pws/NC0392010",
      "@type": "Place"
    },
    {
      "@id": "https://geoconnex.us/ref/pws/NC0392020",
      "@type": "Place"
    },
    {
      "@id": "https://geoconnex.us/ref/pws/NC0392045",
      "@type": "Place"
    }
  ]
}
```

</details>