import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAltH,
  faEye,
  faEyeSlash,
  faSync,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"; // Add faSpinner
import raw_output from "./associated_assets/raw_output.json";

const CLOUD_RUN_URL =
  "https://geoconnex-docs-templating-177886173191.us-central1.run.app";

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

const Playground = () => {
  const default_raw = {
    "type": "Feature",
    "id": "'AR008-331856091114601'",
    "properties": {
      "@iot.selfLink": "https://labs.waterdata.usgs.gov/sta/v1.1/Things('AR008-331856091114601')",
      "name": "AR008-331856091114601",
      "description": "Well",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -91.1969333333333,
        33.3169611111111
      ]
    },
  };

  const default_template = 'The feature name is {{ data["name"] }}';

  const [raw, setRaw] = useState(JSON.stringify(default_raw, null, 2));
  const [template, setTemplate] = useState(default_template);
  const [result, setResult] = useState(
    "// Here is where your jinja template will be applied"
  );
  const [error, setError] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [resultEditorVisible, setResultEditorVisible] = useState(true);
  const [rawEditorVisible, setRawEditorVisible] = useState(true);
  const [templateEditorVisible, setTemplateEditorVisible] = useState(true);
  const [loading, setLoading] = useState(false); // New loading state

  const updateResult = async () => {
    setLoading(true); // Set loading to true when starting the request
    setError("");

    try {
      const dataToSend = parseRawData(raw);
      const templatingRequest = { data: dataToSend, template: template };

      const response = await sendRequest(templatingRequest);
      handleResponse(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const parseRawData = (rawData) => {
    try {
      const parsedData = JSON.parse(rawData);
      // Rename the key 'properties' to 'data'
      parsedData.data = parsedData.properties;
      delete parsedData.properties;
      return parsedData;
    } catch (error) {
      throw new Error(`Error Parsing Raw JSON-LD: ${error.message}`);
    }
  };

  const sendRequest = async (templatingRequest) => {
    const string_rep = JSON.stringify(templatingRequest, null, 2);

    const response = await fetch(CLOUD_RUN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: string_rep,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error Sending Request: ${response.status} - ${text}`);
    }
    return response;
  };

  const handleResponse = async (response) => {
    try {
      // Ensure the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the text from the response
      const text = await response.text();

      // Try to parse the text as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.warn("Response is not valid JSON:", error);
        data = text; // Keep it as text if parsing fails
      }

      // Set the result, either as pretty-printed JSON or as plain text
      setResult(JSON.stringify(data, null, "\t"));
    } catch (error) {
      console.error("Error parsing returned response:", error);
      setResult("Error parsing returned response: " + error.message);
    }
  };

  const handleExampleChange = async (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "location") {
      const location_oriented_template = await fetch(
        "https://raw.githubusercontent.com/cgs-earth/sta-pygeoapi/main/templates/usgs-location-oriented.j2"
      );
      setTemplate(await location_oriented_template.text());
      setRaw(JSON.stringify(raw_output, null, 2));
    }
  };

  useEffect(() => {
    const asides = document.querySelectorAll("aside");
    asides.forEach((aside) => {
      aside.style.display = sidebarVisible ? "block" : "none";
    });
    return () => {
      asides.forEach((aside) => {
        aside.style.display = "";
      });
    };
  }, [sidebarVisible]);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    width: sidebarVisible ? "70vw" : "90vw",
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
    height: "calc(100% - 3rem)", // Adjust height based on header size
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    height: "4rem",
    textAlign: "center",
    fontWeight: "bold",
  };

  const buttonStyle = {
    marginRight: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3578e5", // Primary color
    color: "#fff", // Text color
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3", // Darker shade on hover
  };

  const errorStyle = {
    color: "red",
    padding: "1rem",
    textAlign: "center",
  };

  return (
    <>
      <div style={headerStyle}>
        <div>
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
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            <FontAwesomeIcon icon={faArrowsAltH} />
            {sidebarVisible ? " Maximize Width" : " Normal Width"}
          </button>
          <select
            style={{ margin: "0 1rem" }}
            onChange={handleExampleChange}
            defaultValue={""}
          >
            <option value="" disabled hidden>
              Pick an example
            </option>
            <option value="location">Location Oriented</option>
          </select>
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
            onClick={updateResult}
            disabled={loading} // Disable button while loading
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
            {loading ? " Templating..." : " Apply template"}
          </button>
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
            onClick={() => setRawEditorVisible(!rawEditorVisible)}
          >
            <FontAwesomeIcon icon={rawEditorVisible ? faEyeSlash : faEye} />
            {rawEditorVisible ? " Hide Raw" : " Show Raw"}
          </button>
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
            onClick={() => setTemplateEditorVisible(!templateEditorVisible)}
          >
            <FontAwesomeIcon
              icon={templateEditorVisible ? faEyeSlash : faEye}
            />
            {templateEditorVisible ? " Hide Template" : " Show Template"}
          </button>
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
            onClick={() => setResultEditorVisible(!resultEditorVisible)}
          >
            <FontAwesomeIcon icon={resultEditorVisible ? faEyeSlash : faEye} />
            {resultEditorVisible ? " Hide Result" : " Show Result"}
          </button>
        </div>
      </div>
      <div style={containerStyle}>
        <div style={editorContainerStyle}>
          {rawEditorVisible && (
            <div style={columnStyle}>
              <h2 style={{ margin: "0 1rem", textAlign: "center" }}>
                Raw JSON-LD Output
              </h2>
              <Editor
                value={raw}
                options={MONACO_EDITOR_OPTIONS}
                theme="vs-dark"
                language="json"
                onChange={(value) => setRaw(value)}
                style={editorStyle}
              />
            </div>
          )}
          {templateEditorVisible && (
            <div style={columnStyle}>
              <h2 style={{ margin: "0 1rem", textAlign: "center" }}>
                Jinja Template
              </h2>
              <Editor
                value={template}
                onChange={(value) => setTemplate(value)}
                options={MONACO_EDITOR_OPTIONS}
                theme="vs-dark"
                language="jinja"
                style={editorStyle}
              />
            </div>
          )}
          {resultEditorVisible && (
            <div style={columnStyle}>
              <h2 style={{ margin: "0 1rem", textAlign: "center" }}>Result</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {!error && (
                <Editor
                  value={result}
                  options={OPTIONS_WITH_READONLY}
                  theme="vs-dark"
                  language="json"
                  style={editorStyle}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Playground;