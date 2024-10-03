import { AnnotationHandler, BlockAnnotation, InnerLine } from "codehike/code";
import { ArrowRightCircle, ArrowDownCircle } from "lucide-react";
import React, { useState } from "react"; // Import useState
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

export const collapse: AnnotationHandler = {
  name: "collapse",
  transform: (annotation: BlockAnnotation) => {
    const { fromLineNumber } = annotation;
    return [
      annotation,
      {
        ...annotation,
        fromLineNumber: fromLineNumber, // Keep the fromLineNumber the same
        toLineNumber: fromLineNumber, // Keep the toLineNumber the same
        name: "CollapseTrigger",
      },
      {
        ...annotation,
        fromLineNumber: fromLineNumber + 1, // Keep this as is to set the content line
        name: "CollapseContent",
      },
    ];
  },
  Block: ({ annotation, children }) => {
    return (
      <Collapsible defaultOpen={annotation.query === "collapsed"}>
        {children}
      </Collapsible>
    );
  },
};

export const collapseTrigger: AnnotationHandler = {
  name: "CollapseTrigger",
  onlyIfAnnotated: true,
  AnnotatedLine: ({ annotation, ...props }) => {
    const [isOpen, setIsOpen] = useState(false); // Local state to manage open/close

    return (
      <>
        <InnerLine merge={props} />
        <CollapsibleTrigger
          style={{
            backgroundColor: "transparent",
            padding: 0,
            border: "none",
            position: "absolute",
            left: 0,
          }}
          onClick={() => setIsOpen((prev) => !prev)} // Toggle the open state on click
        >
          {isOpen ? (
            <ArrowDownCircle size={14} cursor={"pointer"} /> // Down arrow when open
          ) : (
            <ArrowRightCircle size={14} cursor={"pointer"} /> // Side arrow when closed
          )}
        </CollapsibleTrigger>
      </>
    );
  },
  Line: (props) => {
    const icon = props.data?.icon as React.ReactNode;
    return (
      <>
        <div style={{ display: "table-row" }}>{icon}</div>
        <InnerLine merge={props} />
      </>
    );
  },
};

export const collapseContent: AnnotationHandler = {
  name: "CollapseContent",
  Block: CollapsibleContent,
};
