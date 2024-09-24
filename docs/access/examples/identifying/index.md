---
sidebar_position: 2
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Identifying features and their spatial geometry

The Geoconnex Reference Feature server is a source for identifiers and geometries for real-world features that many organizations may collect and publish data about. The attributes of these features vary, but all include a "uri" which serves as a [persistent identifer](/contributing/minting). First, let's discover what kinds of features are available:


<Tabs groupId="lang">
<TabItem value="r" label="R" default>

```r
url <- paste0(base_url, "/collections?f=json")
collections <- jsonlite::fromJSON(url)
datatable(collections$collections)
```

</TabItem>
<TabItem value="py" label="Python">

```py
url = "https://reference.geoconnex.us/collections?f=json"

# Fetch the JSON data from the URL
response = requests.get(url)
data = response.json()

# Convert the collections data to a DataFrame
collections_df = pd.DataFrame(data['collections'])
collections_df
```

</TabItem>
</Tabs>

```
| id   | title | description                                                   | keywords                        | links                                                             | extent                                                                 | itemType | crs                                               | storageCRS                                     |
|------|-------|---------------------------------------------------------------|---------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------------|----------|---------------------------------------------------|-------------------------------------------------|
| hu02 | HU02  | Two-digit Hydrologic Regions from USGS NHDPlus...            | [Hydrologic Regions, USGS]     | [{'type': 'application/html', 'rel': 'canonical', 'href': ...}]  | {'spatial': {'bbox': [[-170, 15, -51, 72]], 'crs': 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'}} | feature  | [http://www.opengis.net/def/crs/OGC/1.3/CRS84] | http://www.opengis.net/def/crs/OGC/1.3/CRS84    |
| hu04 | HU04  | Four-digit Hydrologic Subregion from USGS NHDPlus...         | [Hydrologic Subregions, USGS]  | [{'type': 'application/html', 'rel': 'canonical', 'href': ...}]  | {'spatial': {'bbox': [[-170, 15, -51, 72]], 'crs': 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'}} | feature  | [http://www.opengis.net/def/crs/OGC/1.3/CRS84] | http://www.opengis.net/def/crs/OGC/1.3/CRS84    |
| hu06 | HU06  | Six-digit Hydrologic Basins from USGS NHDPlus...             | [Hydrologic Basins, USGS]      | [{'type': 'application/html', 'rel': 'canonical', 'href': ...}]  | {'spatial': {'bbox': [[-170, 15, -51, 72]], 'crs': 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'}} | feature  | [http://www.opengis.net/def/crs/OGC/1.3/CRS84] | http://www.opengis.net/def/crs/OGC/1.3/CRS84    |
| hu08 | HU08  | Eight-digit Hydrologic Subbasins from USGS NHD...            | [Hydrologic Subbasins, USGS]   | [{'type': 'application/html', 'rel': 'canonical', 'href': ...}]  | {'spatial': {'bbox': [[-170, 15, -51, 72]], 'crs': 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'}} | feature  | [http://www.opengis.net/def/crs/OGC/1.3/CRS84] | http://www.opengis.net/def/crs/OGC/1.3/CRS84    |
| hu10 | HU10  | Ten-digit Watersheds from USGS NHDPlus High Re...            | [Watersheds, USGS]             | [{'type': 'application/html', 'rel': 'canonical', 'href': ...}]  | {'spatial': {'bbox': [[-170, 15, -51, 72]], 'crs': 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'}} | feature  | [http://www.opengis.net/def/crs/OGC/1.3/CRS84] | http://www.opengis.net/def/crs/OGC/1.3/CRS84    |
```


We see a number of parameters available, including 
- watershed boundaries like the Hydrologic Unit Codes
- administrative boundaries like counties, states, and public water systems
- hydrologic features like mainstems (rivers) and aquifers
- hydrometric features such as dams and gages. 

The reference feature server lets us find features according to attribute and spatial queries. In general, this is accomplished by passing queries of the form `https://reference.geoconnex.us/collections/<collectionId>/items?filter=`

#
