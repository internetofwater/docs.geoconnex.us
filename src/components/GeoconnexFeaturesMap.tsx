import React, { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import { GeoconnexClient } from "geoconnex-client-ts";
import * as turf from "@turf/turf";
import "maplibre-gl/dist/maplibre-gl.css";

const GeoconnexMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const clientRef = useRef<GeoconnexClient>(new GeoconnexClient());
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

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryRef = useRef("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Convert [minLng, minLat, maxLng, maxLat] to a WKT POLYGON string
  const bboxToWkt = (bbox: [number, number, number, number]): string => {
    const [minLng, minLat, maxLng, maxLat] = bbox;
    return (
      `POLYGON((${minLng} ${minLat}, ${maxLng} ${minLat}, ` +
      `${maxLng} ${maxLat}, ${minLng} ${maxLat}, ${minLng} ${minLat}))`
    );
  };

  const buildColorExpression = (
    sitemapValues: string[],
    colors: Record<string, string>,
  ): any[] => {
    const expr: any[] = ["match", ["to-string", ["get", "geoconnex_sitemap"]]];
    sitemapValues.forEach((val) => expr.push(String(val), colors[val]));
    expr.push("#999999");
    return expr;
  };

  const applyFeatureCollection = useCallback((map: maplibregl.Map, fc: any) => {
    setFeatureCount(fc.features.length);

    const sitemapValues: string[] = Array.from(
      new Set(
        fc.features
          .map(
            (f: { properties: { geoconnex_sitemap: string } }) =>
              f.properties?.geoconnex_sitemap,
          )
          .filter((val: any) => val != null),
      ),
    );

    const colors: Record<string, string> = {};
    sitemapValues.forEach((val, i) => {
      const hue = (i * 360) / sitemapValues.length;
      colors[val] = `hsl(${hue}, 70%, 50%)`;
    });
    setSitemapColors(colors);

    const colorExpression = buildColorExpression(sitemapValues, colors);

    const source = map.getSource("geoconnex") as maplibregl.GeoJSONSource;
    source.setData(fc);

    map.setPaintProperty("geoconnex-fill", "fill-color", colorExpression);
    map.setPaintProperty("geoconnex-lines", "line-color", colorExpression);
    map.setPaintProperty("geoconnex-points", "circle-color", colorExpression);
  }, []);

  // Fetch features using current map bounds + optional search query
  const fetchForBbox = useCallback(
    async (bbox: [number, number, number, number], query?: string) => {
      const map = mapRef.current;
      if (!map) return;

      setIsLoading(true);
      try {
        const options: any = { inside_wkt: bboxToWkt(bbox) };
        if (query && query.trim()) {
          options.feature_name_ilike = {
            key: query.trim(),
            glob_before: true,
            glob_after: true,
          };
        }

        const fc = await clientRef.current.get_features(options);
        applyFeatureCollection(map, fc);
        setCurrentBbox(bbox);
      } catch (error) {
        console.error("Error fetching features:", error);
        alert("Failed to fetch features. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [applyFeatureCollection],
  );

  // Debounced search: re-fetch with current map bounds
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchQuery(val);
      searchQueryRef.current = val;

      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        const map = mapRef.current;
        if (!map) return;
        const b = map.getBounds();
        const bbox: [number, number, number, number] = [
          b.getWest(),
          b.getSouth(),
          b.getEast(),
          b.getNorth(),
        ];
        fetchForBbox(bbox, searchQueryRef.current);
      }, 500);
    },
    [fetchForBbox],
  );

  useEffect(() => {
    const client = clientRef.current;
    const map = new maplibregl.Map({
      container: mapContainer.current!,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [-73.965, 40.79],
      zoom: 10,
    });
    mapRef.current = map;

    // Loading spinner on initial load
    const loadingSpinner = document.createElement("div");
    loadingSpinner.id = "loading-spinner";
    loadingSpinner.innerHTML = `
      <div style="
        position: absolute; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255,255,255,0.9); padding: 20px;
        border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000; display: flex; align-items: center; gap: 12px;
      ">
        <div style="
          border: 3px solid #f3f3f3; border-top: 3px solid #ff5500;
          border-radius: 50%; width: 24px; height: 24px;
          animation: spin 1s linear infinite;
        "></div>
        <span style="font-family: sans-serif; font-size: 14px;">Loading features...</span>
      </div>
      <style>
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      </style>
    `;
    map.getContainer().appendChild(loadingSpinner);

    map.on("load", async () => {
      try {
        const manhattan_bbox: [number, number, number, number] = [
          -74.03,
          40.7, // southwest corner
          -73.9,
          40.88, // northeast corner
        ];
        setCurrentBbox(manhattan_bbox);

        const fc = await client.get_features({
          inside_wkt: bboxToWkt(manhattan_bbox), limit: 2000
        });
        setFeatureCount(fc.features.length);

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

        const colors: Record<string, string> = {};
        sitemapValues.forEach((val, i) => {
          const hue = (i * 360) / sitemapValues.length;
          colors[val] = `hsl(${hue}, 70%, 50%)`;
        });
        setSitemapColors(colors);

        const colorExpression = buildColorExpression(sitemapValues, colors);

        map.addSource("geoconnex", { type: "geojson", data: fc });

        map.addLayer({
          id: "geoconnex-fill",
          type: "fill",
          source: "geoconnex",
          filter: ["==", ["geometry-type"], "Polygon"],
          paint: { "fill-color": colorExpression, "fill-opacity": 0.5 },
        });

        map.addLayer({
          id: "geoconnex-lines",
          type: "line",
          source: "geoconnex",
          filter: ["==", ["geometry-type"], "LineString"],
          paint: { "line-color": colorExpression, "line-width": 2 },
        });

        map.addLayer({
          id: "geoconnex-points",
          type: "circle",
          source: "geoconnex",
          filter: ["==", ["geometry-type"], "Point"],
          paint: { "circle-radius": 5, "circle-color": colorExpression },
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

        map.on("click", async (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["geoconnex-fill", "geoconnex-lines", "geoconnex-points"],
          });
          if (features.length > 0) return;

          if (markerRef.current) markerRef.current.remove();
          markerRef.current = new maplibregl.Marker({ color: "#FF0000" })
            .setLngLat(e.lngLat)
            .addTo(map);

          const { lng, lat } = e.lngLat;
          const currentSize = bboxSizeRef.current;
          const newBbox: [number, number, number, number] = [
            lng - currentSize / 2,
            lat - currentSize / 2,
            lng + currentSize / 2,
            lat + currentSize / 2,
          ];

          // Show bbox outline
          const bboxPolygon = turf.bboxPolygon(newBbox);
          if (bboxLayerRef.current) {
            if (map.getLayer("bbox-outline")) map.removeLayer("bbox-outline");
            if (map.getSource("bbox-outline")) map.removeSource("bbox-outline");
          }
          map.addSource("bbox-outline", { type: "geojson", data: bboxPolygon });
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

          await fetchForBbox(newBbox, searchQueryRef.current);
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
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (markerRef.current) markerRef.current.remove();
      map.remove();
    };
  }, [fetchForBbox]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />

      {/* Loading overlay */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255,255,255,0.95)",
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

      {/* Search box */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "320px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            padding: "6px 12px",
            gap: "8px",
          }}
        >
          {/* Search icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search features within the current view"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontFamily: "sans-serif",
              fontSize: "13px",
              color: "#333",
              background: "transparent",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                searchQueryRef.current = "";
                if (searchInputRef.current) searchInputRef.current.focus();
                // Re-fetch without filter
                const map = mapRef.current;
                if (!map) return;
                const b = map.getBounds();
                fetchForBbox(
                  [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()],
                  "",
                );
              }}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "0 2px",
                color: "#aaa",
                fontSize: "16px",
                lineHeight: 1,
                flexShrink: 0,
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

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
            style={{ width: "100%", cursor: "pointer" }}
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
          <i
            style={{ fontSize: "12px", marginBottom: "10px", display: "block" }}
          >
            {featureCount} features in [
            {currentBbox.map((v) => v.toFixed(4)).join(", ")}]
            {searchQuery && (
              <span style={{ color: "#ff5500", marginLeft: "4px" }}>
                · filtered: "{searchQuery}"
              </span>
            )}
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
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "12px", wordBreak: "break-word" }}>
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
