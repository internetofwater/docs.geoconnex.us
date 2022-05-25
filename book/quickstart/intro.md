# QUICKSTART


The next sections guide you through the minimum, fastest steps to participate in `geoconnex.us` with a collection of static geospatial files representing locations or areas you have data about. It includes instructions on how to interact with geoconnex.us services through GitHub, install open-source software (pygeoapi) available on GitHub, and deploy this software on the internet (using Google Cloud Platform as an example). 

## Assumptions
This quickstart makes some assumptions that may not be true in your case.

This quickstart assumes that have would like to publish a dataset you have available that in some way represents geospatial locations that have data related to water about them. Typical examples could be water quality monitoring sites, wells, streamgages, water utilities, weather stations, dams, and so on. Presumably, this is true if you are reading this. However, if you don't want to publish a dataset, then we encourage you to read the [Internet of Water report](https://www.aspeninstitute.org/publications/internet-of-water/#:~:text=and%20Environment%20Program-,Internet%20of%20Water:%20Sharing%20and%20Integrating%20Water%20Data%20for%20Sustainability,and%20information%20to%20support%20sustainable) and reconsider!

This quickstart also assumes that you do not currently have a platform that publishes web content about individual [features](https://docs.geoconnex.us/principles/hydrofeatures.html), and you do not have the resources, expertise, time, or desire to implement one customized to your needs in the near future. It offers [pygeoapi](https://docs.geoconnex.us/quickstart/pygeoapi.html) as a free and open-source option to do so. If your data is being published through a web accessible folder or API, then it may be relatively simple for you to create [landing pages](https://docs.geoconnex.us/principles/lc.html) using your own web development tooling if you have not already done so. If you already publish some kind of web site/ data portal with feature-specific landing pages, then you only need to modify your landing pages to [include structure metadata formatted as JSON-LD](https://docs.geoconnex.us/principles/jsonld.html) and [mint persistent identifiers](https://docs.geoconnex.us/principles/pids.html) for those pages.



## The steps

By following this quickstart, you will be able quickly publish [landing pages](https://docs.geoconnex.us/principles/lc.html) with [embedded JSON-LD](https://docs.geoconnex.us/principles/jsonld.html) about each [feature](https://docs.geoconnex.us/principles/hydrofeatures.html) you have data about, and register [persistent identifiers](https://docs.geoconnex.us/principles/pids.html) them, allowing them to be harvested into the [knowledge graph](https://docs.geoconnex.us/content/intro.html).

1. [Creating an identifier scheme](https://docs.geoconnex.us/quickstart/idscheme.html)
2. [Data preparation](https://docs.geoconnex.us/quickstart/dataprep.html)
3. [Deploying landing pages with JSON-LD using pygeoapi](https://docs.geoconnex.us/quickstart/pygeoapi.html)
4. [Minting persistent identifiers with the geoconnex.us GitHub repository](https://docs.geoconnex.us/quickstart/mintpids.html)
