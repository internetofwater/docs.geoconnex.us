import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Attribute Queries

## Fuzzy text match

Let's say we're interested in a specific river, one we think is called the "Animas river". We can pass an attribute filter query to the `mainstems` collection and then use our dataframe and visualization library to filter and display the results.


<Tabs groupId="lang">
<TabItem value="r" label="R" default>

```r
# construct a query for a river name that includes the string "animas"
query <- URLencode("name_at_outlet ILIKE '%animas%'") 
url <- paste0(base_url, "/collections/mainstems/items?f=json&filter=", query)
# Read the data into an sf object
animas_rivers <- st_read(url, quiet = TRUE) 
# Display the results
animas_rivers |> 
  select(uri, name_at_outlet, outlet_drainagearea_sqkm) |>
  datatable()
# Map the results
mapview(animas_rivers |> 
  select(uri, name_at_outlet), zcol = "name_at_outlet")
```

<iframe src='/html/r/rivers-with-animas-in-name.html' style={{width: "100%", height: "500px"}}></iframe> 

</TabItem>
<TabItem value="py" label="Python">

<!-- #### Get the remote data as a dataframe 
```py
# Construct a query for a river name that includes the string "animas"
query = urllib.parse.quote("name_at_outlet ILIKE '%animas%'")
url = f"{base_url}/collections/mainstems/items?f=json&filter={query}"

# Read the data into a GeoDataFrame
animas_rivers = gpd.read_file(url)

# Display the results
selected_columns = animas_rivers[['uri', 'name_at_outlet', 'outlet_drainagearea_sqkm']]
print(selected_columns)
```

```
| uri                                        | name_at_outlet    | outlet_drainagearea_sqkm |
|--------------------------------------------|--------------------|---------------------------|
| https://geoconnex.us/ref/mainstems/1609859 | Las Animas Creek   | 568.1                     |
| https://geoconnex.us/ref/mainstems/1888173 | Animas Creek       | 1188.8                    |
| https://geoconnex.us/ref/mainstems/35394   | Animas River       | 3488.9                    |
```
#### Display the map  -->

```py
from itertools import cycle

# Define our query
query = urllib.parse.quote("name_at_outlet ILIKE '%animas%'")
# URL to the GeoJSON data
url = f"https://reference.geoconnex.us/collections/mainstems/items?f=json&filter={query}"

# Fetch the GeoJSON data
response = requests.get(url)
data = response.json()

# Calculate map center by averaging coordinates (assumes geometry type is LineString)
coordinates = [feature['geometry']['coordinates'] for feature in data['features']]
all_coords = [coord for sublist in coordinates for coord in sublist]  # Flatten the list
avg_lat = sum(coord[1] for coord in all_coords) / len(all_coords)
avg_lon = sum(coord[0] for coord in all_coords) / len(all_coords)
map_center = (avg_lat, avg_lon)

# Create the map
m = folium.Map(location=map_center, zoom_start=6)

# Define a list of hardcoded colors
hardcoded_colors = ['blue', 'green', 'red', 'orange', 'black', 'purple']
color_cycle = cycle(hardcoded_colors)  # Cycle through the colors

# Add GeoJSON data to the map with tooltips
for feature in data['features']:
    river_name = feature['properties']['name_at_outlet']
    color = next(color_cycle)  # Get the next color from the cycle

    folium.GeoJson(
        feature,
        name=river_name,
        style_function=lambda feature, color=color: {
            'fillColor': color,
            'color': color,
            'weight': 2,
            'fillOpacity': 0.6,
        },
        tooltip=folium.GeoJsonTooltip(fields=['name_at_outlet'], aliases=['River Name:'], localize=True)
    ).add_to(m)

# Define the legend HTML
legend_html = '''
<div style="position: fixed; 
            bottom: 50px; left: 50px; width: 150px; height: auto; 
            padding: 10px; font-size: 14px; z-index:9999; 
            background-color: white; border: 2px solid grey; 
            border-radius: 5px;">
    <h4 style="margin: 0;">Legend</h4>
'''

# Add river names and colors to the legend
for feature in data['features']:
    river_name = feature['properties']['name_at_outlet']
    color = next(color_cycle)  # Get the next color for legend

    legend_html += f'''
    <div style="display: flex; align-items: center;">
        <div style="width: 20px; height: 20px; background-color: {color}; margin-right: 5px;"></div>
        <span>{river_name}</span>
    </div>
    '''

legend_html += '</div>'

# Add the legend to the map
m.get_root().html.add_child(folium.Element(legend_html))

# Display the map
m
```

<iframe src='/html/python/rivers-with-animas-in-name.html' style={{width: "100%", height: "500px"}}></iframe> 

</TabItem>
</Tabs>


There are evidently 3 rivers that include the word "Animas". Let's say we were interested in the "Animas River", shown on the map in Green. We find that it's Geoconnex URI is `https://geoconnex.us/ref/mainstems/35394`.

