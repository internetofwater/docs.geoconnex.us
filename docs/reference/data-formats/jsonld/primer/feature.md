---
sidebar_position: 3
title: Features
---

# Features (`schema:Place`)

The core data that makes up Geoconnex are real-world features, typed as `schema:Place` in JSON-LD. The [SHACL shape](../../shacl_shape.md) requires only two things of it, a name and a geometry, to allow for easier contribution, but the optional properties are important to make the feature findable and more useful when linking to other datasets.

Some sample live features can be found here:

- [A Feature in the USBR RISE API](https://api.wwdh.internetofwater.app/collections/rise-edr/items/1?f=jsonld) (View HTML [here](https://api.wwdh.internetofwater.app/collections/rise-edr/items/1))
- [A Feature in the Geoconnex Reference Feature Server](https://reference.geoconnex.us/collections/mainstems/items/2290857?f=jsonld) (View HTML [here](https://reference.geoconnex.us/collections/mainstems/items/2290857))

## Properties

_This table is given here for convenience, defer to the [SHACL shape](../../shacl_shape.md) for validation or if any section is unclear._

| Property | Required | Constraint |
| --- | --- | --- |
| `schema:name` | **yes** | string |
| `gsp:hasGeometry` | **yes** | node containing at least one `gsp:asWKT` |
| `schema:description` | no | string |
| `hyf:HydroLocationType` | no | string |
| `schema:sameAs` | no | must be an IRI, not a string literal |
| `hyf:containingCatchment` | no | must be an IRI, not a string literal |
| `schema:subjectOf` | no | each value must conform to the [dataset shape](./dataset.md) |

## Usage of `@id`, `@type`, and identifiers

```json
{
  "@id": "https://geoconnex.us/wwdh/rise/1",
  "@type": ["schema:Place", "hyf:HY_HydroLocation"],
  "schema:name": "Marys Lake",
  "schema:description": "Bureau of Reclamation reservoir near Estes Park, Colorado",
  "hyf:HydroLocationType": "reservoir"
}
```

- **`@id`** should be a persistent [geoconnex.us URI](../../../../contributing/api/step-3/index.md). If you have not minted one yet, align on that structure before creating your data.
- **`@type`** must include `schema:Place`; the validator rejects the document outright otherwise. Add further types alongside it to say what kind of feature it is — `hyf:HY_HydroLocation` for a location that could in principle define a catchment, `hyf:HY_HydrometricFeature` for a data collection station, or a term from the ODM2 [site type vocabulary](http://vocabulary.odm2.org/sitetype/).
- **`schema:name`** is required and is the human-readable label used everywhere the feature appears.
- **`hyf:HydroLocationType`** describes the kind of hydrologic location with more precision. Values are free text, but you should draw them from the [HY_Features HydroLocationType codelist](https://docs.ogc.org/is/14-111r6/14-111r6.html#annexB_1) so that providers describe the same kind of thing the same way.

:::note

The shape constrains the property spelled `hyf:HydroLocationType`. Some existing Geoconnex documents use `hyf:HY_HydroLocationType` instead; because the shape is open, that spelling passes validation but is not recognized as the same property. Use `hyf:HydroLocationType`.

:::

## Defining Geometry

A WKT geometry is **required**. Otherwise the feature cannot be queried spatially. Supply this with GeoSPARQL. `schema:geo` is not used since it isn't indexed via GeoSPARQL. You should use OGC:CRS84 for the coordinate reference system to keep geometries consistent in the graph. As such, annotating the crs explicitly is generally unnecessary. 

```json
{
  "gsp:hasGeometry": {
    "@type": "http://www.opengis.net/ont/sf#Point",
    "gsp:asWKT": {
      "@type": "http://www.opengis.net/ont/geosparql#wktLiteral",
      "@value": "POINT (-105.5343083 40.3440796)"
    },
  }
}
```

- **`gsp:hasGeometry`** carries the authoritative geometry as a [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) literal. Unlike `schema:geo` it can express lines, polygons, and multi-part geometries, and it can declare a coordinate reference system. Omitting it, or supplying a `gsp:hasGeometry` node with no `gsp:asWKT` inside, fails validation with *"Places must include geometry in WKT format"*.

## Linking to reference features

Reference features are the shared vocabulary of locations in Geoconnex. When two providers both tag their data with `https://geoconnex.us/ref/hu08/10190006`, a user can find both without knowing either provider exists. Browse them at [reference.geoconnex.us](https://reference.geoconnex.us/collections), or download them in bulk from [HydroShare](https://www.hydroshare.org/resource/3cc04df349cd45f38e1637305c98529c/).

### `schema:sameAs` and `hyf:containingCatchment`

```json
{
  "schema:sameAs": { "@id": "https://geoconnex.us/ref/dams/1014507" },
  "hyf:containingCatchment": { "@id": "https://geoconnex.us/ref/hu08/10190006" }
}
```

Use `schema:sameAs` when a reference feature *is* your feature — the same dam, the same gage — and `hyf:containingCatchment` for the catchment your feature sits inside.

:::warning

Both must be IRIs. Writing the URI as a plain JSON string is the single most common validation failure:

```json
"schema:sameAs": "https://geoconnex.us/ref/dams/1014507"          // ❌ a string literal
"schema:sameAs": { "@id": "https://geoconnex.us/ref/dams/1014507" } // ✅ an IRI
```

:::

If your feature is not represented among the reference features, consider contributing it by [opening an issue on the geoconnex.us repository](https://github.com/internetofwater/geoconnex.us/issues/new/choose).

### Position on a river network

For surface water locations, you can declare which river the feature sits on using a [reference mainstem](https://reference.geoconnex.us/collections/mainstems). This is what lets Geoconnex answer questions like "what data exists upstream of here". However you generally don't need to map this yourself as any feature with a valid geometry will have this info automatically added within the ETL ingestion process as described [here](/about/system-architecture/mainstems).

```json
{
  "hyf:referencedPosition": {
    "hyf:HY_IndirectPosition": {
      "hyf:linearElement": { "@id": "https://geoconnex.us/ref/mainstems/372414" }
    }
  }
}
```

### Groundwater

Wells and groundwater sample locations can use `hyf:referencedPosition` if you want them associated with a stream. You can also tie them to an aquifer or hydrogeologic unit with `sosa:isSampleOf`. Principal aquifer and secondary hydrogeologic region URIs are available from [reference.geoconnex.us](https://reference.geoconnex.us/collections).

```json
{
  "http://www.w3.org/ns/sosa/isSampleOf": {
    "@id": "https://geoconnex.us/ref/sec_hydrg_reg/S26"
  }
}
```

If no reference URI exists for the unit you need, describe it inline and point at the dataset it comes from:

```json
{
  "http://www.w3.org/ns/sosa/isSampleOf": {
    "@type": "GW_HydrogeoUnit",
    "schema:name": "name of the aquifer",
    "schema:identifier": "aq-id-1234",
    "schema:subjectOf": {
      "@type": "schema:Dataset",
      "schema:name": "Source aquifer dataset",
      "schema:url": "https://example.org/aquifers"
    }
  }
}
```

Note that anything you type `schema:Dataset` is validated against the [dataset shape](./dataset.md), so it will need a `schema:name` and a `schema:provider`.

## Attaching [datasets](./dataset.md)

`schema:subjectOf` carries the datasets that are about this feature. It is optional — a feature with no data is still a valid Geoconnex resource — but it is the whole point of publishing one.

```json
{
  "schema:subjectOf": [
    {
      "@type": "schema:Dataset",
      "schema:name": "Marys Lake Daily Lake/Reservoir Storage Time Series",
      "schema:provider": {
        "@type": "schema:GovernmentOrganization",
        "schema:name": "US Bureau of Reclamation"
      }
    }
  ]
}
```

:::note

Every value of `schema:subjectOf` is checked against the dataset shape **whether or not you type it** `schema:Dataset`. An untyped `{"schema:name": "..."}` under `subjectOf` still fails for a missing provider. See [Datasets](./dataset.md) for the full set of rules.

:::
