import { HighlightedCode, Pre } from "codehike/code";
import { callout } from "./annotations/callout";
import React from "react";
import { CopyButton } from "./copy";

export function MyCode({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        overflowX: "auto",
        width: "100%",
      }}
      className="px-4 bg-zinc-950 rounded"
    >
      {codeblock.meta && (
        <div
          style={{
            backgroundColor: "#2a2d32",
            color: "#fafafa",
            paddingLeft: "1em",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
            fontStyle: "italic",
          }}
        >
          {codeblock.meta}
        </div>
      )}

      <Pre
        code={codeblock}
        handlers={[callout]}
        style={{
          position: "relative",
          padding: "1em",
          background: "#2a2d32",
          color: "#fafafa",
          borderRadius: "4px",
          whiteSpace: "pre", // Prevents word wrapping
          overflowX: "auto", // Enables horizontal scrolling for the code block
          width: "100%", // Ensures the code block takes up the full width of the container
          boxSizing: "border-box", // Includes padding and border in the element's total width and height
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
        }}
      >
        <CopyButton text={codeblock.code} />
      </div>
    </div>
  );
}

