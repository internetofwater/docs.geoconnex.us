---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Finding hydrologically related features

One of Geoconnex's main use cases is to support the discovery of hydrologically related monitoring locations. That's why one of the key uses of the Geoconnex API is to serve relationships between key hydrometric locations like dams, streamgages, and mainstem rivers.  Both the `dams` and `gages` collections include the attributes:
- `mainstem_uri` that allows one to find all such features that are on a given mainstem. 
- `subjectof` that directs to the URL of a source data system's record about the dam or streamgage. 

Below we demonstrate finding all dams and gages on the Animas River:

<Tabs groupId="lang">
<TabItem value="r" label="R" default >
```r
# Animas River mainstem URI
animas_uri <- "https://geoconnex.us/ref/mainstems/35394"
# Function to query features by mainstem URI
query_by_mainstem <- function(collection, mainstem_uri) {
  query <- URLencode(sprintf("mainstem_uri = '%s'", mainstem_uri))
  url <- paste0(base_url, "/collections/", collection, "/items?f=json&filter=", query)
  st_read(url, quiet = TRUE)
}
# Query dams and gages
animas_dams <- query_by_mainstem("dams", animas_uri)
animas_gages <- query_by_mainstem("gages", animas_uri)
# Function to create a hyperlink in HTML
create_link <- function(url) {
  ifelse(!is.na(url) & url != "",
         sprintf('<a href="%s" target="_blank">Link</a>', url),
         "N/A")
}
# Create interactive tables
animas_dams <- animas_dams |>
  mutate(subjectof = sapply(subjectof, create_link)) 
datatable(animas_dams, options = list(pageLength = 5, scrollX = TRUE),
            caption = "Dams on the Animas River",
            escape = FALSE)  # Allow HTML in the table
animas_gages <- animas_gages |>
  select(uri, name, subjectof) |>
  mutate(subjectof = sapply(subjectof, create_link))
datatable(animas_gages,options = list(pageLength = 5, scrollX = TRUE),
            caption = "Gages on the Animas River",
            escape = FALSE)  # Allow HTML in the table
# Fetch the Animas River geometry
animas_river <- st_read(animas_uri, quiet = TRUE)
# Create a map view of the results
mapview(animas_river, color = "blue", layer.name = "Animas River") +
  mapview(animas_dams, col.regions = "red", layer.name = "Dams") +
  mapview(animas_gages, col.regions = "green", layer.name = "Gages")
```

<iframe src='/html/r/gages-on-river.html' style={{width: "100%", height: "500px"}}></iframe>
</TabItem>


  <TabItem value="python" label="Python" default>
```py
import requests
import pandas as pd
import geopandas as gpd
from urllib.parse import quote
import folium
from folium import Element

# Base URL
base_url = "https://reference.geoconnex.us"

# Animas River mainstem URI
animas_uri = "https://geoconnex.us/ref/mainstems/35394"

# Function to query features by mainstem URI
def query_by_mainstem(collection, mainstem_uri):
    query = f"mainstem_uri = '{mainstem_uri}'"
    url = f"{base_url}/collections/{collection}/items?f=json&filter={quote(query)}"
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for bad responses
    return gpd.read_file(url)

# Query dams and gages
animas_dams = query_by_mainstem("dams", animas_uri)
animas_gages = query_by_mainstem("gages", animas_uri)

# Function to create a hyperlink in HTML
def create_link(url):
    if pd.notna(url) and url != "":
        return f'<a href="{url}" target="_blank">Link</a>'
    return "N/A"

# Create interactive tables
animas_dams['subjectof'] = animas_dams['subjectof'].apply(create_link)

# Use HTML for display
animas_dams_html = animas_dams[['uri', 'name', 'subjectof']].to_html(escape=False, index=False)
animas_gages['subjectof'] = animas_gages['subjectof'].apply(create_link)
animas_gages_html = animas_gages[['uri', 'name', 'subjectof']].to_html(escape=False, index=False)

# Display data tables (this would typically be in a Jupyter Notebook or web app)
print("Dams on the Animas River:")
display(HTML(animas_dams_html))  # Use display from IPython.display if in Jupyter
print("Gages on the Animas River:")
display(HTML(animas_gages_html))  # Use display from IPython.display if in Jupyter

# Fetch the Animas River geometry
animas_river = gpd.read_file(animas_uri)

# Create a map view of the results
m = folium.Map(location=[animas_river.geometry.centroid.y, animas_river.geometry.centroid.x], zoom_start=10)

# Add Animas River
folium.GeoJson(animas_river, style_function=lambda x: {'color': 'blue', 'weight': 2}).add_to(m)

# Add dams
for _, row in animas_dams.iterrows():
    folium.Marker(
        location=[row.geometry.y, row.geometry.x],
        popup=row['subjectof'],
        icon=folium.Icon(color='red', icon='water')
    ).add_to(m)

# Add gages
for _, row in animas_gages.iterrows():
    folium.Marker(
        location=[row.geometry.y, row.geometry.x],
        popup=row['subjectof'],
        icon=folium.Icon(color='green', icon='info-sign')
    ).add_to(m)

# Create a legend
legend_html = """
<div style="position: fixed; 
     top: 10px; right: 10px; width: 150px; height: auto; 
     border:2px solid grey; background-color: white; 
     z-index: 1000; padding: 10px;">
     <h4>Legend</h4>
     <i class="fa fa-circle" style="color:red"></i>&nbsp; Dams<br>
     <i class="fa fa-circle" style="color:green"></i>&nbsp; Gages<br>
</div>
"""

# Add legend to map
m.get_root().html.add_child(Element(legend_html))
m.save('../../../static/html/python/intersect-url.html')
m
```
<iframe src='/html/python/intersect-url.html' style={{width: "100%", height: "500px"}}></iframe>

</TabItem>
</Tabs>

