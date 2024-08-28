---
title: Templating landing pages with JSON-LD
sidebar_position: 2
---

# Outputting properly formatted data via templating

:::tip
It is recommended to take a look at [the geoconnex JSON-LD reference](../../../reference/data-formats/jsonld/overview.md) or the [pygeoapi templating docs](https://docs.pygeoapi.io/en/latest/html-templating.html) before beginning to template your data. 
:::

pygeoapi can leverage Jinja2 templates to change the structure of the JSON-LD data output. 
- Templating is needed in order to change the default JSON-LD output by pygeoapi into either [location-oriented](../../../reference/data-formats/jsonld/primer/location-oriented.md) or [dataset-oriented](../../../reference/data-formats/jsonld/primer/dataset-oriented.md) JSON-LD output format for Geoconnex.
- To add extra templates, open your [pygeoapi config file](https://docs.pygeoapi.io/en/latest/configuration.html) and create a new collection block that links to the new `item_template` you made for your JSON-LD `linked-data`. 


## An example template walkthrough

In this example we will show how to template the output of a USGS SensorThings API. This general process will be analogous templating your own data.


:::tip

To follow along with this example, clone [our sample repo](https://github.com/cgs-earth/sta-pygeoapi) and run `docker compose up --build`

:::


Before we start, we first need to determine whether our example should be [location-oriented or dataset-oriented](/reference/data-formats/jsonld/primer/building#location-or-dataset-oriented). You will need to do the same for your own data. In this example it is [location-oriented](/reference/data-formats/jsonld/primer/location-oriented).


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="brief" label="Step 0: Set up your local config file" default>
    First, make sure you are ingesting your data properly into pygeoapi. This is done by editing the pygeoapi config file. Check out the [ingesting common providers](../pygeoapi/providers/) section or the [pygeoapi docs](https://docs.pygeoapi.io/en/latest/data-publishing/ogcapi-features.html#providers) for more guidance on how to do this.

    In this example we will be templating the data from https://labs.waterdata.usgs.gov/sta/v1.1/Things


    ```yml local.config.yml
    # ... Rest of configuration file abbreviated for brevity
    USGS-LocationOriented/Things:
      type: collection
      title: Location oriented JSON-LD output for USGS Sensor Things code
      description: United States Geological Survey (USGS.) SensorThings API
      keywords:
        - Things
        - SensorThings
        - USGS
      # Don't include any templates for the time being until we've created it
      # linked-data:
        # item_template: usgs-location-oriented.j2
      links:
        - type: application/html
          rel: canonical
          title: data source
          href: https://labs.waterdata.usgs.gov
          hreflang: en-US
      extents:
        spatial:
          bbox: [-170, 15, -51, 72]
          crs: http://www.opengis.net/def/crs/OGC/1.3/CRS84
        temporal:
          begin: null
          end: null
      providers:
        - type: feature
          name: SensorThings

          # Your existing API URL goes here
          data: https://labs.waterdata.usgs.gov/sta/v1.1/Things
```

  </TabItem>

  <TabItem value="raw" label="Step 1: Investigate the default JSON-LD output" >

    We begin by looking at the baseline JSON-LD output from our pygeoapi endpoint for a particular. In our case, this is located at http://localhost:5000/collections/USGS/Things/items/'AR008-331856091114601'?f=jsonld 
    
    Depending on whether our end goal is [location-oriented or dataset-oriented](/reference/data-formats/jsonld/primer/building#location-or-dataset-oriented), make note of any important keys that we will need to take in and transform during the templating process.
    
    In this case, since we are outputting a location-oriented JSON-LD, we know we will need `data['monitoringLocationNumber']` `data['locations'][0]['description']`, `data['Datastreams']` and other related keys.  


    :::tip

    Save your original JSON-LD output as you create your new template so you can quickly reference the originals keys and format, even after the template is applied

    :::

    ```json
    {
        "@context":[
            {
                "schema":"https://schema.org/",
                "type":"@type",
                "gsp":"http://www.opengis.net/ont/geosparql#"
            }
        ],
        "type":"schema:Place",
        "id":"'AR008-331856091114601'",
        "@iot.selfLink":"https://labs.waterdata.usgs.gov/sta/v1.1/Things('AR008-331856091114601')",
        "name":"AR008-331856091114601",
        "description":"Well",
        "Locations":[
            {
                "@iot.selfLink":"https://labs.waterdata.usgs.gov/sta/v1.1/Locations('8416841e-2d1b-11ec-ac1b-a32405a27bb1')",
                "@iot.id":"8416841e-2d1b-11ec-ac1b-a32405a27bb1",
                "name":"AR008-331856091114601",
                "description":"Well",
                "encodingType":"application/vnd.geo+json",
                "location":{
                    "type":"Point",
                    "coordinates":[
                        -91.1969333333333,
                        33.3169611111111
                    ]
                }
            }
        ],
        "Datastreams":[
            {
                "@iot.selfLink":"https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('177000bd9f6c45e5909c1729e4aab7b0')",
                "@iot.id":"177000bd9f6c45e5909c1729e4aab7b0",
                "name":"177000bd9f6c45e5909c1729e4aab7b0",
                "description":"Flow rate, well / AR008-331856091114601-177000bd9f6c45e5909c1729e4aab7b0",
                "observationType":"Instantaneous",
                "unitOfMeasurement":{
                    "name":"UNKNOWN",
                    "symbol":"US Gal/min",
                    "definition":""
                },
                "observedArea":{
                    "type":"Point",
                    "coordinates":[
                        -91.1969333,
                        33.3169611
                    ]
                },
                "phenomenonTime":"2024-07-06T09:15:00Z/2024-07-16T14:00:00Z",
                "properties":{
                    "Thresholds":[
                        {
                            "Name":"Operational limit (minimum)",
                            "Type":"ThresholdBelow",
                            "Periods":[
                                {
                                    "EndTime":"9999-12-31T23:59:59.9999999+00:00",
                                    "StartTime":"0001-01-01T00:00:00.0000000+00:00",
                                    "SuppressData":true,
                                    "ReferenceValue":-0.01,
                                    "ReferenceValueToTriggerDisplay":null
                                }
                            ],
                            "ReferenceCode":"Operational limit - low-Public"
                        },
                        {
                            "Name":"Operational limit (maximum)",
                            "Type":"ThresholdAbove",
                            "Periods":[
                                {
                                    "EndTime":"9999-12-31T23:59:59.9999999+00:00",
                                    "StartTime":"0001-01-01T00:00:00.0000000+00:00",
                                    "SuppressData":true,
                                    "ReferenceValue":20000,
                                    "ReferenceValueToTriggerDisplay":15000
                                }
                            ],
                            "ReferenceCode":"Operational limit - high-Public"
                        }
                    ],
                    "ParameterCode":"00058",
                    "StatisticCode":"00011"
                }
            },
            {
                "@iot.selfLink":"https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('9aa77f35cea344a4a0e5715e05d057c3')",
                "@iot.id":"9aa77f35cea344a4a0e5715e05d057c3",
                "name":"9aa77f35cea344a4a0e5715e05d057c3",
                "description":"Precipitation, total, inches / AR008-331856091114601-9aa77f35cea344a4a0e5715e05d057c3",
                "observationType":"Instantaneous",
                "unitOfMeasurement":{
                    "name":"in",
                    "symbol":"in",
                    "definition":""
                },
                "observedArea":{
                    "type":"Point",
                    "coordinates":[
                        -91.1969333,
                        33.3169611
                    ]
                },
                "phenomenonTime":"2024-07-06T09:15:00Z/2024-07-16T14:00:00Z",
                "properties":{
                    "ParameterCode":"00045"
                }
            }
        ],
        "Locations@iot.navigationLink":"https://labs.waterdata.usgs.gov/sta/v1.1/Things('AR008-331856091114601')/Locations",
        "HistoricalLocations@iot.navigationLink":"https://labs.waterdata.usgs.gov/sta/v1.1/Things('AR008-331856091114601')/HistoricalLocations",
        "Datastreams@iot.navigationLink":"https://labs.waterdata.usgs.gov/sta/v1.1/Things('AR008-331856091114601')/Datastreams",
        "state":"Arkansas",
        "county":"Chicot County",
        "country":"United States of America",
        "mapScale":24000,
        "stateCode":"AR",
        "wellDepth":"80.0",
        "agencyCode":"AR008",
        "countryFIPS":"US",
        "hydrologicUnit":"08050002",
        "decimalLatitude":33.3169611111111,
        "decimalLongitude":-91.1969333333333,
        "monitoringLocationUrl":"https://waterdata.usgs.gov/monitoring-location/331856091114601",
        "monitoringLocationName":"16S01W10CC1 CH-32 WU",
        "monitoringLocationType":"Well",
        "monitoringLocationNumber":"331856091114601",
        "locationHUCTwelveDigitCode":"080500020302",
        "decimalLatitudeStandardized":33.3169611111111,
        "decimalLongitudeStandardized":-91.1969333333333,
        "geometry":{
            "type":"Point",
            "coordinates":[
                -91.1969333333333,
                33.3169611111111
            ]
        },
        "gsp:hasGeometry":{
            "@type":"http://www.opengis.net/ont/sf#Point",
            "gsp:asWKT":{
                "@type":"http://www.opengis.net/ont/geosparql#wktLiteral",
                "@value":"POINT (-91.1969333333333 33.3169611111111)"
            }
        },
        "schema:geo":{
            "@type":"schema:GeoCoordinates",
            "schema:longitude":-91.1969333333333,
            "schema:latitude":33.3169611111111
        },
        "@id":"http://localhost:5000/collections/USGS/Things/items/'AR008-331856091114601'",
        "links":[
            {
                "type":"application/json",
                "rel":"root",
                "title":"The landing page of this server as JSON",
                "href":"http://localhost:5000?f=json"
            },
            {
                "type":"text/html",
                "rel":"root",
                "title":"The landing page of this server as HTML",
                "href":"http://localhost:5000?f=html"
            },
            {
                "rel":"alternate",
                "type":"application/geo+json",
                "title":"This document as JSON",
                "href":"http://localhost:5000/collections/USGS/Things/items/'AR008-331856091114601'?f=json"
            },
            {
                "rel":"self",
                "type":"application/ld+json",
                "title":"This document as RDF (JSON-LD)",
                "href":"http://localhost:5000/collections/USGS/Things/items/'AR008-331856091114601'?f=jsonld"
            },
            {
                "rel":"alternate",
                "type":"text/html",
                "title":"This document as HTML",
                "href":"http://localhost:5000/collections/USGS/Things/items/'AR008-331856091114601'?f=html"
            },
            {
                "rel":"collection",
                "type":"application/json",
                "title":"USGS Things",
                "href":"http://localhost:5000/collections/USGS/Things"
            }
        ]
    }
    ```
  </TabItem>

  <TabItem value="template" label="Step 2: Create a jinja template">
  
  The template below is an example of a custom [jinja template](https://jinja.palletsprojects.com/) for our baseline JSON-LD output. The source can be found [here](https://github.com/cgs-earth/sta-pygeoapi/blob/main/templates/usgs-location-oriented.j2)
  
  * Any value in `{{ }}` signifies something that jinja may replace. 
  * `{# #}` signifies a comment. 
  * Any templated variable should be surrounded with `{% if %} {% endif %}`. If we do not do this and the key does not exist, jinja will throw an error and no JSON-LD will be output. 

  Your goal should be to make your template as generalizable as possible. For instance, we use `{% for stream in data['Datastreams'] %}` to iterate through the `Datastreams` array in the JSON-LD output and reformat the output data for each. However, in some cases if we do not have the desired data in the original JSON-LD output, we may need to hard code the info.


  Consult the [JSON-LD Geoconenx guidance](/reference/data-formats/jsonld/primer/building) for more detailed information on which keys are required in each JSON-LD output format.

  :::note
  In general your template should be simply moving around the structure of the original output to make it more easily parsed for Geoconnex. If necessary, data that you need but is not output via your API can be hard coded. 

  :::warning

  Too much hard coding in your template is a sign that you may not be taking advantage of all the ways to template your original data

  :::


  ```json location-oriented.j2
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
      "ssn-system": "http://www.w3.org/ns/ssn/systems/"
    },
    "@id": "{{ data['@id'] }}",
    "@type": [
      "hyf:HY_HydrometricFeature",
      "hyf:HY_HydroLocation",
      "locType:stream"
    ],
    "hyf:HydroLocationType": "hydrometric station",
    "sameAs": {
      "@id": "https://geoconnex.us/ref/gages/{# Was told to not worry about changing this for time being, no way to get this without a geospatial query #}"
    },
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "USGS site number",
      {% if data['monitoringLocationNumber'] %}
        "value": "{{ data['monitoringLocationNumber'] }}"
      {% endif %}
    },
    {% if data['name'] %}
      "name": "{{ data['name'] }}",
    {% endif %}

    {% if data['locations'] and data['locations'][0]['description'] %}
      "description": "{{ data['locations'][0]['description'] }}",
    {% endif %}
    "provider": {
      "url": "https://waterdata.usgs.gov",
      "@type": "GovernmentOrganization",
      "name": "U.S. Geological Survey Water Data for the Nation"
    },
    {% if data['schema:geo'] %}
      "geo": {{ data['schema:geo'] | to_json }},
    {% endif %}
    {% if data['gsp:hasGeometry'] %}
      "gsp:hasGeometry": {
        "@type": "{{ data['gsp:hasGeometry']['@type'] }}", 
        "gsp:asWKT": {{ data['gsp:hasGeometry']['gsp:asWKT'] | to_json }},
        "gsp:crs": {
          "@id": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
        }
      },
    {% endif %}

    {# Since @id is the only key in this block, I am assuming we can just exclude the entire block if it doesn't exist since the block would not provide any info #}
    {% if data["Locations"][0]["properties"] is defined and data["Locations"][0]["properties"]["mainstemURL"] %}
    "hyf:referencedPosition": {
      "hyf:HY_IndirectPosition": {
         "hyf:linearElement": {
          {# I am assuming we can hard code 0 since this template is location-oriented and thus all date is related to one location#}
          "@id": "https://geoconnex.us/ref/mainstems/{{ data['Locations'][0]['properties']['mainstemURL'] }}"
        }
      }
    },
    {% endif %}

    "subjectOf": [
      {% for stream in data['Datastreams'] %}
          {
            {# In production we would have a function to map this to all possible types #}
            {% with typeOfData= "Flow rate" if "Flow rate" in stream['description'] else "Precipitation"%}

            "@type": "Dataset",

            {% if data['name'] %}
            {# We use the name since all datastreams are coming from the same location #}
              "name": "Flow rate data from USGS Monitoring Location {{data['name']}}",
            {% endif %}

            {% if stream['description'] %}
            {# Description describes what type of data that is being collected #}
            "description": "{{ stream["description"]}}",
            {% endif %}

            {# This is hardcoded, since it is not provided in the raw jsonld#}
            "provider": {
              "url": "https://waterdata.usgs.gov",
              "@type": "GovernmentOrganization",
              "name": "U.S. Geological Survey Water Data for the Nation"
            },

            "url": "https://waterdata.usgs.gov/monitoring-location/08282300/#parameterCode={{ stream["properties"]["ParameterCode"] }}",
           {# Assume here it is discharge, but ideally we would get this variable #}
            "variableMeasured": {
              "@type": "PropertyValue",
              "name": "{{ typeOfData }}",

              {% if stream['unitOfMeasurement']['symbol'] %}
              "description": "{{ typeOfData }} in {{ stream['unitOfMeasurement']['symbol'] }}",
              {% endif %}

              "propertyID": "https://www.wikidata.org/w/index.php?search={{ typeOfData }}",

              {# 
              If there are many types of data, we have to just search since we can't be confident
              that it matches the wikipedia name
              #}
              "url": "https://en.wikipedia.org/w/index.php?search={{ typeOfData }}",

              {# For USGS, ['unitOfMeasurement']['name'] is not defined, so we use 'symbol' #}
              {% if stream['unitOfMeasurement']['symbol'] %}
              "unitText": "{{ stream['unitOfMeasurement']['symbol'] }}",
              {% endif %}

              {# These need to be hardcoded, qudt does not seem to be output by USGS with pygeoapi #}
              {# In production we would map {{ typeOfData }} to a dict that outputs the well defined qudt value #}
              "qudt:hasQuantityKind": "qudt-quantkinds:VolumeFlowRate",
              "unitCode": "qudt-units:FT3-PER-SEC",
              "measurementTechnique": "observation",
              "measurementMethod": {
                
                {# Assume gaging stations but this is not provided in the raw jsonld#}
                "name": "{{ typeOfData }} Measurements at Gaging Stations",
                "publisher": "U.S. Geological Survey",
                "url": "https://doi.org/10.3133/tm3A8"
              }
            },
            {% if stream['observedArea'] is defined and stream['observedArea']['phenomenonTime'] %}
              "temporalCoverage": "{{ stream['observedArea']['phenomenonTime'] }}",
            {% endif %}

            {# dc and dcat are not provided in the raw jsonld, must be hardcoded #}
            "dc:accrualPeriodicity": "freq:daily",
            "dcat:temporalResolution": {"@value":"PT15M","@type":"xsd:duration"},
            "distribution": [
              {
                "@type": "DataDownload",
                "name": "USGS Instantaneous Values Service",

                {#`sites` is the same as the Thing id but the hyphen is replaced by a colon. if there is no hyphen, then you just pipe in the thing id  #}
                {# We then need to remove the surrounding '' to make sure the query is properly formatted #}
                "contentUrl": "https://waterservices.usgs.gov/nwis/iv/?sites={{data['id'] | replace("-", ":" ) | replace("'", "")}}&parameterCd={{ stream["properties"]["ParameterCode"] }}&format=rdb",
                "encodingFormat": [
                  "text/tab-separated-values"
                ],
                "dc:conformsTo": "https://pubs.usgs.gov/of/2003/ofr03123/6.4rdb_format.pdf"
              },
              {
                "@type": "DataDownload",
                "name": "USGS SensorThings API",
                "contentUrl": "https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('{{stream['@iot.id']}}')?$expand=Thing,Observations",
                "encodingFormat": [
                  "application/json"
                ],
                "dc:conformsTo": "https://labs.waterdata.usgs.gov/docs/sensorthings/index.html"
              }
            ]
          }
        {% if not loop.last %},{% endif %}
        {% endwith %} 
        {% endfor %}
      ]
}
  ```
  </TabItem>

    <TabItem value="full" label="Step 3: Apply the template via our pygeoapi config">

Once we have started to create our template, we need to apply it to the raw JSON-LD output so we can verify our results are expected and fix on any errors we may have made while templating.

To do this, add a `linked-data:` section to our pygeoapi config which links to the template we want to use when outputting our JSON-LD data for that particular collection.


```yml local.config.yml
  # ... Rest of configuration file abbreviated for brevity
  USGS-LocationOriented/Things:
    type: collection
    title: Location oriented JSON-LD output for USGS Sensor Things code
    description: United States Geological Survey (USGS.) SensorThings API
    keywords:
      - Things
      - SensorThings
      - USGS

    # New section for linked data templating
    linked-data:
      item_template: usgs-location-oriented.j2

    links:
      - type: application/html
        rel: canonical
        title: data source
        href: https://labs.waterdata.usgs.gov
        hreflang: en-US
    extents:
      spatial:
        bbox: [-170, 15, -51, 72]
        crs: http://www.opengis.net/def/crs/OGC/1.3/CRS84
      temporal:
        begin: null
        end: null
    providers:
      - type: feature
        name: SensorThings
        data: https://labs.waterdata.usgs.gov/sta/v1.1/Things
```
  </TabItem>

  <TabItem value="templated" label="Step 4: Verify custom templated JSON-LD">
  
  Now that we have templated our data, we can visit the JSON-LD endpoint at http://localhost:5000/collections/USGS-LocationOriented/Things/items/'AR008-331856091114601'?f=jsonld and it should now output the data in our new format. 

:::warning

You may have to rebuild the pygeoapi docker image to reapply the configuration if you are not finding it still shows old data.

:::

  ```json
{
    "@context":{
        "@vocab":"https://schema.org/",
        "xsd":"https://www.w3.org/TR/xmlschema-2/#",
        "rdfs":"http://www.w3.org/2000/01/rdf-schema#",
        "dc":"http://purl.org/dc/terms/",
        "dcat":"https://www.w3.org/ns/dcat#",
        "freq":"http://purl.org/cld/freq/",
        "qudt":"http://qudt.org/schema/qudt/",
        "qudt-units":"http://qudt.org/vocab/unit/",
        "qudt-quantkinds":"http://qudt.org/vocab/quantitykind/",
        "gsp":"http://www.opengis.net/ont/geosparql#",
        "locType":"http://vocabulary.odm2.org/sitetype",
        "odm2var":"http://vocabulary.odm2.org/variablename/",
        "odm2varType":"http://vocabulary.odm2.org/variabletype/",
        "hyf":"https://www.opengis.net/def/schema/hy_features/hyf/",
        "skos":"https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType",
        "ssn":"http://www.w3.org/ns/ssn/",
        "ssn-system":"http://www.w3.org/ns/ssn/systems/"
    },
    "@id":"http://localhost:5000/collections/USGS-LocationOriented/Things/items/'AR008-331856091114601'",
    "@type":[
        "hyf:HY_HydrometricFeature",
        "hyf:HY_HydroLocation",
        "locType:stream"
    ],
    "hyf:HydroLocationType":"hydrometric station",
    "sameAs":{
        "@id":"https://geoconnex.us/ref/gages/"
    },
    "identifier":{
        "@type":"PropertyValue",
        "propertyID":"USGS site number",
        "value":"331856091114601"
    },
    "name":"AR008-331856091114601",
    "provider":{
        "url":"https://waterdata.usgs.gov",
        "@type":"GovernmentOrganization",
        "name":"U.S. Geological Survey Water Data for the Nation"
    },
    "geo":{
        "@type":"schema:GeoCoordinates",
        "schema:longitude":-91.1969333333333,
        "schema:latitude":33.3169611111111
    },
    "gsp:hasGeometry":{
        "@type":"http://www.opengis.net/ont/sf#Point",
        "gsp:asWKT":{
            "@type":"http://www.opengis.net/ont/geosparql#wktLiteral",
            "@value":"POINT (-91.1969333333333 33.3169611111111)"
        },
        "gsp:crs":{
            "@id":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"
        }
    },
    "subjectOf":[
        {
            "@type":"Dataset",
            "name":"Flow rate data from USGS Monitoring Location AR008-331856091114601",
            "description":"Flow rate, well / AR008-331856091114601-177000bd9f6c45e5909c1729e4aab7b0",
            "provider":{
                "url":"https://waterdata.usgs.gov",
                "@type":"GovernmentOrganization",
                "name":"U.S. Geological Survey Water Data for the Nation"
            },
            "url":"https://waterdata.usgs.gov/monitoring-location/08282300/#parameterCode=00058",
            "variableMeasured":{
                "@type":"PropertyValue",
                "name":"Flow rate",
                "description":"Flow rate in US Gal/min",
                "propertyID":"https://www.wikidata.org/w/index.php?search=Flow rate",
                "url":"https://en.wikipedia.org/w/index.php?search=Flow rate",
                "unitText":"US Gal/min",
                "qudt:hasQuantityKind":"qudt-quantkinds:VolumeFlowRate",
                "unitCode":"qudt-units:FT3-PER-SEC",
                "measurementTechnique":"observation",
                "measurementMethod":{
                    "name":"Flow rate Measurements at Gaging Stations",
                    "publisher":"U.S. Geological Survey",
                    "url":"https://doi.org/10.3133/tm3A8"
                }
            },
            "dc:accrualPeriodicity":"freq:daily",
            "dcat:temporalResolution":{
                "@value":"PT15M",
                "@type":"xsd:duration"
            },
            "distribution":[
                {
                    "@type":"DataDownload",
                    "name":"USGS Instantaneous Values Service",
                    "contentUrl":"https://waterservices.usgs.gov/nwis/iv/?sites=AR008:331856091114601&parameterCd=00058&format=rdb",
                    "encodingFormat":[
                        "text/tab-separated-values"
                    ],
                    "dc:conformsTo":"https://pubs.usgs.gov/of/2003/ofr03123/6.4rdb_format.pdf"
                },
                {
                    "@type":"DataDownload",
                    "name":"USGS SensorThings API",
                    "contentUrl":"https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('177000bd9f6c45e5909c1729e4aab7b0')?$expand=Thing,Observations",
                    "encodingFormat":[
                        "application/json"
                    ],
                    "dc:conformsTo":"https://labs.waterdata.usgs.gov/docs/sensorthings/index.html"
                }
            ]
        },
        {
            "@type":"Dataset",
            "name":"Flow rate data from USGS Monitoring Location AR008-331856091114601",
            "description":"Precipitation, total, inches / AR008-331856091114601-9aa77f35cea344a4a0e5715e05d057c3",
            "provider":{
                "url":"https://waterdata.usgs.gov",
                "@type":"GovernmentOrganization",
                "name":"U.S. Geological Survey Water Data for the Nation"
            },
            "url":"https://waterdata.usgs.gov/monitoring-location/08282300/#parameterCode=00045",
            "variableMeasured":{
                "@type":"PropertyValue",
                "name":"Precipitation",
                "description":"Precipitation in in",
                "propertyID":"https://www.wikidata.org/w/index.php?search=Precipitation",
                "url":"https://en.wikipedia.org/w/index.php?search=Precipitation",
                "unitText":"in",
                "qudt:hasQuantityKind":"qudt-quantkinds:VolumeFlowRate",
                "unitCode":"qudt-units:FT3-PER-SEC",
                "measurementTechnique":"observation",
                "measurementMethod":{
                    "name":"Precipitation Measurements at Gaging Stations",
                    "publisher":"U.S. Geological Survey",
                    "url":"https://doi.org/10.3133/tm3A8"
                }
            },
            "dc:accrualPeriodicity":"freq:daily",
            "dcat:temporalResolution":{
                "@value":"PT15M",
                "@type":"xsd:duration"
            },
            "distribution":[
                {
                    "@type":"DataDownload",
                    "name":"USGS Instantaneous Values Service",
                    "contentUrl":"https://waterservices.usgs.gov/nwis/iv/?sites=AR008:331856091114601&parameterCd=00045&format=rdb",
                    "encodingFormat":[
                        "text/tab-separated-values"
                    ],
                    "dc:conformsTo":"https://pubs.usgs.gov/of/2003/ofr03123/6.4rdb_format.pdf"
                },
                {
                    "@type":"DataDownload",
                    "name":"USGS SensorThings API",
                    "contentUrl":"https://labs.waterdata.usgs.gov/sta/v1.1/Datastreams('9aa77f35cea344a4a0e5715e05d057c3')?$expand=Thing,Observations",
                    "encodingFormat":[
                        "application/json"
                    ],
                    "dc:conformsTo":"https://labs.waterdata.usgs.gov/docs/sensorthings/index.html"
                }
            ]
        }
    ]
}
  ```
  </TabItem>

</Tabs>
