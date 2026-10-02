import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

// @zazuko/yasgui (via dompurify) runs code at import time that assumes a
// real DOM is present, which crashes Docusaurus's Node-based SSR build. Only
// ever load it client-side.
export default function SparqlQueryEditor() {
  return (
    <BrowserOnly fallback={<div style={{ padding: "1rem" }}>Loading SPARQL editor...</div>}>
      {() => {
        const SparqlQueryEditorImpl = require("./SparqlQueryEditorImpl").default;
        return <SparqlQueryEditorImpl />;
      }}
    </BrowserOnly>
  );
}
