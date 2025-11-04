import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSync,
  faSpinner,
  faCopy,
  faCheck,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import default_json from "./associated_assets/ref_dams.json";

const VALIDATION_URL =
  "https://shacl-validation-grpc-server-414886575015.us-central1.run.app/validate";
const SHAPE_URL =
  "https://shacl-validation-grpc-server-414886575015.us-central1.run.app/shape";

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

function encodeDataToUrl(jsonld) {
  return encodeURIComponent(btoa(jsonld));
}

function decodeDataFromUrl(param) {
  try {
    return atob(decodeURIComponent(param));
  } catch {
    return null;
  }
}

const ShaclPlayground = () => {
  const [jsonld, setJsonld] = useState(JSON.stringify(default_json, null, 2));
  const [validationResult, setValidationResult] = useState(null);
  const [shape, setShape] = useState("// Loading SHACL shape...");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharedCopied, setSharedCopied] = useState(false);

  const [inputVisible, setInputVisible] = useState(true);
  const [shapeVisible, setShapeVisible] = useState(true);
  const [reportVisible, setReportVisible] = useState(true);

  // Populate from URL if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get("data");
    if (dataParam) {
      const decoded = decodeDataFromUrl(dataParam);
      if (decoded) setJsonld(decoded);
    }
  }, []);

  // Fetch SHACL shape
  useEffect(() => {
    const fetchShape = async () => {
      try {
        const response = await fetch(SHAPE_URL);
        if (!response.ok)
          throw new Error(`Failed to fetch SHACL shape: ${response.status}`);
        const text = await response.text();
        try {
          const parsed = JSON.parse(text);
          setShape(JSON.stringify(parsed, null, 2));
        } catch {
          setShape(text);
        }
      } catch (err) {
        setShape(`// Error fetching SHACL shape: ${err.message}`);
      }
    };
    fetchShape();
  }, []);

  const validate = async () => {
    setLoading(true);
    setError("");
    try {
      const data = JSON.parse(jsonld);
      const response = await fetch(VALIDATION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error: ${response.status} - ${text}`);
      }

      const text = await response.text();
      try {
        const parsed = JSON.parse(text);
        setValidationResult(parsed);
      } catch {
        setValidationResult({ message: text });
      }
    } catch (err) {
      setError(err.message);
      setValidationResult(null);
    } finally {
      setLoading(false);
    }
  };

  const share = () => {
    const encoded = encodeDataToUrl(jsonld);
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    navigator.clipboard.writeText(url);
    setSharedCopied(true);
    setTimeout(() => setSharedCopied(false), 1500);
  };

  // --- Layout Styles ---
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    overflow: "hidden",
  };

  const editorContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    overflow: "hidden",
  };

  const columnStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    margin: "2px",
  };

  const editorStyle = {
    flex: 1,
    height: "calc(100% - 3rem)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "4rem",
    fontWeight: "bold",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    marginRight: "1rem",
    marginBottom: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3578e5",
    color: "#fff",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const validationBoxStyle = {
    margin: "2rem 1rem",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
    lineHeight: "1.4",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    position: "relative",
    overflowY: "auto",
  };

  const validityStyle = (valid) => ({
    fontWeight: "bold",
    color: valid ? "#6cc070" : "#e05a5a",
    marginBottom: "0.5rem",
  });

  const formatMessage = (msg) => msg?.replace(/\n/g, "\n");

  return (
    <>
      <div style={headerStyle}>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonStyle.backgroundColor)
          }
          onClick={validate}
          disabled={loading}
        >
          {loading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              style={{ marginRight: "0.5rem" }}
            />
          ) : (
            <FontAwesomeIcon icon={faSync} style={{ marginRight: "0.5rem" }} />
          )}
          {loading ? " Validating..." : " Run SHACL Validation"}
        </button>

        <button
          style={buttonStyle}
          onClick={() => setInputVisible(!inputVisible)}
        >
          <FontAwesomeIcon icon={inputVisible ? faEyeSlash : faEye} />
          {inputVisible ? " Hide Input" : " Show Input"}
        </button>

        <button
          style={buttonStyle}
          onClick={() => setShapeVisible(!shapeVisible)}
        >
          <FontAwesomeIcon icon={shapeVisible ? faEyeSlash : faEye} />
          {shapeVisible ? " Hide Shape" : " Show Shape"}
        </button>

        <button
          style={buttonStyle}
          onClick={() => setReportVisible(!reportVisible)}
        >
          <FontAwesomeIcon icon={reportVisible ? faEyeSlash : faEye} />
          {reportVisible ? " Hide Report" : " Show Report"}
        </button>

        <button
          style={buttonStyle}
          onClick={share}
          title="Copy a shareable link to the shacl validation state"
          aria-label="Copy a shareable link to the shacl validation state"
        >
          <FontAwesomeIcon
            icon={faShareAlt}
            style={{ marginRight: "0.5rem" }}
          />
          {sharedCopied ? "Copied!" : "Share link"}
        </button>
      </div>

      <div style={containerStyle}>
        {(inputVisible || shapeVisible) && (
          <div style={editorContainerStyle}>
            {inputVisible && (
              <div style={columnStyle}>
                <h2 style={{ margin: "0 1rem", textAlign: "center" }}>
                  JSON-LD Input
                </h2>
                <Editor
                  value={jsonld}
                  onChange={(value) => setJsonld(value)}
                  options={MONACO_EDITOR_OPTIONS}
                  theme="vs-dark"
                  language="json"
                  style={editorStyle}
                />
              </div>
            )}

            {shapeVisible && (
              <div style={columnStyle}>
                <h2 style={{ margin: "0 1rem", textAlign: "center" }}>
                  Geoconnex SHACL Shape
                </h2>
                <Editor
                  value={shape}
                  options={OPTIONS_WITH_READONLY}
                  theme="vs-dark"
                  language="turtle"
                  style={editorStyle}
                />
              </div>
            )}
          </div>
        )}

        {reportVisible && (
          <div style={validationBoxStyle}>
            <button
              onClick={() => {
                const textToCopy = validationResult
                  ? `${
                      validationResult.valid
                        ? "✅ Conforms"
                        : "❌ Does Not Conform"
                    }\n${validationResult.message}`
                  : "";
                if (!textToCopy) return;
                navigator.clipboard.writeText(textToCopy);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "#444",
                border: "none",
                color: "#fff",
                padding: "0.3rem 0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem",
                transition: "all 0.3s",
              }}
              title="Copy validation report"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            </button>

            {error && <span style={{ color: "red" }}>❌ {error}</span>}

            {!error && validationResult && (
              <>
                <div style={validityStyle(validationResult.valid)}>
                  {validationResult.valid
                    ? "✅ Conforms"
                    : "❌ Does Not Conform"}
                </div>
                <div>{formatMessage(validationResult.message)}</div>
              </>
            )}

            {!error && !validationResult && (
              <span>Run SHACL validation to see results here.</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ShaclPlayground;
