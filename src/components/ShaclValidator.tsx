import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSync,
  faSpinner,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import init, {
  get_geoconnex_schema,
  validate_jsonld_against_geoconnex_schema,
} from "./pkg/wasm_exportable_lib.js";

import jsonld from "jsonld";

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  fontSize: 13,
  minimap: { enabled: false },
};

const OPTIONS_WITH_READONLY = {
  ...MONACO_EDITOR_OPTIONS,
  readOnly: true,
};

async function validateWithWasm(jsonText: string): Promise<string> {
  const parsed = JSON.parse(jsonText);
  const expanded = await jsonld.expand(parsed);
  const expandedText = JSON.stringify(expanded);

  // Reinitialize WASM and schema every call
  await init();
  const result = await validate_jsonld_against_geoconnex_schema(expandedText);
  return result;
}

const ShaclValidator: React.FC = () => {
  const [jsonldInput, setJsonldInput] = useState(`{
  "@context": {
    "@vocab": "https://schema.org/",
    "gsp": "http://www.opengis.net/ont/geosparql#",
    "hyf": "https://www.opengis.net/def/schema/hy_features/hyf/"
  },
  "@id": "https://geoconnex.us/ref/gages/1000246",
  "@type": [
    "https://www.opengis.net/def/schema/hy_features/hyf/HY_HydrometricFeature",
    "https://www.opengis.net/def/schema/hy_features/hyf/HY_HydroLocation"
  ],
  "name": "GWYNNS FALLS TRIBUTARY AT MCDONOGH, MD",
  "description": "USGS NWIS Stream/River/Lake Site 01589238: GWYNNS FALLS TRIBUTARY AT MCDONOGH, MD",
  "subjectOf": [
    {
      "@type": "Dataset",
      "name": "USGS NWIS Stream/River/Lake Site 01589238: GWYNNS FALLS TRIBUTARY AT MCDONOGH, MD",
      "url": "https://waterdata.usgs.gov/monitoring-location/01589238",
      "provider": {
        "@type": "GovernmentOrganization",
        "name": "USGS",
        "url": "https://waterdata.usgs.gov"
      }
    },
    {
      "@type": "WebPage",
      "url": "https://water.noaa.gov/gauges/MCDM2",
      "provider": {
        "@type": "GovernmentOrganization",
        "name": "NOAA",
        "url": "https://water.noaa.gov/"
      }
    }
  ],
  "provider": "https://waterdata.usgs.gov",
  "hyf:referencedPosition": [
    {
      "hyf:HY_IndirectPosition": {
        "hyf:distanceExpression": {
          "hyf:HY_DistanceFromReferent": {
            "hyf:interpolative": 22.1698
          }
        },
        "hyf:distanceDescription": {
          "hyf:HY_DistanceDescription": "upstream"
        },
        "hyf:linearElement": {"@id": "https://geoconnex.us/nhdplusv2/reachcode/02060003000735"}
      }
    }
  ],
  "hyf:HY_HydroLocationType": "hydrometricStation",
  "geo": {"@type":"schema:GeoCoordinates","schema:longitude":-76.77044222372024,"schema:latitude":39.4004452306381},
  "gsp:hasGeometry": {"@type":"http://www.opengis.net/ont/sf#Point","gsp:asWKT":{"@type":"http://www.opengis.net/ont/geosparql#wktLiteral","@value":"POINT (-76.77044222372024 39.4004452306381)"}}
}`);
  const [report, setReport] = useState("No validation run yet.");
  const [loading, setLoading] = useState(false);
  const [showJsonld, setShowJsonld] = useState(true);
  const [showShape, setShowShape] = useState(true);
  const [schema, setSchema] = useState("");
  useEffect(() => {
    (async () => {
      try {
        await init();
      } catch (err) {
        console.error("Failed to initialize WASM:", err);
        setReport("⚠️ Error initializing WASM: " + err.message);
      }
    })();
  }, []);


  const handleValidate = async () => {
    setLoading(true);
    setReport("Running validation...");

    try {
      JSON.parse(jsonldInput);

      // Re-initialize WASM
      await init();
      const schemaText = await get_geoconnex_schema();
      setSchema(schemaText || "# Schema not loaded");

      // Validate JSON-LD
      const result = await validateWithWasm(jsonldInput);
      setReport(result);
    } catch (err: any) {
      setReport("⚠️ Validation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    overflow: "hidden",
  };
  const editorContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    overflow: "hidden",
  };
  const columnStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    margin: "2px",
  };
  const editorStyle: React.CSSProperties = {
    flex: 1,
    height: "calc(100% - 3rem)",
  };
  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    height: "4rem",
    fontWeight: "bold",
  };
  const buttonStyle: React.CSSProperties = {
    marginRight: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3578e5",
    color: "#fff",
    transition: "background-color 0.3s",
  };

  return (
    <>
      <div style={headerStyle}>
        <div>
          <button
            style={buttonStyle}
            onClick={handleValidate}
            disabled={loading}
          >
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                style={{ marginRight: "0.5rem" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSync}
                style={{ marginRight: "0.5rem" }}
              />
            )}
            {loading ? " Validating..." : "Validate JSON-LD"}
          </button>

          <button
            style={buttonStyle}
            onClick={() => setShowJsonld(!showJsonld)}
          >
            <FontAwesomeIcon icon={showJsonld ? faEyeSlash : faEye} />{" "}
            {showJsonld ? "Hide JSON-LD" : "Show JSON-LD"}
          </button>

          <button style={buttonStyle} onClick={() => setShowShape(!showShape)}>
            <FontAwesomeIcon icon={showShape ? faEyeSlash : faEye} />{" "}
            {showShape ? "Hide Shape" : "Show Shape"}
          </button>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={editorContainerStyle}>
          {showJsonld && (
            <div style={columnStyle}>
              <h2 style={{ textAlign: "center" }}>JSON-LD Input</h2>
              <Editor
                value={jsonldInput}
                onChange={(v) => setJsonldInput(v || "")}
                options={MONACO_EDITOR_OPTIONS}
                theme="vs-dark"
                language="json"
                style={editorStyle}
              />
            </div>
          )}

          {showShape && (
            <div style={columnStyle}>
              <h2 style={{ textAlign: "center" }}>Geoconnex SHACL Shape</h2>
              <Editor
                value={schema}
                options={OPTIONS_WITH_READONLY}
                theme="vs-dark"
                language="turtle"
                style={editorStyle}
              />
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            fontFamily: "monospace",
          }}
        >
          <h3>Validation Report</h3>
          <pre>{report}</pre>
        </div>
      </div>
    </>
  );
};

export default ShaclValidator;
