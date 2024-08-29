import { HighlightedCode, Pre } from "codehike/code";
import { callout } from "./annotations/callout";
import React from "react";
import { CopyButton } from "./copy";
import { collapse, collapseContent, collapseTrigger } from "./collapse";
import { link } from "./link"
import { Block, CodeBlock } from "codehike/blocks";
import { z } from "zod";

const Schema = Block.extend({
  code: CodeBlock,
  tooltips: z.array(Block).optional(),
})



export function MyCode({ codeblock }: { codeblock: HighlightedCode }) {
  // A custom component to render the code block using codehike instead of the default
  codeblock.annotations = codeblock.annotations.map((a) => {
    const tooltip = tooltips.find((t) => t.title === a.query)
    if (!tooltip) return a
    return {
      ...a,
      data: { ...a.data, children: tooltip.children },

    }
  })

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
        handlers={[callout, collapse, collapseTrigger, collapseContent, link, tooltip]}
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

