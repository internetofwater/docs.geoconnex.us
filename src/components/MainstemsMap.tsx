import * as React from "react";
import {
  Map,
  MapLayerMouseEvent,
  ViewState,
  Source,
  Layer,
  Marker,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { deserialize } from "flatgeobuf/lib/mjs/geojson.js";
import { Feature, FeatureCollection, Polygon } from "geojson";

// Helper to convert GeoJSON Feature to the format expected by flatgeobuf
const fromFeature = (feature: any) => feature;

export default function MainstemsMap() {
  const [viewState, setViewState] = React.useState<
    ViewState & { width: number; height: number }
  >({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    padding: null,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [marker, setMarker] = React.useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  const [features, setFeatures] = React.useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const [bbox, setBbox] = React.useState<FeatureCollection<Polygon>>({
    type: "FeatureCollection",
    features: [],
  });

  const [loading, setLoading] = React.useState(false);
  const [selectedFeature, setSelectedFeature] = React.useState<{
    properties: any;
    lngLat: { lng: number; lat: number };
  } | null>(null);

  // Bounding box around a point
  const getBoundingBox = (lng: number, lat: number, size = 0.5) => {
    const coords: [number, number][][] = [
      [
        [lng - size, lat - size],
        [lng + size, lat - size],
        [lng + size, lat + size],
        [lng - size, lat + size],
        [lng - size, lat - size],
      ],
    ];
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: coords,
          },
        },
      ],
    };
  };

  const fetchFlatGeobuf = async (lng: number, lat: number) => {
    setLoading(true);
    try {
      const size = 0.5;
      const minX = lng - size;
      const minY = lat - size;
      const maxX = lng + size;
      const maxY = lat + size;

      const url =
        "https://storage.googleapis.com/national-hydrologic-geospatial-fabric-reference-hydrofabric/reference_catchments_and_flowlines.fgb";

      const bboxRect = {
        minX,
        minY,
        maxX,
        maxY,
      };

      // Deserialize using URL with bbox filter
      const iter = deserialize(url, bboxRect);

      const loadedFeatures: Feature[] = [];
      for await (const feature of iter) {
        loadedFeatures.push(feature as Feature);
      }

      setFeatures({
        type: "FeatureCollection",
        features: loadedFeatures,
      });

      console.log(`Loaded ${loadedFeatures.length} features`);
    } catch (error) {
      console.error("Error fetching FlatGeobuf:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (event: MapLayerMouseEvent) => {
    const lng = event.lngLat.lng;
    const lat = event.lngLat.lat;

    // Check if we clicked on a feature first
    const clickedFeatures = event.features;
    if (clickedFeatures && clickedFeatures.length > 0) {
      // Show popup for the clicked feature
      setSelectedFeature({
        properties: clickedFeatures[0].properties,
        lngLat: { lng, lat },
      });
      return; // Don't fetch new data if we clicked on a feature
    }

    // Clear popup and fetch new data for the clicked location
    setSelectedFeature(null);
    setMarker({ longitude: lng, latitude: lat });

    // Set the bounding box visualization
    const bboxData = getBoundingBox(lng, lat, 0.5);
    setBbox(bboxData);

    // Fetch features within the bbox
    await fetchFlatGeobuf(lng, lat);

    setViewState((vs) => ({
      ...vs,
      longitude: lng,
      latitude: lat,
      zoom: Math.max(vs.zoom, 8), // Only zoom in if current zoom is less than 8
    }));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Loading bar */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background:
              "linear-gradient(90deg, #4caf50 0%, #4caf50 50%, transparent 50%)",
            backgroundSize: "200% 100%",
            animation: "loading 1s linear infinite",
            zIndex: 10,
          }}
        />
      )}

      {/* Instructions */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "rgba(255, 255, 255, 0.95)",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 5,
          maxWidth: "300px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
          FlatGeobuf Region Loader
        </h3>
        <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
          Click anywhere on the map to download features in that region.
        </p>
        {features.features.length > 0 && (
          <p
            style={{
              margin: "5px 0 0 0",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#4caf50",
            }}
          >
            Loaded {features.features.length} features
          </p>
        )}
      </div>

      <Map
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        onClick={handleClick}
        interactiveLayerIds={["features-fill"]}
      >
        {marker && (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            color="red"
          />
        )}

        {/* Bounding box layer */}
        {bbox.features.length > 0 && (
          <Source id="bbox" type="geojson" data={bbox}>
            <Layer
              id="bbox-fill"
              type="fill"
              paint={{ "fill-color": "#FFFF00", "fill-opacity": 0.3 }}
            />
            <Layer
              id="bbox-line"
              type="line"
              paint={{ "line-color": "#FFAA00", "line-width": 2 }}
            />
          </Source>
        )}

        {/* Features layer */}
        {features.features.length > 0 && (
          <Source id="features" type="geojson" data={features}>
            <Layer
              id="features-fill"
              type="fill"
              paint={{
                "fill-color": "#0088FF",
                "fill-opacity": 0.6,
              }}
            />
            <Layer
              id="features-line"
              type="line"
              paint={{ "line-color": "#0044AA", "line-width": 1.5 }}
            />
          </Source>
        )}

        {/* Feature popup */}
        {selectedFeature && (
          <div
            style={{
              position: "absolute",
              background: "white",
              padding: "12px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              maxWidth: "300px",
              maxHeight: "400px",
              overflow: "auto",
              zIndex: 10,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "8px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "16px" }}>
                Feature Properties
              </h3>
              <button
                onClick={() => setSelectedFeature(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "0 4px",
                  color: "#666",
                }}
              >
                ×
              </button>
            </div>
            <div style={{ fontSize: "13px" }}>
              {Object.entries(selectedFeature.properties || {}).map(
                ([key, value]) => (
                  <div key={key} style={{ marginBottom: "8px" }}>
                    <strong>{key}:</strong>{" "}
                    <span style={{ wordBreak: "break-word" }}>
                      {value !== null && value !== undefined
                        ? String(value)
                        : "null"}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </Map>

      <style>
        {`
          @keyframes loading {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </div>
  );
}