## Logical and quantitative

We can also do filters based on logical and quantitative filters on attributes. 

Let's say we wanted to find all rivers with drainage areas (in this reference dataset, the attribute is `outlet_drainagearea_sqkm`) greater than 1,000,000 square kilometers:


<Tabs groupId="lang">
<TabItem value="r" label="R">

```r
# construct a query for a river with outlet_drainagearea_sqkm > 600,000
query <- URLencode("outlet_drainagearea_sqkm > 500000")
url <- paste0(base_url, "/collections/mainstems/items?f=json&filter=", query)
# Read the data into an sf object
large_mainstems <- st_read(url, quiet = TRUE)
# Display the results
large_mainstems |> 
  select(uri, name_at_outlet, outlet_drainagearea_sqkm) |>
  datatable()
# Map the results
mapview(large_mainstems, zcol = "name_at_outlet")
```
<iframe src='/html/r/large-rivers.html' style={{width: "100%", height: "500px"}}></iframe> 


</TabItem>
<TabItem value="py" label="Python">


```python
import folium
import requests
from urllib.parse import quote

# Base URL for the API
base_url = "https://reference.geoconnex.us"

# Construct a query for rivers with outlet_drainagearea_sqkm > 500,000
query = "outlet_drainagearea_sqkm > 500000"
encoded_query = quote(query)  # URL encode the query
url = f"{base_url}/collections/mainstems/items?f=json&filter={encoded_query}"

# Fetch the GeoJSON data
response = requests.get(url)
data = response.json()

# Calculate map center by averaging coordinates (assuming geometry type is LineString)
coordinates = [feature['geometry']['coordinates'] for feature in data['features']]
all_coords = [coord for sublist in coordinates for coord in sublist]  # Flatten the list
avg_lat = sum(coord[1] for coord in all_coords) / len(all_coords)
avg_lon = sum(coord[0] for coord in all_coords) / len(all_coords)
map_center = (avg_lat, avg_lon)

# Create the map
m = folium.Map(location=map_center, zoom_start=6)

# Hard-coded list of colors
colors = [
    "#FF5733",  # Red
    "#33FF57",  # Green
    "#3357FF",  # Blue
    "#FF33FF",  # Magenta
    "#FFA500",  # Orange
    "#800080",  # Purple
    "#FFC0CB",  # Pink
    "#A52A2A"   # Brown
]

# Create a dictionary to store river names and their corresponding colors
river_colors = {}

# Add GeoJSON data to the map with tooltips and individual colors
for i, feature in enumerate(data['features']):
    river_name = feature['properties']['name_at_outlet']
    
    # Assign a color based on the index
    river_colors[river_name] = colors[i % len(colors)]
    
    folium.GeoJson(
        feature,
        style_function=lambda x, color=river_colors[river_name]: {
            'color': color,
            'weight': 3,
            'opacity': 0.7,
        },
        tooltip=folium.GeoJsonTooltip(fields=['name_at_outlet', 'outlet_drainagearea_sqkm'],
                                      aliases=['River Name:', 'Drainage Area (sq km):'], localize=True)
    ).add_to(m)

# Create the legend with separate names for each river
legend_html = '''
<div style="position: fixed; 
            bottom: 50px; left: 50px; width: 150px; height: auto; 
            padding: 10px; font-size: 14px; z-index:9999; 
            background-color: white; border: 2px solid grey; 
            border-radius: 5px;">
    <h4 style="margin: 0;">Legend</h4>
'''

# Iterate through river colors to create legend items
for river_name, color in river_colors.items():
    legend_html += f'''
    <div style="display: flex; align-items: center;">
        <div style="width: 20px; height: 20px; background-color: {color}; margin-right: 5px;"></div>
        <span>{river_name}</span>
    </div>
    '''

legend_html += '''
</div>
'''

# Add the legend to the map
m.get_root().html.add_child(folium.Element(legend_html))

# Display the map
m
```

<iframe src='/html/python/large-rivers.html' style={{width: "100%", height: "500px"}}></iframe> 

</TabItem>
</Tabs>






## Combining Queries

Queries over multiple attributes can also be made, combining with `'AND'` or `'OR'`. For example, let's find all dams that include the name "Hoover", but then also filter to only the ones with a drainage area of more than 100,000 square kilometers:


