import { HighlightedCode, Pre } from "codehike/code"
import { callout } from "./annotations/callout"
import React from "react"

export function MyCode({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <div>
      <Pre
        code={codeblock}
        handlers={[callout]}
        style={{ background: "#212121", color: "#fafafa" }}
      />
    </div>
  )
}