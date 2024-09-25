import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Spatial Queries

## Bounding box

We can also do spatial queries, using [bounding box](https://wiki.openstreetmap.org/wiki/Bounding_box) queries (in the format `min lon, min lat, max lon, max lat`) or by passing [WKT-encoded geometry](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry). Let's say we want to find all Public Water Systems within a bounding box around the four-corners region.

<Tabs groupId="lang">
<TabItem value="r" label="R">
```r
# Define the bounding box for the Four Corners area
# Format: (min Longitude, min Latitude, max Longitude, max Latitude)
bbox <- c(-109.5, 36.5, -107.5, 37.5)
# Construct the URL with the bbox parameter
url <- paste0(base_url, "/collections/pws/items?f=json&bbox=", paste(bbox, collapse = ","))
# Read the data into an sf object
four_corners_pws <- st_read(url, quiet = TRUE)
# Display summary of the results
cat("Number of Public Water Systems found:", nrow(four_corners_pws), "\n")
# Create an interactive table of the results
four_corners_pws |>
  st_drop_geometry() |>
  select(uri, pws_name, population_served_count) |>
  arrange(desc(population_served_count)) |>
  datatable(
    options = list(pageLength = 5, scrollX = TRUE),
    caption = "Public Water Systems in the Four Corners Area",
    rownames = FALSE
  )
# Create a map view of the results
m <- mapview(four_corners_pws, zcol = "population_served_count", layer.name = "Population Served", label= "pws_name")
# Add the bounding box to the map
bbox_poly <- st_as_sf(st_as_sfc(st_bbox(c(xmin = bbox[1], ymin = bbox[2], xmax = bbox[3], ymax = bbox[4]), crs = 4326)))
m + mapview(bbox_poly, col.region = "red", alpha.regions=0, color="red", lwd=2, layer.name = "Query Bounding Box")
```

<iframe src='/html/r/four-corners-pws.html' style={{width: "100%", height: "500px"}}></iframe>

</TabItem>
<TabItem value="py" label="Python">
```py
# Define the base URL
base_url = "https://reference.geoconnex.us"

# Define the bounding box for the Four Corners area
# Format: (min Longitude, min Latitude, max Longitude, max Latitude)
bbox = (-109.5, 36.5, -107.5, 37.5)

# Construct the URL with the bbox parameter
url = f"{base_url}/collections/pws/items?f=json&bbox={','.join(map(str, bbox))}"

# Read the data into a GeoDataFrame
four_corners_pws = gpd.read_file(url)

# Display summary of the results
print("Number of Public Water Systems found:", len(four_corners_pws))

# Create a Folium map centered around the bounding box
m = folium.Map(location=[(bbox[1] + bbox[3]) / 2, (bbox[0] + bbox[2]) / 2], zoom_start=8)

# Define a color scale based on population served
def get_color(population):
    if population < 1000:
        return 'green'
    elif population < 5000:
        return 'yellow'
    elif population < 10000:
        return 'orange'
    else:
        return 'red'

# Add GeoJson layers for each public water system
for _, row in four_corners_pws.iterrows():
    folium.GeoJson(
        row.geometry,
        tooltip=f"{row['pws_name']}<br>Population Served: {row['population_served_count']}",
        style_function=lambda feature, population=row['population_served_count']: {
            'fillColor': get_color(population),
            'color': 'black',
            'weight': 2,
            'fillOpacity': 0.6,
        }
    ).add_to(m)

# Draw the bounding box on the map
bounding_box = box(bbox[0], bbox[1], bbox[2], bbox[3])
folium.GeoJson(bounding_box).add_to(m)

# Create a legend
legend_html = '''
    <div style="position: fixed; 
                bottom: 50px; left: 50px; 
                width: 150px; height: auto; 
                border:2px solid grey; 
                z-index:9999; 
                font-size:14px;
                background-color:white;
                padding: 10px;">
    <b>Population Served</b><br>
    <i style="background: green;">&nbsp;&nbsp;&nbsp;</i> Less than 1,000<br>
    <i style="background: yellow;">&nbsp;&nbsp;&nbsp;</i> 1,000 - 5,000<br>
    <i style="background: orange;">&nbsp;&nbsp;&nbsp;</i> 5,000 - 10,000<br>
    <i style="background: red;">&nbsp;&nbsp;&nbsp;</i> More than 10,000<br>
    </div>
'''

# Add the legend to the map
m.get_root().html.add_child(folium.Element(legend_html))
```
<iframe src='/html/python/four-corners-pws.html' style={{width: "100%", height: "500px"}}></iframe>
</TabItem>
</Tabs>

### Intersection

When it comes to spatial queries, we are not restricted to bounding box queries. We can pass any spatial predicate along with WKT geometries to a collection filter. Let's say we have several field sites near Farmington, NM, and we want to identify which HUC10 watersheds they fall within. We'll use the point-in-polygon query capability of the INTERECTS spatial; predicate to find this information:

<Tabs groupId="lang">
<TabItem value="r" label="R">

```r
# Define our field site (example coordinate near Farmington, NM)
site_lon <- -108.2186
site_lat <- 36.7280
# Construct the query
query <- sprintf("INTERSECTS(geometry, POINT(%f %f))", site_lon, site_lat) |> URLencode()
url <- paste0(base_url, "/collections/hu10/items?f=json&filter=", query)
# Make the API call
huc10 <- st_read(url, quiet = TRUE) |>
  select(id,uri,name)
# Display the results table
datatable(huc10)
# Create a map
site_point <- st_point(c(site_lon, site_lat)) |> 
  st_sfc(crs = 4326) |>
  st_sf()
mapview(huc10, zcol = "name", layer.name = "HUC10 Watershed") +
  mapview(site_point, col.regions = "red", layer.name = "Field Site")
```
<iframe src='/html/r/huc10-intersects.html' style={{width: "100%", height: "500px"}}></iframe>
</TabItem>
<TabItem value="py" label="Python">

```python
# Define the base URL
base_url = "https://reference.geoconnex.us"

# Define the field site (example coordinate near Farmington, NM)
site_lon = -108.2186
site_lat = 36.7280

# Construct the query
query = f"INTERSECTS(geometry, POINT({site_lon} {site_lat}))"
encoded_query = urllib.parse.quote(query)  # URL encode the query
url = f"{base_url}/collections/hu10/items?f=json&filter={encoded_query}"

# Make the API call and read the data into a GeoDataFrame
huc10 = gpd.read_file(url)

# Select relevant columns
huc10 = huc10[['id', 'uri', 'name', 'geometry']]

# Display the results table
print(huc10)

# Create a map centered around the field site
m = folium.Map(location=[site_lat, site_lon], zoom_start=10)

# Create a Folium feature for the field site
site_point = Point(site_lon, site_lat)

# Add the HUC10 areas to the map
for _, row in huc10.iterrows():
    folium.GeoJson(
        row['geometry'],  # Access the geometry directly from the row
        tooltip=f"HUC10 Name: {row['name']}",
        style_function=lambda feature: {
            'fillColor': 'blue',  # You can customize the color as needed
            'color': 'black',
            'weight': 2,
            'fillOpacity': 0.4,
        }
    ).add_to(m)

# Add the field site point to the map
folium.Marker(
    location=[site_lat, site_lon],
    popup="Field Site",
    icon=folium.Icon(color='red')
).add_to(m)
```

<iframe src='/html/python/huc10-intersects.html' style={{width: "100%", height: "500px"}}></iframe>
</TabItem>
</Tabs>

Here we see that our field site is in the HUC10 1408010505, which has the associated Geoconnex URI https://geoconnex.us/ref/hu10/1408010505. This identifier can be used if we were to publish data about our site, following [Geoconenx guidance and best practices](https://docs.geoconnex.us/contributing/step-1/dataprep).

### Intersection by URL reference

Complex features can have many coordinates, and thus requests via `?filter` to the API can be too long to format as URL. To get around this, the API supports a special intersection process that involves passing a URL for any GeoJSON feature to a collection. Let's say we want to know which counties intersect the Animas River (https://geoconnex.us/ref/mainstems/35394).

<Tabs groupId="lang">
<TabItem value="r" label="R">
```r
# Define the process endpoint
process_url <- "https://reference.geoconnex.us/processes/intersector/execution"
# Define the input parameters
input_params <- list(
  inputs = list(
    url = "https://geoconnex.us/ref/mainstems/35394",
    collection = "counties"
  )
)
# Execute the process
response <- POST(
  url = process_url,
  body = toJSON(input_params, auto_unbox = TRUE),
  add_headers("Content-Type" = "application/json"),
  encode = "json"
)
  # Convert the result to an sf object
  intersecting_counties <- st_read(response, quiet = TRUE)
  
  
  # Create an interactive table of the results
  intersecting_counties |>
    st_drop_geometry() |>
    select(name, uri) |>
    datatable(
      options = list(pageLength = 5, scrollX = TRUE),
      caption = "Counties Intersecting the Animas River"
    )
  
  # Fetch the Animas River geometry
  animas_river <- st_read("https://geoconnex.us/ref/mainstems/35394", quiet = TRUE)
  
  # Create a map view of the results
  mapview(intersecting_counties, zcol = "name", layer.name = "Intersecting Counties") +
    mapview(animas_river, color = "blue", layer.name = "Animas River")
```
<iframe src='/html/r/intersect-url.html' style={{width: "100%", height: "500px"}}></iframe>
</TabItem>
<TabItem value="py" label="Python">

```python
import requests
import geopandas as gpd
import json
import folium

# Define the process endpoint
process_url = "https://reference.geoconnex.us/processes/intersector/execution"

# Define the input parameters
input_params = {
    "inputs": {
        "url": "https://geoconnex.us/ref/mainstems/35394",
        "collection": "counties"
    }
}

# Execute the process
response = requests.post(
    url=process_url,
    data=json.dumps(input_params),
    headers={"Content-Type": "application/json"}
)

# Convert the result to a GeoDataFrame
intersecting_counties = gpd.read_file(response.text)

# Drop geometry and select relevant columns
intersecting_counties_table = intersecting_counties[['name', 'uri']]

# Create a DataFrame display (in a Jupyter Notebook, use display() for better formatting)
print(intersecting_counties_table)

# Fetch the Animas River geometry
animas_river = gpd.read_file("https://geoconnex.us/ref/mainstems/35394")

# Create a map view of the results
m = folium.Map(location=[intersecting_counties.geometry.centroid.y.mean(), 
                            intersecting_counties.geometry.centroid.x.mean()], 
                zoom_start=8)

# Add intersecting counties to the map
folium.GeoJson(intersecting_counties).add_to(m)

# Add Animas River to the map
folium.GeoJson(animas_river, style_function=lambda x: {'color': 'blue'}).add_to(m)

# Create a custom legend
legend_html = """
<div style="position: fixed; 
                bottom: 50px; left: 50px; width: 200px; height: auto; 
                border:2px solid grey; z-index:9999; font-size:14px;
                background-color: white;
                padding: 10px;">
<h4>Intersecting Counties</h4>
"""

for _, row in intersecting_counties.iterrows():
    legend_html += f'<div style="color: black;">{row["name"]}</div>'

legend_html += "</div>"

# Add the legend to the map
m.get_root().html.add_child(folium.Element(legend_html))
```

<iframe src='/html/python/intersect-url.html' style={{width: "100%", height: "500px"}}></iframe>

</TabItem>
</Tabs>

Note that of the three counties intersecting the Animas River, two are named "San Juan": https://geoconnex.us/ref/counties/08111 in Colorado, and https://geoconnex.us/ref/counties/35045 in New Mexico, highlighting the importance of unique identifiers and the usefulness of HTTP identifiers that direct to spatial/data representations of a given feature.