<Tabs groupId="lang">
<TabItem value="r" label="R">
```r
# Step 1: Find all dams named "Hoover"
query_hoover <- URLencode("name LIKE '%Hoover%'")
url_hoover <- paste0(base_url, "/collections/dams/items?f=json&filter=", query_hoover)
hoover_dams <- st_read(url_hoover, quiet = TRUE)
cat("Number of dams named 'Hoover':", nrow(hoover_dams), "\n")
# Create an interactive table of all Hoover dams
datatable(
  hoover_dams |>
    st_drop_geometry() |>
    select(uri, name, drainage_area_sqkm) |>
    arrange(desc(drainage_area_sqkm)),
  options = list(pageLength = 10, scrollX = TRUE),
  caption = "All Dams Named 'Hoover'",
  rownames = FALSE
)
# Step 2: Query for large Hoover dams using a combined filter
query_large_hoover <- URLencode("name LIKE '%Hoover%' AND drainage_area_sqkm > 100000")
url_large_hoover <- paste0(base_url, "/collections/dams/items?f=json&filter=", query_large_hoover)
large_hoover_dams <- st_read(url_large_hoover, quiet = TRUE)
cat("\nNumber of large Hoover dams (Drainage Area > 100,000 sq km):", nrow(large_hoover_dams), "\n")
# Create an interactive table of large Hoover dams
datatable(
  large_hoover_dams |>
    st_drop_geometry() |>
    select(uri, name, drainage_area_sqkm) |>
    arrange(desc(drainage_area_sqkm)),
  options = list(pageLength = 10, scrollX = TRUE),
  caption = "Large Dams Named 'Hoover' (Drainage Area > 100,000 sq km)",
  rownames = FALSE
)
# Create a map view of all Hoover dams, highlighting the large ones
m <- mapview(hoover_dams |>
    select(uri, name, drainage_area_sqkm), layer.name = "All Hoover Dams", label="name")
m + mapview(large_hoover_dams |>
    select(uri, name, drainage_area_sqkm), color = "red", col.regions="red", layer.name = "Large Hoover Dams", lwd=2, cex=15, label="Hoover")
```

<iframe src='/html/r/hoover-dams.html' style={{width: "100%", height: "500px"}}></iframe>

</TabItem>
<TabItem value="py" label="Python">

```python
# Step 1: Find all dams named "Hoover"
query_hoover = "name LIKE '%Hoover%'"
url_hoover = f"{base_url}/collections/dams/items?f=json&filter={query_hoover}"
response_hoover = requests.get(url_hoover)
response_hoover.raise_for_status()  # Raise an error for bad responses
hoover_dams = pd.json_normalize(response_hoover.json()['features'])  # Flatten the JSON response

# Print the number of Hoover dams
print("Number of dams named 'Hoover':", len(hoover_dams))

# Create an interactive table of all Hoover dams
hoover_dams_table = hoover_dams[['properties.uri', 'properties.name', 'properties.drainage_area_sqkm']]
hoover_dams_table.columns = ['URI', 'Name', 'Drainage Area (sq km)']
hoover_dams_table = hoover_dams_table.sort_values(by='Drainage Area (sq km)', ascending=False)

# Step 2: Query for large Hoover dams using a combined filter
query_large_hoover = "name LIKE '%Hoover%' AND drainage_area_sqkm > 100000"
url_large_hoover = f"{base_url}/collections/dams/items?f=json&filter={query_large_hoover}"
response_large_hoover = requests.get(url_large_hoover)
response_large_hoover.raise_for_status()  # Raise an error for bad responses
large_hoover_dams = pd.json_normalize(response_large_hoover.json()['features'])  # Flatten the JSON response

# Print the number of large Hoover dams
print("\nNumber of large Hoover dams (Drainage Area > 100,000 sq km):", len(large_hoover_dams))

# Create an interactive table of large Hoover dams
large_hoover_dams_table = large_hoover_dams[['properties.uri', 'properties.name', 'properties.drainage_area_sqkm']]
large_hoover_dams_table.columns = ['URI', 'Name', 'Drainage Area (sq km)']
large_hoover_dams_table = large_hoover_dams_table.sort_values(by='Drainage Area (sq km)', ascending=False)

# Step 3: Create a map view of all Hoover dams
m = folium.Map(location=[37.0, -96.0], zoom_start=4)  # Adjust the initial map view as needed

# Add all Hoover dams to the map
for _, dam in hoover_dams.iterrows():
    folium.Marker(
        location=[dam['geometry.coordinates'][1], dam['geometry.coordinates'][0]],
        popup=f"{dam['properties.name']}: {dam['properties.uri']}",
    ).add_to(m)

# Highlight large Hoover dams in red
for _, large_dam in large_hoover_dams.iterrows():
    folium.Marker(
        location=[large_dam['geometry.coordinates'][1], large_dam['geometry.coordinates'][0]],
        popup=f"{large_dam['properties.name']}: {large_dam['properties.uri']}",
        icon=folium.Icon(color='red')
    ).add_to(m)

m
```

<iframe src='/html/python/hoover-dams.html' style={{width: "100%", height: "500px"}}> </iframe>

</TabItem>
</Tabs>

We found 39 Dams in the US named "Hoover", but only 1 with a large drainage area, the famous one near Las Vegas, NV.
