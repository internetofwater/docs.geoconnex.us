---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Location-oriented 

The purpose of the location-oriented JSON-LD output is to give enough information about the location and the data related to it so that a water data user would be able to quickly determine whether and how to download the data after reading.

 We will use the USGS Monitoring Location [08282300](https://geoconnex.us/usgs/monitoring-location/08282300) as an example for the type of content to put in location-oriented Geoconnex landing page web resources and how to map that content to embedded JSON-LD documents.

There are three parts of the JSON-LD document:


## Section 1: Identifiers and provenance

The first group of information helps identify the location and its provenance.

<!-- | Key                          | Description of its Corresponding Value                                                                                |
|------------------------------|-----------------------------------------------------------------------------------------------|
| `@id`                          | "[This is my HTTP identifier](https://geoconnex.us/usgs/monitoringlocation/08282300)"       |
| `@type`                        | "I am a `hydrometric station`[^10]"                                                          |
| `sameAs`                       | "I am the same thing as [Geoconnex Reference Gage 1018463](https://geoconnex.us/ref/gages/1018463)"[^11] |
| `identifier` > `value`         | "My unique USGS ID is `08282300`"                                                            |
| `name`                       | "My name is `Rio Brazos at Fishtail Road NR Tierra Amarilla, NM`"                          |
| `provider`                   | "Data about me is provided by the `USGS Water Data for the Nation`"                         |
  -->
[^9]: This is ideally a persistent geoconnex URI. See [here](https://github.com/internetofwater/geoconnex.us/blob/master/CONTRIBUTING.md) for how to create these. It is optional if the "same thing" geoconnex URI in the next bullet is provided, in which case this could just be the URL of the web resource for the location, or omitted.

[^10]: This ideally would come from a [codelist](https://docs.ogc.org/is/14-111r6/14-111r6.html#annexB_1) so that data providers use consistent terminology

[^11]: Where possible, it will useful to tag your organization's locations with pre-existing identifiers for reference locations, since many organizations collect data at the same location.

```json
{
  "@context": {
    "@vocab":"https://schema.org/",
    "hyf": "https://www.opengis.net/def/schema/hy_features/hyf/",
    "locType": "http://vocabulary.odm2.org/sitetype/"
  },
  "@id": "https://geoconnex.us/usgs/monitoring-location/08282300",
  "@type": [
    "hyf:HY_HydrometricFeature",
    "hyf:HY_HydroLocation",
    "locType:stream"
  ],
  "hyf:HydroLocationType": "hydrometric station",
  "sameAs": {"@id":"https://geoconnex.us/ref/gages/1018463"},
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "USGS site number",
    "value":  "08282300"
  },
  "name": "Rio Brazos at Fishtail Road NR Tierra Amarilla, NM",
  "description": "Stream/River Site",
  "provider": {
    "url": "https://waterdata.usgs.gov",
    "@type": "GovernmentOrganization",
    "name": "U.S. Geological Survey Water Data for the Nation"
  }
}
```

## Explanation

Here we construct the JSON-LD document by adding a context which includes the https://schema.org/ vocabulary, as well as the https://www.opengis.net/def/schema/hy_features/hyf/ vocabulary which defines specific concepts in surface hydrology, and the ODM2 [sitetype vocabulary](http://vocabulary.odm2.org/sitetype/) which defines types of water data collection locations.

-   The `@id` element of https://geoconnex.us/ref/monitoring-location/08282300 in this case is a persistent geoconnex URI. See [here](https://github.com/internetofwater/geoconnex.us/blob/master/CONTRIBUTING.md) for how to create these. It is optional if the "same thing" geoconnex URI in the next bullet is provided, in which case this could just be the URL of the web resource for the location, or omitted.

-   The `@type` element here specifies that https://geoconnex.us/ref/monitoring-location/08282300 is a [Place](https://schema.org/Place) (i.e. a generic place on earth), a [Hydrometric Feature](https://www.opengis.net/def/schema/hy_features/hyf/HY_HydrometricFeature) (i.e. a data collection station) and a [HydroLocation](https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocation) (i.e. a specific location that could in principle define a catchment). The `locType` further specifies the type of location using the ODM2 sitetype vocabulary http://vocabulary.odm2.org/sitetype/, which expresses the location type in terms of the feature of interest (e.g. a stream, a groundwater system). If the location is more meant to represent a general location about which non-hydrologic data is being provided, as might be the case with a data provider publishing data about dams, levees, culverts, bridges, etc. but not associated water data, then `locType` and `hyf:HY_HydrometricFeature` can be omitted.

-   The `hyf:HydroLocationType` can be used to identify the type of site with greater specificity and customization by using text values from any codelist, but preferably the [HY_Features HydroLocationType codelist](https://docs.ogc.org/is/14-111r6/14-111r6.html#annexB_1) instead of identifiers. It can be useful to describe something like a dam, weir, culvert, bridge, etc.

-   The `sameAs` element is optional if the `@id` element is included as a persistent geoconnex URI. However, wherever possible, it should be populated with a Geoconnex Reference Feature URI. If all data providers tag their own location metadata with these, it becomes much more easy for users of the Geoconnex system to find data collected by other providers about the same location. Reference features of all sorts are available to browse in a web map at https://geoconnex.us/iow/map, access via API at https://reference.geoconnex.us/collections, or to download in bulk as GeoPackage files from [HydroShare](https://www.hydroshare.org/resource/3cc04df349cd45f38e1637305c98529c/). If your location does not appear to be represented in a reference location, please consider contributing your location. You can start this process by [submitting an issue at the geoconnex.us GitHub repository](https://github.com/internetofwater/geoconnex.us/issues/new?assignees=&labels=&projects=&template=general.md&title=%5Bgeneral%5D). In this case `sameAs` is a persistent geoconnex URI for a "Reference Gage". Reference Gages is an open source, continuously updated set of all known surface water monitoring locations with data being collected by all known organizations. It is managed on GitHub at https://github.com/internetofwater/ref_gages

-   The `identifier` element specifies the ID scheme name (`propertyID`) for the location in the data source and the ID itself (`value`)

-   The `name` (required) and `description` (optional) elements are self-explanatory and can follow the conventions of the data provider.

-   The `provider` element describes the data provider, which is generally conceptualized in Geoconnex as being a data system available on the web. Note that under `provider`, in addition to an identifying `name`, there is a `url` if available for the website of the providing data system, and a `@type`, which is most likely a sub type of https://schema.org/Organization, which includes [GovernmentOrganization](https://schema.org/GovernmentOrganization), [NGO](https://schema.org/NGO), [ResearchOrganization](https://schema.org/ResearchOrganization), [EducationalOrganization](https://schema.org/EducationalOrganization), and [Corporation](https://schema.org/Corporation), among others.

## Section 2. Spatial geometry and hydrologic references

The second group of information provides specific location and spatial context:

<!-- | Key                                                              | Description of its Corresponding Value                              |
|------------------------------------------------------------------|---------------------------------------------------------------------|
| `geo` > `longitude` and `latitude`                               | "My lat/long is `36.738 -106.471`"                                |
| `hyf:referencedPosition` > `hyf:HY_IndirectPosition` > `hyflinearElement` > `@id`| "I am on the [Rio Brazos](https://geoconnex.us/ref/mainstems/1611418)" [^12] | -->

[^12]: Note that ideally this would be a geoconnex URI for a river mainstem, in this case (https://geoconnex.us/ref/mainstems/1611418)[https://geoconnex.us/ref/mainstems/1611418]

   ```json
   // NOTE this is just the geo section! Not the entire JSON-LD
  "geo": {
    "@type": "schema:GeoCoordinates",
    "longitude": -106.4707722,
    "latitude": 36.7379333
  },
  "gsp:hasGeometry": {
      "@type": "http://www.opengis.net/ont/sf#Point",
      "gsp:asWKT": {
        "@type": "http://www.opengis.net/ont/geosparql#wktLiteral",
        "@value": "POINT (-106.4707722 36.7379333)"
      },
      "gsp:crs": {
        "@id": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
      }
   },
  "hyf:referencedPosition": {
    "hyf:HY_IndirectPosition":{
        "hyf:linearElement":{
          "@id": "https://geoconnex.us/ref/mainstems/1611418"
        }
     }
   }
```



We have added a context element `gsp` and three blocks: `geo`, `gsp:hasGeometry`, and `hyf:referencedPosition`.

-   `gsp` is the [GeoSPARQL](https://www.ogc.org/standard/geosparql/) ontology used to standardize the representation of spatial data and relationships in knowledge graphs like the Geoconnex system

-   `geo` is the `schema.org` [standard for representing spatial data](https://schema.org/geo). It is what is used by search engines like Google and Bing to place webpages on a map. While useful, it does not have a standard way for representing multipoint, multipolyline, or multipolygon features, or a way to specify coordinate reference systems or projections, and so we need to also provide a GeoSPARQL version of the geometry. In this case, we are simply providing a point with a longitude and latitude via the [schema:GeoCoordinates](https://schema.org/GeoCoordinates) property. It is also possible to represent [lines](https://schema.org/line) and [polygons](https://schema.org/polygon)

-   `gsp:hasGeometry` is the GeoSPARQL version of geometry, with which we can embed [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) representations of geometry in structured metadata in the `@value` element, and declare the coordinate reference system or projection in the `gsp:crs` element by using EPSG codes as encoded in the [OGC register of reference systems](http://www.opengis.net/def/crs/EPSG/0/), in this case using http://www.opengis.net/def/crs/EPSG/0/4326 for the familiar WGS 84 (EPSG 4326) system.

-   `hyf:referencedPosition` uses the [HY_Features](https://www.opengis.net/def/schema/hy_features/hyf/) model to declare that this location is located on a specific river, in this case the [Rio Brazos in New Mexico](https://geoconnex.us/ref/mainstems/1611418) as identified in the Reference Mainstems dataset, which is available via API at https://reference.geoconnex.us/collections/mainstems and managed on GitHub at https://github.com/internetofwater/ref_rivers. All surface water locations should include this type of element.

:::note
##### What about groundwater?

Groundwater monitoring locations may use the `hyf:referencedPosition` element if data providers wish their wells to be associated with specific streams. However, groundwater sample and monitoring locations such as wells can also be referenced to hydrogeologic unit or aquifer identifiers where available using this pattern, instead of using the `hyf:referencedPosition` pattern:

``` json
"http://www.w3.org/ns/sosa/isSampleOf": {
  "id": "https://geoconnex.us/ref/sec_hydrg_reg/S26"
}
```

USGS Principal Aquifers and Secondary Hydrogeologic Unit URIs are available from https://reference.geoconnex.us/collections

If reference URIs are not available for the groundwater unit you'd like to reference, but an ID does exist in a dataset that exists online you may use this pattern

``` json
"http://www.w3.org/ns/sosa/isSampleOf": {
  "@type": "GW_HydrogeoUnit",
  "name": "name of the aquifer",
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "Source aquifer dataset id field name",
    "value":  "aq-id-1234"
  },
  "subjectOf": {
    "@type": "Dataset",
    "url": "url where dataset that descibes or includes the aquifer can be accessed"
   }
}
```
:::

## Section 3. Datasets

Now that we have described our location’s provenance, geospatial geometry, and association with any reference features, we now describe the data that can be accessed about that location. The simplest, most minimal way to do this is to add a block like this, which would be added to the bottom of the JSON-LD document we have created so far:

```json
// NOTE: this is just the dataset section, not the entire JSON-LD document
"subjectOf": {
  "@type": "Dataset",
  "name": "Discharge data from USGS-08282300",
  "description": "Discharge data from USGS-08282300 at Rio Brazos at Fishtail Road NR Tierra Amarilla, NM",
  "url": "https://waterdata.usgs.gov/monitoring-lInocation/08282300/#parameterCode=00060&period=P7D"
}
```

Here, we simply declare that the location we have been working with is `subjectOf` of a Dataset with a name, description, and URL where information about the dataset can be found.

However, it is often useful to include much more metadata about the details of the dataset. This allows users to
 * Filter for your data using more standardized names for variables, and by temporal coverage and resolution
 * Determine if they want to use that data based on the methods used (such as whether it is observed or modeled/forecasted data)

<details >
<summary>
An example dataset section with more detailed metadata
</summary>  
```json
{
 "subjectOf":{
  "@type": "Dataset",
  "name": "Discharge data from USGS Monitoring Location 08282300",
  "description": "Discharge data from USGS Streamgage at Rio Brazos at Fishtail Road NR Tierra Amarilla, NM",
  "license": "https://spdx.org/licenses/CC-BY-4.0",
  "isAccessibleForFree": "true",
  "variableMeasured": {
   "@type": "PropertyValue",
   "name": "discharge",
   "description": "Discharge in cubic feet per second",
   "propertyID": "https://www.wikidata.org/wiki/Q8737769",
   "url": "https://en.wikipedia.org/wiki/Discharge_(hydrology)",
   "unitText": "cubic feet per second",
   "qudt:hasQuantityKind": "qudt-quantkinds:VolumeFlowRate",
   "unitCodet": "qudt-units:FT3-PER-SEC",
   "measurementTechnique": "observation",
   "measurementMethod": {
     "name":"Discharge Measurements at Gaging Stations",
     "publisher": "U.S. Geological Survey",
     "url": "https://doi.org/10.3133/tm3A8"
     }
    },
   "temporalCoverage": "2014-06-30/..",
   "dc:accrualPeriodicity": "freq:daily",
   "dcat:temporalResolution": {"@value":"PT15M","@type":"xsd:duration"},
   "distribution": [
     {
      "@type": "DataDownload",
      "name": "USGS Instantaneous Values Service"
      "contentUrl": "https://waterservices.usgs.gov/nwis/iv/?sites=08282300&parameterCd=00060&format=rdb",
      "encodingFormat": ["text/tab-separated-values"],
      "dc:conformsTo": "https://pubs.usgs.gov/of/2003/ofr03123/6.4rdb_format.pdf"
      },
      {
      "@type": "DataDownload",
      "name": "USGS SensorThings API",
      "contentUrl": "https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('0adb31f7852e4e1c9a778a85076ac0cf')?$expand=Thing,Observations",
      "encodingFormat": ["application/json"],
      "dc:conformsTo": "https://labs.waterdata.usgs.gov/docs/sensorthings/index.html"
      }
    ]
  }
}
```
</details>

## Full Example

:::note

For more information regarding the underlying concepts, see the [general JSON-LD reference page](../overview.md#keywords-and-their-significance-in-reference-to-the-example )

:::

<details >
<summary>

Full location-oriented JSON-LD output (Identifiers, Geometric References, and Datasets)
</summary>  

```json
{
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
  "@id": "https://geoconnex.us/usgs/monitoring-location/08282300",
  "@type": [
    "hyf:HY_HydrometricFeature",
    "hyf:HY_HydroLocation",
    "locType:stream"
  ],
  "hyf:HydroLocationType": "hydrometric station",
  "sameAs": {
    "@id": "https://geoconnex.us/ref/gages/1018463"
  },
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "USGS site number",
    "value": "08282300"
  },
  "name": "Rio Brazos at Fishtail Road NR Tierra Amarilla, NM",
  "description": "Stream/River Site",
  "provider": {
    "url": "https://waterdata.usgs.gov",
    "@type": "GovernmentOrganization",
    "name": "U.S. Geological Survey Water Data for the Nation"
  },
  "geo": {
    "@type": "schema:GeoCoordinates",
    "longitude": -106.4707722,
    "latitude": 36.7379333
  },
  "gsp:hasGeometry": {
      "@type": "http://www.opengis.net/ont/sf#Point",
      "gsp:asWKT": {
        "@type": "http://www.opengis.net/ont/geosparql#wktLiteral",
        "@value": "POINT (-106.4707722 36.7379333)"
      },
      "gsp:crs": {
        "@id": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
      }
  },
  "hyf:referencedPosition": {
    "hyf:HY_IndirectPosition": {
      "hyf:linearElement": {
        "@id": "https://geoconnex.us/ref/mainstems/1611418"
      }
    }
  },
  "subjectOf": {
    "@type": "Dataset",
    "name": "Discharge data from USGS Monitoring Location 08282300",
    "description": "Discharge data from USGS Streamgage at Rio Brazos at Fishtail Road NR Tierra Amarilla, NM",
      "provider": {
    "url": "https://waterdata.usgs.gov",
    "@type": "GovernmentOrganization",
    "name": "U.S. Geological Survey Water Data for the Nation"
  },
  "url": "https://waterdata.usgs.gov/monitoring-location/08282300/#parameterCode=00060",
    "variableMeasured": {
      "@type": "PropertyValue",
      "name": "discharge",
      "description": "Discharge in cubic feet per second",
      "propertyID": "https://www.wikidata.org/wiki/Q8737769",
      "url": "https://en.wikipedia.org/wiki/Discharge_(hydrology)",
      "unitText": "cubic feet per second",
      "qudt:hasQuantityKind": "qudt-quantkinds:VolumeFlowRate",
      "unitCode": "qudt-units:FT3-PER-SEC",
      "measurementTechnique": "observation",
      "measurementMethod": {
        "name": "Discharge Measurements at Gaging Stations",
        "publisher": "U.S. Geological Survey",
        "url": "https://doi.org/10.3133/tm3A8"
      }
    },
    "temporalCoverage": "2014-06-30/..",
    "dc:accrualPeriodicity": "freq:daily",                                                               
    "dcat:temporalResolution": {"@value":"PT15M","@type":"xsd:duration"},  
    "distribution": [
      {
        "@type": "DataDownload",
        "name": "USGS Instantaneous Values Service",
        "contentUrl": "https://waterservices.usgs.gov/nwis/iv/?sites=08282300&parameterCd=00060&format=rdb",
        "encodingFormat": [
          "text/tab-separated-values"
        ],
        "dc:conformsTo": "https://pubs.usgs.gov/of/2003/ofr03123/6.4rdb_format.pdf"
      },
      {
        "@type": "DataDownload",
        "name": "USGS SensorThings API",
        "contentUrl": "https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('0adb31f7852e4e1c9a778a85076ac0cf')?$expand=Thing,Observations",
        "encodingFormat": [
          "application/json"
        ],
        "dc:conformsTo": "https://labs.waterdata.usgs.gov/docs/sensorthings/index.html"
      }
    ]
  }
}

```


</details>


This final location-oriented web resource includes this information:

- My HTTP identifier is https://geoconnex.us/ref/monitoring-location/08282300. 
- I am the same thing as [Geoconnex Reference Gage 1018463](https://geoconnex.us/ref/gages/1018463)  
My unique USGS ID is `08282300`  
- My name is `Rio Brazos at Fishtail Road NR Tierra Amarilla, NM`  
Data about me is provided by the `USGS Water Data for the Nation`  
- I am a `hydrometric station`. My lat/long is `36.738 -106.471`
- I am on the [Rio Brazos](https://geoconnex.us/ref/mainstems/1611418)  There is data about me for the parameter `Discharge` and between June 6, 2014 to the present at a 15 minute time resolution. This data is generated from `in-situ observation`, in particular using [USGS discharge measurement methods](https://pubs.usgs.gov/publication/tm3A8). You can download it [here](https://waterservices.usgs.gov/nwis/iv/?sites=08282300&parameterCd=00060&startDT=2023-08-13T03:08:21.313-06:00&endDT=2023-08-20T03:08:21.313-06:00&siteStatus=all&format=rdb) using the [USGS Instantaneous Values REST Web Service](https://waterservices.usgs.gov/rest/IV-Test-Tool.html) in the [RDB format](https://waterdata.usgs.gov/nwis/?tab_delimited_format_info). You can also download it [here](https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('0adb31f7852e4e1c9a778a85076ac0cf')?$expand=Thing,Observations) using the [SensorThings API standard](https://docs.ogc.org/is/15-078r6/15-078r6.html) in `JSON` or `CSV` formats.  

- There is data about me for the parameter `Gage Height` between June 6, 2014 to the present at a 15 minute time resolution. This data is generated from `in-situ observation`, in particular using [USGS stage measurement methods](https://pubs.usgs.gov/publication/tm3A7). You can download it [here](https://waterservices.usgs.gov/nwis/iv/?sites=08282300&parameterCd=00065&startDT=2023-08-13T03:08:21.313-06:00&endDT=2023-08-20T03:08:21.313-06:00&siteStatus=all&format=rdb) from the [USGS Instantaneous Values REST Web Service](https://waterservices.usgs.gov/rest/IV-Test-Tool.html) in the [RDB format](https://waterdata.usgs.gov/nwis/?tab_delimited_format_info). You can also download it [here](https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('ba774169b3e542cdb9c02e8d705b4d0f')?$expand=Thing,Observations) using the [SensorThings API standard](https://docs.ogc.org/is/15-078r6/15-078r6.html) in `JSON` or `CSV` formats. 

[^4]: This is ideally a persistent geoconnex URI. See [here](https://github.com/internetofwater/geoconnex.us/blob/master/CONTRIBUTING.md) for how to create these. It is optional if the  same thing" geoconnex URI in the next bullet is provided, in which case this could just be the URL of the web resource for the location, or omitted.

[^5]: Where possible, it will useful to tag your organization's locations with pre-existing identifiers for reference locations, since many organizations collect data at the same location.

[^6]: This ideally would come from a [codelist](https://docs.ogc.org/is/14-111r6/14-111r6.html#annexB_1) so that data providers use consistent terminology

[^7]: Note that ideally this would be a geoconnex URI for a river mainstem, in this case https://geoconnex.us/ref/mainstems/1611418

[^8]: This is towards the 'more detailed' end of the spectrum. If data is not available via API, it is still good to include links to data file downloads or web apps that provide access to the data
