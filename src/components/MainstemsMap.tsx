import { useState, useRef, useMemo, useCallback } from "react";
import * as React from "react";
import {
  Map,
  MapLayerMouseEvent,
  Source,
  Layer,
  Marker,
  MapRef,
  MapSourceDataEvent,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { deserialize } from "flatgeobuf/lib/mjs/geojson.js";
import { Feature, FeatureCollection, Polygon } from "geojson";

const BBOX_SIZE = 0.1;

// Bounding box around a point
function getBoundingBox(
  lng: number,
  lat: number,
  size: number
): FeatureCollection<Polygon> {
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
}

export default function MainstemsMap() {
  const mapRef = useRef<MapRef>(null);

  const handleSourceData = useCallback((event: MapSourceDataEvent) => {
    if (!event.isSourceLoaded && (event.sourceDataType == "content" || event.sourceDataType == "metadata")) {
      setLoadingMainstem(true);
    } else if (event.isSourceLoaded) {
      setLoadingMainstem(false);
    }
  }, []);

  const [marker, setMarker] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [features, setFeatures] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
  const [bbox, setBbox] = useState<FeatureCollection<Polygon>>({
    type: "FeatureCollection",
    features: [],
  });
  const [loadingCatchments, setLoadingCatchments] = useState(false);
  const [loadingMainstem, setLoadingMainstem] = useState(false);
  const [currentMainstemUrl, setCurrentMainstemUrl] = useState<string>();
  const [selectedFeature, setSelectedFeature] = useState<{
    properties: any;
    lngLat: { lng: number; lat: number };
    id: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"catchment" | "mainstem">(
    "catchment"
  );
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  // Memoize GeoJSON sources
  const memoizedFeatures = useMemo(() => features, [features]);
  const memoizedBbox = useMemo(() => bbox, [bbox]);

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
    if (geoconnexUrl === currentMainstemUrl) return;
    setLoadingMainstem(true);
    try {
      setCurrentMainstemUrl(geoconnexUrl);
    } catch (error) {
      setCurrentMainstemUrl(undefined);
      console.error("Error fetching mainstem:", error);
      setLoadingMainstem(false);
    } 
  };

  const handleClick = async (event: MapLayerMouseEvent) => {
    const lng = event.lngLat.lng;
    const lat = event.lngLat.lat;
    const clickedFeatures = event.features;

    if (clickedFeatures && clickedFeatures.length > 0) {
      const f = clickedFeatures[0];
      const geoconnexUrl = f.properties?.geoconnex_url;

      setSelectedFeature({
        properties: f.properties,
        lngLat: { lng, lat },
        id: String(f.properties?.Catchment_featureid || ""),
      });

      if (geoconnexUrl) {
        await fetchMainstem(geoconnexUrl);
        setIsPanelMinimized(false);
      } else {
        setCurrentMainstemUrl(undefined);
      }

      return;
    }

    setSelectedFeature(null);
    setCurrentMainstemUrl(undefined);
    setActiveTab("catchment");

    setMarker({ longitude: lng, latitude: lat });
    setBbox(getBoundingBox(lng, lat, BBOX_SIZE));
    await fetchFlatGeobuf(lng, lat);

    // Zoom in only when clicking empty area
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 8, duration: 1000 });
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

      {/* INFO BOX AND PANEL */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "rgba(12, 18, 28, 0.92)",
          color: "#FFFFFF",
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
        {features.features.length > 0 ? (
          <div>
            Features loaded:{" "}
            <span style={{ fontWeight: 600 }}>{features.features.length}</span>
          </div>
        ) : (
          <div>
            <i>Click anywhere in the continental US to load catchments. </i>
          </div>
        )}

        {loadingCatchments && (
          <div style={{ marginTop: 4 }}>Loading catchments…</div>
        )}
        {loadingMainstem && (
          <div style={{ marginTop: 4 }}>Loading mainstem…</div>
        )}
        {!loadingMainstem && selectedFeature && (
          <div style={{ marginTop: 4 }}>
            {currentMainstemUrl ? (
              <>
                Associated Mainstem:{" "}
                <a
                  href={currentMainstemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "inherit" }}
                >
                  <i>{currentMainstemUrl}</i>
                </a>
              </>
            ) : (
              <span style={{ opacity: 0.85, fontStyle: "italic" }}>
                No mainstem associated with this catchment
              </span>
            )}
          </div>
        )}
        {marker && (
          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
            Clicked point: {marker.latitude.toFixed(4)},{" "}
            {marker.longitude.toFixed(4)}
          </div>
        )}
      </div>

      {/* BOTTOM-LEFT TABBED PROPERTIES PANEL */}
      {selectedFeature && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 10,
            background: "rgba(12, 18, 28, 0.92)",
            color: "#FFFFFF",
            borderRadius: "6px",
            fontSize: "13px",
            zIndex: 20,
            maxWidth: "320px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Header with tabs and minimize button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ display: "flex", flex: 1 }}>
              <button
                onClick={() => setActiveTab("catchment")}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background:
                    activeTab === "catchment"
                      ? "rgba(255,255,255,0.1)"
                      : "transparent",
                  color: "#FFFFFF",
                  border: "none",
                  borderBottom:
                    activeTab === "catchment"
                      ? "2px solid #4caf50"
                      : "2px solid transparent",
                  cursor: "pointer",
                  fontWeight: activeTab === "catchment" ? 700 : 400,
                  fontSize: "13px",
                  transition: "all 0.2s",
                }}
              >
                Catchment
              </button>
              {/* {currentMainstemUrl && (
                <button
                  onClick={() => setActiveTab("mainstem")}
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    background:
                      activeTab === "mainstem"
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    color: "#FFFFFF",
                    border: "none",
                    borderBottom:
                      activeTab === "mainstem"
                        ? "2px solid #4caf50"
                        : "2px solid transparent",
                    cursor: "pointer",
                    fontWeight: activeTab === "mainstem" ? 700 : 400,
                    fontSize: "13px",
                    transition: "all 0.2s",
                  }}
                >
                  Mainstem
                </button>
              )} */}
            </div>
            <button
              onClick={() => setIsPanelMinimized(!isPanelMinimized)}
              style={{
                padding: "10px 14px",
                background: "transparent",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              title={isPanelMinimized ? "Expand" : "Minimize"}
            >
              {isPanelMinimized ? "▲" : "▼"}
            </button>
          </div>

          {/* Content area */}
          {!isPanelMinimized && (
            <div
              style={{
                padding: "10px 14px",
                maxHeight: "38vh",
                overflowY: "auto",
              }}
            >
              {activeTab === "catchment" && (
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>
                    Properties of Selected Catchment
                  </div>
                  <div style={{ lineHeight: 1.45 }}>
                    {Object.entries(selectedFeature.properties || {}).map(
                      ([k, v]) => (
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
                              color: "#d8e7ff",
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
                              color: "#e6f0ff",
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
                      )
                    )}
                    {Object.keys(selectedFeature.properties || {}).length ===
                      0 && (
                      <div style={{ opacity: 0.85, fontStyle: "italic" }}>
                        No properties available
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Map
        ref={mapRef}
        initialViewState={{ longitude: -98.5795, latitude: 39.8283, zoom: 3.5 }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        onClick={handleClick}
        interactiveLayerIds={["features-fill"]}
        minZoom={3}
        maxZoom={18}
        onSourceData={handleSourceData} 
      >
        {marker && (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            color="red"
          />
        )}

        {memoizedBbox.features.length > 0 && (
          <Source id="bbox" type="geojson" data={memoizedBbox}>
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

        {memoizedFeatures.features.length > 0 && (
          <Source id="features" type="geojson" data={memoizedFeatures}>
            <Layer
              id="features-fill"
              type="fill"
              paint={{
                "fill-color": [
                  "case",
                  [
                    "==",
                    ["get", "Catchment_featureid"],
                    Number(selectedFeature?.id) || 0,
                  ],
                  "#00FF00",
                  "#0088FF",
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
                  "#00AA00",
                  "#0044AA",
                ],
                "line-width": 1.5,
              }}
            />
          </Source>
        )}

        {currentMainstemUrl && (
          // by putting the url in the
          <Source id="mainstem" type="geojson" data={currentMainstemUrl}>
            <Layer
              id="mainstem-line"
              type="line"
              paint={{ "line-color": "#FF0000", "line-width": 3 }}
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
