# Data preparation

In this section, we guide through how to create a dataset suitable to use with our open-source tool based on [pygeoapi](https://pygeoapi.io), which will generate landing pages with embedded JSON-LD.

To be most useful to the wider water data community, locations should have both descriptive and contextual information in the data published to geoconnex.us. Some useful descriptive information could include:

1. identifier
2. Location geometry (point or polygon latitude/longitude)
3. short name
4. long name or description 
5. organization
6. URLs where observed or modeled data about the location can be accessed


Contextual information could include:

1. administrative geographies it is within (e.g. census tract, municipality, county, state, PLSS section)
2. watershed boundary it is within (e.g. HUC12)
3. for groundwater sites, relevant aquifers
4. for surface water sites, the [hydrologic address](https://github.com/internetofwater/docs.geoconnex.us/raw/main/book/hydroaddress.pdf) on the [National Hydrography Dataset](https://www.usgs.gov/national-hydrography/national-hydrography-dataset) stream network


## Using reference features to add conextual information
Wherever possible, contextual data should be in the form of persistent identifiers (PIDs) for these features. For example, counties are often given as a name, but spelling errors, capitalization or abbreviation differences, and other ambiguities can lead to barriers to interoperability between datasets that reference counties. In addition, these PIDs are already members of the knowledge graph, making adding your data to the knowledge graph simpler and more meaningful. Some sources for PIDs for these contextual features are provided at reference.geoconnex.us/collections . Some common patterns include:

* **states**: `https://geoconnex.us/ref/states/{2-digit FIPS}` e.g. https://geoconnex.us/ref/states/48 for Texas
* **counties**: `https://geoconnex.us/ref/counties/{5-digit FIPS}` e.g. https://geoconnex.us/ref/counties/06037 for Los Angeles county
* **HUC12**: `https://geoconnex.us/nhdplusv2/huc12/{12-digit HUC12 code}` e.g. https://geoconnex.us/nhdplusv2/huc12/030300020607 for the Morgan Creek HUC12
* **HUC2-10**: `https://geoconnex.us/ref/hu{02,04,06,08,10}/{2-10 - digit HUC2 - 10 code}`e.g. https://geoconnex.us/ref/hu08/06010105 for the Upper French Broad HUC8
* **NHDPlusV2 comid** exmaple: `https://geoconnex.us/nhdplusv2/comid/13293480`
* **NHDPlusV2 reachcode** example: `https://geoconnex.us/nhdplusv2/reachcode/12040104000071`

