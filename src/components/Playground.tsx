import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

import raw_output from "./associated_assets/raw_output.json";

const FONT_SIZE = 13;
const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  fontSize: FONT_SIZE,
  minimap: {
    enabled: false,
  },
};

const OPTIONS_WITH_READONLY = {
  readOnly: true,
  automaticLayout: true,
  fontSize: FONT_SIZE,
  minimap: {
    enabled: false,
  },
};

const Playground = () => {
  const [raw, setRaw] = useState("{}");
  const [template, setTemplate] = useState("{}");
  const [result, setResult] = useState(
    "// Here is where your jinja template will be applied"
  );
  const [error, setError] = useState("");

  // hide docusaurus sidebar on mount
  // useEffect(() => {
  //   const asides = document.querySelectorAll("aside");
  //   asides.forEach((aside) => {
  //     aside.style.display = "none";
  //   });
  //   return () => {
  //     asides.forEach((aside) => {
  //       aside.style.display = "";
  //     });
  //   };
  // }, []);

  const updateResult = async () => {
    try {
      setError("");

      const dataValue = raw || "{}";

      let parsedData;
      try {
        parsedData = JSON.parse(dataValue);
      } catch (e) {
        setError("Invalid JSON data");
        setResult("");
        return;
      }

      // Here, you would handle the templating logic, but we're skipping it as there's no remote fetching.
      const templatedResult = JSON.stringify(parsedData, null, 2); // Example operation
      setResult(templatedResult);
    } catch (e) {
      console.error(e);
      setError("An error occurred");
      setResult("");
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

  const containerStyle = {
    display: "flex",
    height: "80vh",
    // change to 90vw for larger screens
    width: "70vw",
    overflow: "hidden",
    margin: 0,
    padding: 0, // Remove padding to prevent extra width
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
    height: "calc(100% - 3rem)", // Adjust based on header size
  };

  const headerStyle = {
    margin: 0,
    textAlign: "center",
  };

  const errorStyle = {
    color: "red",
    padding: "1rem",
    textAlign: "center",
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={editorContainerStyle}>
          <div style={columnStyle}>

          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "3rem", paddingLeft: "3rem" }}>

            <h2 style={headerStyle}>Raw JSON Output</h2>
            <select style={{ flex: "none" }} onChange={handleExampleChange}>
              <option value="" selected disabled hidden>
                Pick an example
              </option>
              <option value="location"> Location Oriented </option>
              <option value="dataset"> Dataset Oriented </option>
            </select>
            </div>

            <Editor
              value={raw}
              options={MONACO_EDITOR_OPTIONS}
              theme="vs-dark"
              language="json"
              onChange={(value) => setRaw(value)}
              style={editorStyle}
            />
          </div>
          <div style={columnStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "3rem", paddingLeft: "3rem" }}>
              <h2 style={headerStyle}>Jinja Template</h2>
              <button onClick={updateResult}>Update Result</button>
            </div>
            <Editor
              value={template}
              onChange={(value) => setTemplate(value)}
              options={MONACO_EDITOR_OPTIONS}
              theme="vs-dark"
              language="jinja"
              style={editorStyle}
            />
          </div>
          <div style={columnStyle}>
            <h2 style={headerStyle}>Templated Result</h2>
            {!error ? (
              <Editor
                value={result}
                options={OPTIONS_WITH_READONLY}
                theme="vs-dark"
                language="json"
                style={editorStyle}
              />
            ) : (
              <div style={errorStyle}>{error}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Playground;
