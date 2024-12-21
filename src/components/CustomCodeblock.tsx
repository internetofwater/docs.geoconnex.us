import { HighlightedCode, Pre } from "codehike/code";
import { callout } from "./CodeHike/callout";
import React, { useState } from "react";
import { CopyButton } from "./CodeHike/copy";
import { collapse, collapseContent, collapseTrigger } from "./CodeHike/collapse";
import { link } from "./CodeHike/link";
import { mark } from "./CodeHike/mark";
import { tokenTransitions } from "./CodeHike/token-transitions";
import {focus } from "./CodeHike/focus";


export function CustomCodeblock({ codeblock }: { codeblock: HighlightedCode }) {  
  // Return the JSX with the code block and annotations

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        overflowX: "auto",
        width: "100%",
        borderRadius: "0.4em",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {codeblock.meta && (
        <div
          style={{
            backgroundColor: "#2a2d32",
            color: "#fafafa",
            paddingLeft: "1em",
            paddingTop: "1em",
            paddingBottom: "0.5em",
            fontStyle: "italic",
            fontSize: "0.9em",
            borderBottom: "3px solid #51555a",
          }}
        >
          {codeblock.meta}
        </div>
      )}

      <Pre
        code={codeblock}
        handlers={[callout, collapse, collapseTrigger, collapseContent, link, mark, tokenTransitions, focus]}
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
        <CopyButton text={codeblock.code} hovered={isHovered}/>
      </div>
    </div>
  );
}
