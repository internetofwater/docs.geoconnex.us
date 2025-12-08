import * as React from "react";
import {
  Map,
  MapLayerMouseEvent,
  Source,
  Layer,
  Marker,
  MapRef,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { deserialize } from "flatgeobuf/lib/mjs/geojson.js";
import { Feature, FeatureCollection, Polygon } from "geojson";

const BBOX_SIZE = 0.1;

export default function MainstemsMap() {
  const mapRef = React.useRef<MapRef>(null);

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

  const [loadingCatchments, setLoadingCatchments] = React.useState(false);
  const [loadingMainstem, setLoadingMainstem] = React.useState(false);
  const [hasBeenZoomedOut, setHasBeenZoomedOut] = React.useState(false);
  const [currentMainstemUrl, setCurrentMainstemUrl] = React.useState<string>();

  const [selectedFeature, setSelectedFeature] = React.useState<{
    properties: any;
    lngLat: { lng: number; lat: number };
    id: string;
  } | null>(null);

  const [mainstemFeature, setMainstemFeature] =
    React.useState<FeatureCollection | null>(null);

  // Bounding box around a point
  const getBoundingBox = (lng: number, lat: number, size: number) => {
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
    setLoadingCatchments(true);
    try {
      const minX = lng - BBOX_SIZE;
      const minY = lat - BBOX_SIZE;
      const maxX = lng + BBOX_SIZE;
      const maxY = lat + BBOX_SIZE;

      const url =
        "https://storage.googleapis.com/national-hydrologic-geospatial-fabric-reference-hydrofabric/reference_catchments_and_flowlines.fgb";

      const bboxRect = { minX, minY, maxX, maxY };

      const iter = deserialize(url, bboxRect);

      const loadedFeatures: Feature[] = [];
      for await (const feature of iter) {
        loadedFeatures.push(feature as Feature);
      }

      setFeatures({
        type: "FeatureCollection",
        features: loadedFeatures,
      });
    } catch (error) {
      console.error("Error fetching FlatGeobuf:", error);
    } finally {
      setLoadingCatchments(false);
    }
  };

  const fetchMainstem = async (geoconnexUrl: string) => {
    if (geoconnexUrl === currentMainstemUrl) {
      return;
    }
    setLoadingMainstem(true);
    try {
      const response = await fetch(geoconnexUrl);
      const data = await response.json();

      if (data.type === "Feature") {
        setMainstemFeature({
          type: "FeatureCollection",
          features: [data],
        });
      } else {
        setMainstemFeature(data);
      }
    } catch (error) {
      setCurrentMainstemUrl(null);
      console.error("Error fetching mainstem:", error);
    } finally {
      setLoadingMainstem(false);
    }
  };

  const handleClick = async (event: MapLayerMouseEvent) => {
    const lng = event.lngLat.lng;
    const lat = event.lngLat.lat;
    const clickedFeatures = event.features;

    // ---------- FEATURE CLICK ----------
    if (clickedFeatures && clickedFeatures.length > 0) {
      const f = clickedFeatures[0];
      const geoconnexUrl = f.properties?.geoconnex_url;
      setCurrentMainstemUrl(geoconnexUrl);
      setSelectedFeature({
        properties: f.properties,
        lngLat: { lng, lat },
        id: String(f.properties?.Catchment_featureid || ""),
      });

      if (geoconnexUrl) {
        await fetchMainstem(geoconnexUrl);

        // Zoom OUT only once (first time a mainstem is loaded)
        if (!hasBeenZoomedOut) {
          mapRef.current?.flyTo({
            zoom: 6,
            duration: 1000,
          });
          setHasBeenZoomedOut(true);
        }
      }

      return;
    }

    setSelectedFeature(null);
    setMainstemFeature(null);

    setMarker({ longitude: lng, latitude: lat });

    setBbox(getBoundingBox(lng, lat, BBOX_SIZE));

    await fetchFlatGeobuf(lng, lat);

    // Zoom IN when clicking empty area
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: 8,
      duration: 1000,
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {(loadingCatchments || loadingMainstem) && (
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
            animation: "loading 2s linear infinite",
            zIndex: 10,
          }}
        />
      )}

      {/* TOP-LEFT INFO BOX (explicit colors set) */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "rgba(12, 18, 28, 0.92)", // explicit dark navy-ish background
          color: "#FFFFFF", // explicit text color
          padding: "10px 14px",
          borderRadius: "6px",
          fontSize: "14px",
          zIndex: 20,
          maxWidth: "280px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ fontWeight: "700", marginBottom: 6 }}>
          US Catchments and Mainstems
        </div>
        {features.features.length > 0 && (
          <div>
            Features loaded:{" "}
            <span style={{ fontWeight: 600 }}>{features.features.length}</span>
          </div>
        )}

        {loadingCatchments && (
          <div style={{ marginTop: 4 }}>Loading catchments…</div>
        )}
        {loadingMainstem && (
          <div style={{ marginTop: 4 }}>Loading mainstem…</div>
        )}
        {!loadingMainstem && mainstemFeature && (
          <div style={{ marginTop: 4 }}>
            Associated Mainstem:{" "}
            <a href={currentMainstemUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>
              <i>{currentMainstemUrl}</i>
            </a>
          </div>
        )}
        {marker && (
          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
            Clicked point: {marker.latitude.toFixed(4)},{" "}
            {marker.longitude.toFixed(4)}
          </div>
        )}
      </div>

      {/* BOTTOM-LEFT SIMPLE PROPERTIES LIST (matches top-left styling) */}
      {selectedFeature && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 10,
            background: "rgba(12, 18, 28, 0.92)", // same explicit color
            color: "#FFFFFF",
            padding: "10px 14px",
            borderRadius: "6px",
            fontSize: "13px",
            zIndex: 20,
            maxHeight: "38%",
            overflowY: "auto",
            maxWidth: "320px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            Properties of Selected Catchment
          </div>

          <div style={{ lineHeight: 1.45 }}>
            {Object.entries(selectedFeature.properties || {}).map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "4px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                <div
                  style={{
                    minWidth: 120,
                    fontWeight: 600,
                    color: "#d8e7ff", // explicit color for keys
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={k}
                >
                  {k}:
                </div>
                <div
                  style={{
                    flex: 1,
                    color: "#e6f0ff", // explicit color for values
                    wordBreak: "break-word",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace",
                    fontWeight: 400,
                  }}
                  title={String(v)}
                >
                  {String(v)}
                </div>
              </div>
            ))}

            {/* Show a helpful message if there are no properties */}
            {Object.keys(selectedFeature.properties || {}).length === 0 && (
              <div style={{ opacity: 0.85, fontStyle: "italic" }}>
                No properties available
              </div>
            )}
          </div>
        </div>
      )}

      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -98.5795,
          latitude: 39.8283,
          zoom: 3.5,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        onClick={handleClick}
        interactiveLayerIds={["features-fill"]}
        minZoom={3}
        maxZoom={18}
      >
        {marker && (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            color="red"
          />
        )}

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

        {features.features.length > 0 && (
          <Source id="features" type="geojson" data={features}>
            <Layer
              id="features-fill"
              type="fill"
              paint={{
                // explicit colors for selected vs default
                "fill-color": [
                  "case",
                  [
                    "==",
                    ["get", "Catchment_featureid"],
                    Number(selectedFeature?.id) || 0,
                  ],
                  "#00FF00", // selected fill color (explicit)
                  "#0088FF", // default fill color (explicit)
                ],
                "fill-opacity": 0.6,
              }}
            />
            <Layer
              id="features-line"
              type="line"
              paint={{
                "line-color": [
                  "case",
                  [
                    "==",
                    ["get", "Catchment_featureid"],
                    Number(selectedFeature?.id) || 0,
                  ],
                  "#00AA00", // selected outline
                  "#0044AA", // default outline
                ],
                "line-width": 1.5,
              }}
            />
          </Source>
        )}

        {mainstemFeature && (
          <Source id="mainstem" type="geojson" data={mainstemFeature}>
            <Layer
              id="mainstem-line"
              type="line"
              paint={{
                "line-color": "#FF0000",
                "line-width": 3,
              }}
            />
          </Source>
        )}
      </Map>

      <style>
        {`
          @keyframes loading {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
}
