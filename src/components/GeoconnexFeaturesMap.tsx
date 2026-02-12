import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { GeoconnexClient } from "geoconnex-client-ts";
import * as turf from "@turf/turf";
import "maplibre-gl/dist/maplibre-gl.css";

const GeoconnexMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [sitemapColors, setSitemapColors] = useState<Record<string, string>>(
    {},
  );
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const bboxLayerRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBbox, setCurrentBbox] = useState<number[]>([]);
  const [featureCount, setFeatureCount] = useState(0);
  const [bboxSize, setBboxSize] = useState(0.2);
  const bboxSizeRef = useRef(0.2);

  useEffect(() => {
    const client = new GeoconnexClient({ cache: false });
    const map = new maplibregl.Map({
      container: mapContainer.current!,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [-73.1, 40.95],
      zoom: 10,
    });
    mapRef.current = map;

    // Loading spinner
    const loadingSpinner = document.createElement("div");
    loadingSpinner.id = "loading-spinner";
    loadingSpinner.innerHTML = `
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 12px;
      ">
        <div style="
          border: 3px solid #f3f3f3;
          border-top: 3px solid #ff5500;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        "></div>
        <span style="font-family: sans-serif; font-size: 14px;">Loading features...</span>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    map.getContainer().appendChild(loadingSpinner);

    map.on("load", async () => {
      try {
        const long_island_bbox: [number, number, number, number] = [
          -73.4657, 40.6302, -73.2657, 40.8302,
        ];
        setCurrentBbox(long_island_bbox);

        const fc = await client.get_features_inside_bbox(long_island_bbox, [
          "geometry",
          "id",
          "geoconnex_sitemap",
        ]);

        console.log(fc.features[0]);

        setFeatureCount(fc.features.length);

        // Get unique sitemap values and filter out null/undefined
        const sitemapValues: string[] = Array.from(
          new Set(
            fc.features
              .map(
                (f: { properties: { geoconnex_sitemap: string } }) =>
                  f.properties?.geoconnex_sitemap,
              )
              .filter((val) => val != null),
          ),
        );
        console.log(sitemapValues);

        // Initialize toggles
        const initialToggles: Record<string, boolean> = {};
        sitemapValues.forEach((val) => (initialToggles[val] = true));

        // Generate color for each sitemap
        const colors: Record<string, string> = {};
        sitemapValues.forEach((val, i) => {
          const hue = (i * 360) / sitemapValues.length;
          colors[val] = `hsl(${hue}, 70%, 50%)`;
        });
        setSitemapColors(colors);

        console.log(colors);

        // Add source
        map.addSource("geoconnex", { type: "geojson", data: fc });

        const colorExpression: any[] = [
          "match",
          ["to-string", ["get", "geoconnex_sitemap"]],
        ];

        sitemapValues.forEach((val) => {
          colorExpression.push(String(val), colors[val]);
        });

        // default color
        colorExpression.push("#999999");

        // POLYGONS
        map.addLayer({
          id: "geoconnex-fill",
          type: "fill",
          source: "geoconnex",
          filter: ["==", ["geometry-type"], "Polygon"],
          paint: {
            "fill-color": colorExpression,
            "fill-opacity": 0.5,
          },
        });

        // LINES
        map.addLayer({
          id: "geoconnex-lines",
          type: "line",
          source: "geoconnex",
          filter: ["==", ["geometry-type"], "LineString"],
          paint: {
            "line-color": colorExpression,
            "line-width": 2,
          },
        });

        // POINTS
        map.addLayer({
          id: "geoconnex-points",
          type: "circle",
          source: "geoconnex",
          filter: ["==", ["geometry-type"], "Point"],
          paint: {
            "circle-radius": 5,
            "circle-color": colorExpression,
          },
        });

        const handleFeatureClick = (e: { features: any[] }) => {
          if (!e.features || e.features.length === 0) return;
          const feature = e.features[0];
          const featureId = feature.properties?.id || feature.id || "No ID";

          let coords = null;
          if (feature.geometry.type === "Point")
            coords = feature.geometry.coordinates;
          else if (feature.geometry.type === "LineString")
            coords = turf.along(feature, turf.length(feature) / 2).geometry
              .coordinates;
          else if (["Polygon", "MultiPolygon"].includes(feature.geometry.type))
            coords = turf.centroid(feature).geometry.coordinates;
          else if (feature.geometry.type === "MultiPoint")
            coords = feature.geometry.coordinates[0];
          else if (feature.geometry.type === "MultiLineString")
            coords = turf.centroid(feature).geometry.coordinates;

          if (coords) {
            new maplibregl.Popup()
              .setLngLat(coords)
              .setHTML(
                `<strong>ID:</strong> <a href="${featureId}">${featureId}</a>`,
              )
              .addTo(map);
          }
        };

        ["geoconnex-fill", "geoconnex-lines", "geoconnex-points"].forEach(
          (layer) => map.on("click", layer, handleFeatureClick),
        );

        // Hover cursor
        ["geoconnex-fill", "geoconnex-lines", "geoconnex-points"].forEach(
          (layer) => {
            map.on(
              "mouseenter",
              layer,
              () => (map.getCanvas().style.cursor = "pointer"),
            );
            map.on(
              "mouseleave",
              layer,
              () => (map.getCanvas().style.cursor = ""),
            );
          },
        );

        // Handle clicks anywhere on map that don't hit a feature
        map.on("click", async (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["geoconnex-fill", "geoconnex-lines", "geoconnex-points"],
          });

          // If we clicked on a feature, don't run this handler
          if (features.length > 0) {
            return;
          }

          // remove previous marker if it exists
          if (markerRef.current) {
            markerRef.current.remove();
          }

          markerRef.current = new maplibregl.Marker({ color: "#FF0000" })
            .setLngLat(e.lngLat)
            .addTo(map);

          const { lng, lat } = e.lngLat;

          // Create a bbox around the click point using the current bboxSize
          const currentSize = bboxSizeRef.current;
          const newBbox = [
            lng - currentSize / 2,
            lat - currentSize / 2,
            lng + currentSize / 2,
            lat + currentSize / 2,
          ] as [number, number, number, number];
          setCurrentBbox(newBbox);

          // Show bbox outline
          const bboxPolygon = turf.bboxPolygon(newBbox);

          // Remove previous bbox layer if exists
          if (bboxLayerRef.current) {
            if (map.getLayer("bbox-outline")) map.removeLayer("bbox-outline");
            if (map.getSource("bbox-outline")) map.removeSource("bbox-outline");
          }

          map.addSource("bbox-outline", {
            type: "geojson",
            data: bboxPolygon,
          });

          map.addLayer({
            id: "bbox-outline",
            type: "line",
            source: "bbox-outline",
            paint: {
              "line-color": "#FF0000",
              "line-width": 3,
              "line-dasharray": [2, 2],
            },
          });

          bboxLayerRef.current = "bbox-outline";

          console.log("Fetching features for bbox:", newBbox);

          // Show loading
          setIsLoading(true);

          try {
            const newFc = await client.get_features_inside_bbox(newBbox, [
              "geometry",
              "id",
              "geoconnex_sitemap",
            ]);

            setFeatureCount(newFc.features.length);

            // Get unique sitemap values from new features
            const newSitemapValues: string[] = Array.from(
              new Set(
                newFc.features
                  .map(
                    (f: { properties: { geoconnex_sitemap: string } }) =>
                      f.properties?.geoconnex_sitemap,
                  )
                  .filter((val) => val != null),
              ),
            );

            // Generate colors for new sitemap values
            const newColors: Record<string, string> = {};
            newSitemapValues.forEach((val, i) => {
              const hue = (i * 360) / newSitemapValues.length;
              newColors[val] = `hsl(${hue}, 70%, 50%)`;
            });

            // Initialize toggles for new values
            const newToggles: Record<string, boolean> = {};
            newSitemapValues.forEach((val) => (newToggles[val] = true));
            setSitemapColors(newColors);

            // Build new color expression
            const newColorExpression: any[] = [
              "match",
              ["to-string", ["get", "geoconnex_sitemap"]],
            ];

            newSitemapValues.forEach((val) => {
              newColorExpression.push(String(val), newColors[val]);
            });
            newColorExpression.push("#999999");

            // Update the data source
            const currentSource = map.getSource(
              "geoconnex",
            ) as maplibregl.GeoJSONSource;
            currentSource.setData(newFc);

            // Update layer paint properties
            map.setPaintProperty(
              "geoconnex-fill",
              "fill-color",
              newColorExpression,
            );
            map.setPaintProperty(
              "geoconnex-lines",
              "line-color",
              newColorExpression,
            );
            map.setPaintProperty(
              "geoconnex-points",
              "circle-color",
              newColorExpression,
            );
          } catch (error) {
            console.error("Error fetching new features:", error);
            alert("Failed to fetch features. Please try again.");
          } finally {
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error("Error loading features:", error);
        alert("Failed to load features. Please try again.");
      } finally {
        if (loadingSpinner.parentNode)
          loadingSpinner.parentNode.removeChild(loadingSpinner);
      }
    });

    return () => {
      // Clean up markers
      if (markerRef.current) markerRef.current.remove();
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />

      {/* Loading spinner */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.95)",
            padding: "20px 30px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #ff5500",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              animation: "spin 1s linear infinite",
            }}
          />
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Loading features...
          </span>
        </div>
      )}

      {/* Bbox Size Control */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          minWidth: "220px",
          zIndex: 1,
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "12px",
            fontSize: "14px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "8px",
          }}
        >
          Bounding Box Size
        </h3>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="bbox-size-input"
            style={{
              fontSize: "12px",
              display: "block",
              marginBottom: "6px",
              color: "#555",
            }}
          >
            Size (degrees): {bboxSize.toFixed(2)}
          </label>
          <input
            id="bbox-size-input"
            type="range"
            min="0.01"
            max="1.4"
            step="0.01"
            value={bboxSize}
            onChange={(e) => {
              const newSize = parseFloat(e.target.value);
              setBboxSize(newSize);
              bboxSizeRef.current = newSize;
            }}
            style={{
              width: "100%",
              cursor: "pointer",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
              color: "#777",
              marginTop: "4px",
            }}
          >
            <span>0.01°</span>
            <span>1.40°</span>
          </div>
        </div>
        {/* <div
          style={{
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
            marginTop: "10px",
            padding: "8px",
            background: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          Click on the map to create a new bounding box with this size
        </div> */}
      </div>

      {/* Legend */}
      {Object.keys(sitemapColors).length > 0 && !isLoading && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "white",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            maxHeight: "80vh",
            overflowY: "auto",
            minWidth: "200px",
            zIndex: 1,
          }}
        >
          <h3
            style={{
              marginBottom: "0px",
              paddingBottom: "2px",
              borderBottom: "1px solid #ccc",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Geoconnex Sitemaps
          </h3>
          <i style={{ fontSize: "12px", marginBottom: "10px" }}>
            Showing {featureCount} features in bbox:{" "}
            {currentBbox.map((val) => val.toFixed(4)).join(", ")}
          </i>
          {Object.entries(sitemapColors).map(([sitemap, color]) => (
            <div
              key={sitemap}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: color,
                  borderRadius: "3px",
                  border: "1px solid #ddd",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  wordBreak: "break-word",
                }}
              >
                {sitemap}
              </span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GeoconnexMap;
