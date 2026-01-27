
# Exposing your data as JSON-LD 

Geoconnex can crawl data from any url with a valid HTML landing page and data output as JSON-LD in the header tag. You can create a custom solution for your data yourself or you can use pygeoapi, a free open-source tool, for the extract-transform-load (ETL) process to create a wrapper over your data and fulfill these requirements.


import DocCardList from '@theme/DocCardList';

You have two main options for how to expose your data depending on your organization's technical capacity.

<DocCardList />

Once you are finished, you should have a JSON-LD document in the head of your HTML page, analogous to the following example:

:::note

For a more detailed description of the JSON-LD output expected by Geoconnex, see [the JSON-LD reference section](../../reference/data-formats/jsonld/overview.md).

:::


```json
<script type="application/ld+json"> 
{
  "@context": {
    "@vocab": "https://schema.org/",
    "ex": "https://example.com/schema/",
    "locType": "https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocationType"
  },
  "@id": "https://example.com/well/1234",
  "@type": "Place",
  "name": "Well 1234",
  "description": "Well at 1234 Place St., USA",
  "locType": "well",
  "subjectOf": {
    "@id": "https://datasystem.org/dataset1",
    "@type": "Dataset",
    "name": "Well Locations Dataset",
    "ex:recordCount": 500
  }
}
<script> 
```

