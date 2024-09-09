import { HighlightedCode, Pre } from "codehike/code";
import { callout } from "./annotations/callout";
import React from "react";
import { CopyButton } from "./copy";
import { collapse, collapseContent, collapseTrigger } from "./collapse";
import { link } from "./link";
import { Block, HighlightedCodeBlock, parseProps } from "codehike/blocks";
import { z } from "zod";

// Define the schema for the props
const Schema = Block.extend({
  code: HighlightedCodeBlock,
  tooltips: z.array(Block).optional(),
});

export function MyCode(props: unknown) {
  // Parse the incoming props using the defined schema
  const { code, tooltips = [] } = parseProps(props, Schema);
  
  code.annotations = code.annotations.map((a) => {
    const tooltip = tooltips.find((t) => t.title === a.query);
    if (!tooltip) return a;
    return {
      ...a,
      data: { ...a.data, children: tooltip.children },
    };
  });

  // Return the JSX with the code block and annotations
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
      {code.meta && (
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
          {code.meta}
        </div>
      )}

      <Pre
        code={code}
        handlers={[callout, collapse, collapseTrigger, collapseContent, link, tooltips]}
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
        <CopyButton text={code.code} />
      </div>
    </div>
  );
}
