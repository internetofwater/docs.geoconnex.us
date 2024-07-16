# Data preparation

In this section, we guide through how to create a dataset suitable to use with our open-source tool based on [pygeoapi](https://pygeoapi.io), which will generate landing pages with embedded JSON-LD.

## Adding contextual information
To be most useful to the wider water data community, locations should have both descriptive and contextual information in the data published to geoconnex.us. Some useful descriptive information could include:

1. identifier
2. Location geometry (point or polygon latitude/longitude, preferably in WGS84)
3. short name
4. long name or description 
5. organization
6. **URLs where observed or modeled data about the location can be accessed** This is of particularly great interest where available.


Contextual information could include:

1. administrative geographies it is within (e.g. census tract, municipality, county, state, PLSS section)
2. watershed boundary it is within (e.g. HUC12)
3. for groundwater sites, relevant aquifers
4. a relevant reference location. Many organizations publish data about the same feature, such as a common monitoring location that may serve as a streamgage, a water quality sampling site, as well as being fixed on a dam or bridge. 
5. for surface water sites, the [hydrologic address](https://github.com/internetofwater/docs.geoconnex.us/raw/main/book/hydroaddress.pdf) on the [National Hydrography Dataset](https://www.usgs.gov/national-hydrography/national-hydrography-dataset) stream network



### Using reference cataloging features to add contextual information
Wherever possible, contextual data should be in the form of persistent identifiers (PIDs) for these features. For example, counties are often given as a name, but spelling errors, capitalization or abbreviation differences, and other ambiguities can lead to barriers to interoperability between datasets that reference counties. In addition, these PIDs are already members of the knowledge graph, making adding your data to the knowledge graph simpler and more meaningful. Some sources for PIDs for these contextual features are provided at reference.geoconnex.us/collections . Some common patterns include:

* **states**: `https://geoconnex.us/ref/states/{2-digit FIPS}` e.g. https://geoconnex.us/ref/states/48 for Texas
* **counties**: `https://geoconnex.us/ref/counties/{5-digit FIPS}` e.g. https://geoconnex.us/ref/counties/06037 for Los Angeles county
* **HUC12**: `https://geoconnex.us/nhdplusv2/huc12/{12-digit HUC12 code}` e.g. https://geoconnex.us/nhdplusv2/huc12/030300020607 for the Morgan Creek HUC12
* **HUC2-10**: `https://geoconnex.us/ref/hu{02,04,06,08,10}/{2-10 - digit HUC2 - 10 code}`e.g. https://geoconnex.us/ref/hu08/06010105 for the Upper French Broad HUC8
* **Mainstem River** example: https://geoconnex.us/ref/mainstems/2104867 for the Hudson River
* **Secondary Hydrogeologic Regions** example https://geoconnex.us/ref/sec_hydrg_reg/S50

### Using reference locations to link to other data about the same location
Since many organizations publish data about the same feature, it is useful for these organizations to link their relevant data to a common identifier for that feature. The geoconnex project currently maintains two sets of reference location identifiers:

* **Reference gages** for all surface stream monitoring locations (whether streamgages in the traditional sense or any water sampling site). These take the form `https://geoconnex.us/ref/gages/{7-digit integer}` e.g. https://geoconnex.us/ref/gages/1000001
* **Reference dams** for all artificial dams impounding water bodies. These take the form `https://geoconnex.us/ref/dams/{7-digit-integer}` e.g. https://geoconnex.us/ref/dams/1000001

Note that these identifiers have somewhat arbitrary schemes that are maintained independently of the identifiers of common national "authoritative" datasets such as USGS [Gages II](https://water.usgs.gov/GIS/metadata/usgswrd/XML/gagesII_Sept2011.xml) or the USACE [National Inventory of Dams](https://nid.usace.army.mil/#/) in order to accomodate features that are not (yet) included in these datasets, and to handle persistence in the case where these systems sometimes change identifiers for a given real-world feature.

### Using NHDPlus identifiers to represent hydrologic addresses

By using persistent identifiers for NHDPlus features, you can represent your locations' spot on versions of NHDPlus in a way that eliminates ambiguity as to which version of the NHD the address pertains to, as well as reduce common errors such as failing to include leading 0's in reachcodes. 

* **NHDPlusV2 comid** example: https://geoconnex.us/nhdplusv2/comid/13293480
* **NHDPlusV2 reachcode** example: https://geoconnex.us/nhdplusv2/reachcode/12040104000071


## Example: 

Below is an example table based on streamgages with data published at the [California Data Exchange Center](https://cdec.water.ca.gov/riv_flows.html) The table is also available for download as a csv [here](https://github.com/internetofwater/docs.geoconnex.us/raw/main/book/quickstart/dataprep_example.csv). Note the inclusion of descriptive information, links to various reference features, and the `data_url` linking to the CDEC data system entrypoint for each site. 

```{list-table} Example monitoring location tabular data for geoconnex
:header-rows: 1
:name: Example Data

* - uri
  - id
  - name
  - organization
  - data_url
  - latitude
  - longitude
  - reachcode_nhdpv2
  - measure_nhdpv2
  - mainstem_river
  - reference_gage
* - https://geoconnex.us/ca-gage-assessment/gages/AMC
  - AMC
  - Arcade Creek at Winding Way
  - California Department of Water Resources
  - http://cdec.water.ca.gov/dynamicapp/staMeta?station_id=AMC
  - 38.645447
  - -121.347407
  - https://geoconnex.us/nhdpv2/reachcode/18020111000048
  - 0
  - https://geoconnex.us/ref/mainstems/5147
  - https://geoconnex.us/ref/gages/1185578
* - https://geoconnex.us/ca-gage-assessment/gages/CSW
  - CSW
  - Kings River Below Crescent Weir
  - California Department of Water Resources
  - http://cdec.water.ca.gov/dynamicapp/staMeta?station_id=CSW
  - 36.3863018
  - -119.875615
  - https://geoconnex.us/nhdpv2/reachcode/18030012009243
  - 0
  - https://geoconnex.us/ref/mainstems/1796720
  - https://geoconnex.us/ref/gages/1185619 
```