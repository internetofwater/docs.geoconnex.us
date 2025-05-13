import { AnnotationHandler, InnerLine } from "codehike/code"
import React from "react"

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    const width = props.totalLines.toString().length + 1
    return (
      <div style={{ display: "flex" }}>
        <span
          style={{
            textAlign: "right",
            opacity: 0.5,
            userSelect: "none",
            minWidth: `${width}ch`
          }}
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} style={{ flex: 1, paddingLeft: "0.5rem" }} />
      </div>
    )
  },
}
