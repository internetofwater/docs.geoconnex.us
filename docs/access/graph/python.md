# Querying with Python

You can query the Geoconnex graph with Python by creating a sparql query and then optionally manipulating the results locally with an ETL tool such as geopandas.

Since reference features also link to datasets, for some queries you can use the reference features directly and not need to query the graph with sparql.
A general purpose Geoconnex graph query web API for Python is not yet released but is planned to be eventually supported. 


## Examples

This **[jupyter notebook](https://colab.research.google.com/drive/1nzdXrNji72IxCf7XodGEgStyzDES989H?usp=sharing)** provides Python examples for how to answer useful inquiries about hydrologic features using Geoconnex.

This notebook uses sparql queries via the graph, geopandas locally, and the REST web API for Geoconnex reference features. It is useful to be able to use all three options since each come with a different tradeoff.


### Tradeoffs between ways of extracting and manipulating graph data

- Sparql is the most expressive for querying linked data and can return any information in the Geoconnex graph. However, some post processing may need to be done for more complex joins. The syntax may also be less familiar to some users
- Geopandas is popular for geospatial analysis, but requires you to download the data and is less suited for manipulating data with linked relationships
- The Geoconnex reference feature web API has a convenient frontend and an associated REST API, yet is just focused on reference features and thus exposes less data and fewer linked relationships compared to the full graph