---
sidebar_position: 2
title: "SPARQL Query Helper"
hide_title: true
hide_table_of_contents: true
---

<!-- this is hacky fix to allow for full width https://stackoverflow.com/questions/74666779/override-max-width-of-specific-docs-not-all-docs -->
<head>
  <html class="fullWidthContent">
  </html>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { useState } from 'react';

export default function SPARQLQueryHelper() {
  const [loading, setLoading] = useState(true);

  const spinnerOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: 10,
  };

  const spinnerStyle = {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #3498db",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  };

  const iframeContainerStyle = {
    position: "relative",
    width: "100%",
    height: "80vh",
  };

  const iframeStyle = {
    border: "none",
    width: "100%",
    height: "100%",
    display: "block",
  };

  // Inject the keyframes animation dynamically
  if (typeof document !== "undefined" && !document.getElementById("spinner-style")) {
    const style = document.createElement("style");
    style.id = "spinner-style";
    style.innerHTML = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <Tabs>
      <TabItem value="search" label="Search" default>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em" }}>
          <h1>Geoconnex SPARQL Query Helper</h1>
        </div>

        <div style={iframeContainerStyle}>
          {loading && (
            <div style={spinnerOverlayStyle}>
              <div style={spinnerStyle}></div>
            </div>
          )}
          <iframe
            src="https://sparql-ui-414886575015.us-central1.run.app/"
            title="SPARQL Query Helper"
            onLoad={() => setLoading(false)}
            style={iframeStyle}
          />
        </div>
      </TabItem>

      <TabItem value="help" label="Help and Background Info">
        <div style={{ fontSize: "1.5em", fontWeight: "bold", margin: "1em 0 0.5em 0" }}>
          SPARQL Query Helper Overview
        </div>
        This page allows you to create SPARQL queries to fetch data from the <a href="https://graph.geoconnex.us">Geoconnex graph database</a>. Since the Geoconnex graph database has a public endpoint, you can use both this page or any HTTP client to fetch data.

        If your query returns well-known-text (wkt) geometry, you can view it on a map by changing the output from <code>Table</code> to <code>Map</code> in the bottom left of the editor.

        For more detail about accessing data in Geoconnex, view the <a href="/access/overview">access data</a> section generally and the <a href="/access/examples/datasets#sparql">SPARQL section</a> in particular.
      </TabItem>
    </Tabs>
  );
}
