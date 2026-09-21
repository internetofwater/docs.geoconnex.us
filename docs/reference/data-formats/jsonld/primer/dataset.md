---
sidebar_position: 4
title: Datasets
---

# Datasets (`schema:Dataset`)

A JSON-LD document of type `schema:Dataset` in Geoconnex represents data a user can obtain that is not just geospatial info. It may be time series for one parameter at one location, a file on a repository, an API response, or something else. The source dataset may be split into multiple `schema:Dataset` nodes in your JSON-LD if it would allow for easier querying.
-  For example, the USGS Monitoring Location Dataset is split up into one `schema:Dataset` for every monitoring location so you can find which monitoring locations have which data for a given parameter. 

If the dataset has its own identifier system, it is best to use that identifier if possible instead of minting a new Geoconnex ID. Geoconnex's main goal is linking real-world features, not dealing with or managing the internals of time series datasets.

When forming linked relationships, features are `schema:subjectOf` a Dataset IRI. Datasets are `schema:about` a Feature IRI.

Examples of a `schema:Dataset` on its own:
- [USGS Sciencebase](https://catalog.geoconnex.us/collections/bulk:usgs:sciencebase/items/aHR0cDovL2dlb2Nvbm5leC51cy91c2dzL3NjaWVuY2ViYXNlLzU0M2U3OGI0ZTRiMGZkNzZhZjY5Y2Y1Mw==.jsonld)
- [USGS National Geologic Map](https://catalog.geoconnex.us/collections/usgs:national_geologic_map/items/aHR0cHM6Ly9nZW9jb25uZXgudXMvdXNncy9uYXRpb25hbC1nZW9sb2dpYy1tYXAvZWFydGhfc3VyZmFjZV9nZW9sb2d5OjVfMQ==.jsonld)

Examples of datasets within a `schema:Place` feature:
- [A Feature in the USBR RISE API](https://api.wwdh.internetofwater.app/collections/rise-edr/items/1?f=jsonld)

## Properties on a `schema:Dataset`

_This table is given here for convenience, use the [SHACL shape](../../shacl_shape.md) for validation._

| Property | Required | Constraint |
| --- | --- | --- |
| `schema:name` | **yes** | string |
| `schema:provider` | **yes** | must conform to the [provider rules](#provider-and-publisher) |
| `schema:identifier` | no | **string** — an integer or number fails validation |
| `schema:description` | no | string |
| `schema:publisher` | no | must conform to the [publisher rules](#provider-and-publisher) |
| `schema:creator` | no | unconstrained |
| `schema:keywords` | no | string |
| `schema:license` | no | string |
| `schema:isAccessibleForFree` | no | boolean |
| `schema:variableMeasured` | no | must conform to the [variable rules](#variables) |
| `schema:distribution` | no | must conform to the [distribution rules](#distributions) |
| `schema:temporalCoverage` | no | string matching an ISO 8601 interval — see [below](#temporal-coverage) |
| `dc:accrualPeriodicity` | no | string |
| `schema:about` | no | must be an IRI **with no `@type`** — see [below](#datasets-about-many-features) |

`schema:variableMeasured` and `schema:distribution` are not strictly required, but a dataset without them tells a user nothing about what was measured or how to get it. Supply both wherever you can.

## Identity and description

The `@id` term should be the best possible IRI for defining the dataset. If the dataset has a data identifier system that is specific enough to allow for queries of subsets, use that. Otherwise you may need to mint a new Geoconnex identifier and use that.

```json
{
  "@type": "schema:Dataset",
  "@id": "http://geoconnex.us/usgs/sciencebase/543e78b4e4b0fd76af69cf53",
  "schema:name": "Annotated Checklist of Marine and Inland Fishes of St. Croix, U.S., Virgin Islands",
  "schema:identifier": "543e78b4e4b0fd76af69cf53",
  "schema:isAccessibleForFree": true
}
```

:::warning

`schema:identifier` must be a **string**. A source system that hands you a numeric primary key will produce `"schema:identifier": 4222`, which fails with *"Value is not Literal with datatype xsd:string"*. Quote it: `"4222"`. This identifier signifies the identifier in the source system, not the IRI in the graph used for linked relationships.

:::

## Provider and publisher

**`schema:provider`** is required and says where the data ultimately comes from. **`schema:publisher`** is optional and says who is making it accessible on the web. They are often the same organization — USGS both collects and serves streamgage data — but not always. The Internet of Water publishes a crawled copy of the Water Quality Portal; the provider is the original monitoring agency.

```json
{
  "schema:provider": {
    "@type": "schema:GovernmentOrganization",
    "schema:name": "US Bureau of Reclamation",
    "schema:url": "https://data.usbr.gov/rise-api"
  },
  "schema:publisher": {
    "@type": "schema:Organization",
    "schema:name": "Internet of Water",
    "schema:email": "internetofwater@lincolninst.edu",
    "schema:url": "https://internetofwater.org"
  }
}
```

| Node | Property | Required |
| --- | --- | --- |
| provider | `schema:name` | **yes** |
| provider | `schema:url` | no |
| publisher | `schema:name` | **yes** |
| publisher | `schema:email` | **yes** — so someone can be contacted when a service goes down |
| publisher | `schema:url` | no |

Both must be typed as one of `schema:Organization`, `schema:GovernmentOrganization`, `schema:ResearchOrganization`, or `schema:Person`. The shape has no subclass reasoning, so `schema:GovernmentOrganization` is listed explicitly rather than inferred from `schema:Organization`.

:::note

The provider rules are targeted by class, so **any** node in your document typed `schema:Organization` or `schema:Person` must have a `schema:name` — even one that is not being used as a provider.

:::

## Variables

`schema:variableMeasured` says what parameter the dataset holds. Only `schema:name` is required; everything else sharpens it.

```json
{
  "schema:variableMeasured": {
    "@type": "schema:PropertyValue",
    "schema:name": "Lake/Reservoir Storage",
    "schema:description": "Volume of water stored in the reservoir",
    "schema:propertyID": "4222",
    "schema:url": "https://data.usbr.gov/catalog/4222",
    "schema:unitText": "af",
    "schema:unitCode": "qudt-units:AC-FT",
    "qudt:hasQuantityKind": "qudt-quantkinds:Volume",
    "schema:measurementTechnique": "observation",
    "schema:measurementMethod": {
      "schema:name": "Reservoir storage from stage-capacity table",
      "schema:description": "Storage computed from measured forebay elevation and the reservoir area-capacity table",
      "schema:url": "https://data.usbr.gov/rise-api"
    }
  }
}
```

| Property | Required | Notes |
| --- | --- | --- |
| `schema:name` | **yes** | the label used for the parameter |
| `schema:description` | no | human-readable explanation |
| `schema:propertyID` | no | stable identifier for programmatic access |
| `schema:url` | no | link to more information about the parameter |
| `schema:unitText` | no | unit as written for people, e.g. `cubic feet per second` |
| `schema:unitCode` | no | unit from a codelist, ideally [QUDT units](https://qudt.org/doc/DOC_VOCAB-UNITS.html) |
| `qudt:hasQuantityKind` | no | what kind of quantity it is, e.g. `qudt-quantkinds:VolumeFlowRate` |
| `schema:measurementTechnique` | no | observed, modeled |
| `schema:measurementMethod` | no | the specific method; requires a `schema:name` if present |

Use an array to describe several parameters in one dataset:

```json
{
  "schema:variableMeasured": [
    { "@type": "schema:PropertyValue", "schema:name": "water demand", "schema:unitText": "million gallons per day" },
    { "@type": "schema:PropertyValue", "schema:name": "water demand (monthly average)", "schema:unitText": "million gallons per day" }
  ]
}
```

If a unit is not in QUDT, use the URL of whatever codelist does define it — the [ODM2 units codelist](http://vocabulary.odm2.org/units/), for example. `measurementTechnique` and `measurementMethod` are the properties users filter on to decide whether data is fit for their purpose.

## Distributions

`schema:distribution` says how to actually get the data. Each value must be a `schema:DataDownload` with a `schema:contentUrl`.

```json
{
  "schema:distribution": [
    {
      "@type": "schema:DataDownload",
      "schema:name": "Reclamation RISE API",
      "schema:contentUrl": "https://data.usbr.gov/rise/api/result/download?type=csv&itemId=4222",
      "schema:encodingFormat": "text/csv",
      "dc:conformsTo": "https://data.usbr.gov/rise-api"
    }
  ]
}
```

| Property | Required | Notes |
| --- | --- | --- |
| `schema:contentUrl` | **yes** | a URL that returns the data directly |
| `schema:name` | no | the service or file, e.g. `USGS Instantaneous Values Service` |
| `schema:encodingFormat` | no | media type, e.g. `text/csv`, `application/json` |
| `dc:conformsTo` | no | link to the format spec, API documentation, or data dictionary |

List several when the same data is available more than one way — a bulk file and an API, say:

```json
{
  "schema:distribution": [
    {
      "@type": "schema:DataDownload",
      "schema:name": "USGS Instantaneous Values Service",
      "schema:contentUrl": "https://waterservices.usgs.gov/nwis/iv/?sites=08282300&parameterCd=00060&format=rdb",
      "schema:encodingFormat": "text/tab-separated-values",
      "dc:conformsTo": "https://pubs.usgs.gov/of/2003/ofr03123/6.4rdb_format.pdf"
    },
    {
      "@type": "schema:DataDownload",
      "schema:name": "USGS SensorThings API",
      "schema:contentUrl": "https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('0adb31f7852e4e1c9a778a85076ac0cf')?$expand=Thing,Observations",
      "schema:encodingFormat": "application/json",
      "dc:conformsTo": "https://labs.waterdata.usgs.gov/docs/sensorthings/index.html"
    }
  ]
}
```

The distribution rules are targeted by class, so any node typed `schema:DataDownload` anywhere in the document needs a `contentUrl`.

## Temporal coverage

```json
{
  "schema:temporalCoverage": "1986-05-01T06:00:00+00:00/..",
  "dc:accrualPeriodicity": "daily"
}
```

`schema:temporalCoverage` must be an ISO 8601 interval of the form `START/END`, where either end may be `..` for unknown or ongoing. Dates may be `YYYY-MM-DD` or a full timestamp with `Z` or a `±HH:MM` offset.

| Value | Valid | |
| --- | --- | --- |
| `2014-06-30/..` | ✅ | ongoing from a date |
| `2002-01-01/2020-12-31` | ✅ | closed interval |
| `../2020-12-31` | ✅ | unknown start |
| `1986-05-01T06:00:00+00:00/2026-09-17T06:00:00+00:00` | ✅ | full timestamps |
| `1986-05-01 to 2026-09-17` | ❌ | not an interval |
| `2014-06-30` | ❌ | a single date is not an interval |

`dc:accrualPeriodicity` records how often the dataset is updated. It is a free string; values from the [Dublin Core frequency vocabulary](https://www.dublincore.org/specifications/dublin-core/collection-description/frequency/) are a good choice.

## Datasets about many features

Most datasets are attached to a single feature through that feature's `schema:subjectOf`. When a dataset covers many features instead, point at them from the dataset with `schema:about`.

```json
{
  "schema:about": [
    { "@id": "https://geoconnex.us/ref/pws/NC0332010" },
    { "@id": "https://geoconnex.us/ref/pws/NC0368010" },
    { "@id": "https://geoconnex.us/ref/pws/NC0392010" }
  ]
}
```

:::warning

Values of `schema:about` must be **bare IRIs with no `@type`**. Adding `"@type": "schema:Place"` turns each reference into a place the shape then validates in full, and it fails for a missing name and a missing geometry — you are not republishing those features, only pointing at them.

```json
{ "@id": "https://geoconnex.us/ref/pws/NC0332010", "@type": "schema:Place" }  // ❌
{ "@id": "https://geoconnex.us/ref/pws/NC0332010" }                          // ✅
```

:::

To find the right URIs, [reference.geoconnex.us](https://reference.geoconnex.us) supports [OGC API — Features](https://ogcapi.ogc.org/features/) queries with [CQL](https://portal.ogc.org/files/96288) filters. To find the public water system for Raleigh, for example:

```
https://reference.geoconnex.us/collections/pws/items?filter=pws_name ILIKE '%Raleigh%'
```

If the features you need are not published as reference features, [open an issue](https://github.com/internetofwater/geoconnex.us/issues/new/choose) requesting a reference feature set.

### When the list would be too long

Comprehensive datasets — every county, every NHDPlusV2 flowline — should name the geospatial fabric they are built on rather than enumerate it:

```json
{
  "schema:isBasedOn": {
    "@id": "https://www.hydroshare.org/resource/9ebc0a0b43b843b9835830ffffdd971e/",
    "schema:name": "U.S. Community Water Systems Service Boundaries, v4.0.0",
    "schema:description": "Water service boundaries for 45,973 community water systems in the US",
    "schema:url": "https://github.com/SimpleLab-Inc/wsb"
  }
}
```

### Defining a spatial extent

If the dataset is confined to a specific area, this can be defined via `gsp:hasGeometry`. That will be interpreted as the spatial extent of the dataset. To signify that the dataset is constraint to a complex reference boundary like a state or watershed, it is best to just use `schema:about` and link the dataset to the feature's IRI directly instead of duplicating spatial data.

```json
"gsp:hasGeometry": {
  "@type": "gsp:Geometry",
  "gsp:asWKT": {
    "@value": "POLYGON((-64.8939 17.6825, -64.6106 17.6825, -64.6106 17.80164, -64.8939 17.80164, -64.8939 17.6825))",
    "@type": "http://www.opengis.net/ont/geosparql#wktLiteral"
  }
},
```
