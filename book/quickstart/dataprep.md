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
4. for surface water sites, the [hydrologic address](../hydroaddress.pdf) on the [National Hydrography Dataset](https://www.usgs.gov/national-hydrography/national-hydrography-dataset) stream network


## Using reference features to add conextual information
Wherever possible, contextual data should be in the form of persistent identifiers for these features. For example, counties are often given as a name, but spelling errors, capitalization or abbreviation differences, and other ambiguities can lead to barriers to iunteroperability between datasets that reference counties.

