import React, { useEffect } from "react";

const SparqlEditor = () => {
  useEffect(() => {
    if (!customElements.get("sparql-editor")) {
      import("@sib-swiss/sparql-editor");
    }
  }, []);

  return (
    <>
      <style>
        {/* remove the sparql buttons that link to examples 
        or other utilities that we don't support at the moment */}
        {`
          #status-link,
          #sparql-add-prefixes-btn,
          #sparql-save-example-btn,
          #sparql-clear-cache-btn,
          #sparql-toggle-examples-btn,
          #sparql-cls-overview-btn {
            display: none !important;
          }
        `}
      </style>
      <sparql-editor
        endpoint="https://graph.geoconnex.us"
        default-method=""
        add-limit="10000"
        examples-on-main-page="0"
        examples-repo-add-url=""
        examples-repository=""
        examples-namespace=""
        style={{ "--btn-color": "white", "--btn-bg-color": "#3578e5" }}
      ></sparql-editor>
    </>
  );
};

export default SparqlEditor;
