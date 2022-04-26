# Contributing from Scratch



## Make landing content

Publish feature-level landing content

## Add JSON-LD

### Templates

#### hydrometricStation (Surface Water Monitoring Location)

```jsonld
{
	"@context": [
		{
			"schema": "http://schema.org/",
			"skos": "https://www.w3.org/TR/skos-reference/",
			"hyf": "https://www.opengis.net/def/schema/hy_features/hyf/",
			"gsp": "http://www.opengeospatial.org/standards/geosparql/",
			"name": "schema:name",
			"sameAs": "schema:sameAs",
			"related": "skos:related",
			"description": "schema:description",
			"geo": "schema:geo",
			"image": {
				"@id": "schema:image",
				"@type": "@id"
			}
		}
	],
	"@id": "{{uri}}",
	"@type": [
		"https://www.opengis.net/def/schema/hy_features/hyf/HY_HydrometricFeature",
		"https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocation"
	],
    "name": "{{name}}",
	"description": "{{description}}",
	"sameAs": "{{reference_uri}}",
	"hyf:referencedPosition": [
		{
			"hyf:HY_IndirectPosition": {
				"hyf:distanceExpression": {
					"hyf:HY_DistanceFromReferent": {
						"hyf:interpolative": "{{measure}}"
					}
				},
				"hyf:distanceDescription": {
					"hyf:HY_DistanceDescription": "{{direction}}"
				},
				"hyf:linearElement": "{{flowpath_uri}}"
			}
		},
		{
			"hyf:HY_IndirectPosition": {
				"hyf:linearElement": "{{mainstem_uri}}"
			}
		}
	],
	"hyf:HY_HydroLocationType": ["hydrometricStation","dam","etc"]
	"geo": {
		"@type": "schema:GeoCoordinates",
      "schema:latitude": "{{latitude}}",
		"schema:longitude": "{{longitude}}"
	},
	"gsp:hasGeometry": {
		"@type": "gsp:Geometry",
		"gsp:asWKT": "POINT ({{longitude}} {{latitude}})"
	}
}
```

## Add PIDS
See Github

### Add to NLDI

See other GitHub


