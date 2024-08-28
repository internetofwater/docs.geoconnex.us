import {
    AnnotationHandler,
    BlockAnnotation,
    InnerLine
  } from "codehike/code";
  import {
    ChevronRightSquare
  } from "lucide-react";
  import React from "react";
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
  } from '@radix-ui/react-collapsible';
  
  export const collapse: AnnotationHandler = {
    name: "collapse",
    transform: (annotation: BlockAnnotation) => {
      const {
        fromLineNumber
      } = annotation;
      return [
        annotation,
        {
          ...annotation,
          fromLineNumber: fromLineNumber,
          toLineNumber: fromLineNumber,
          name: "CollapseTrigger",
        },
        {
          ...annotation,
          fromLineNumber: fromLineNumber + 1,
          name: "CollapseContent",
        },
      ];
    },
    Block: ({
      annotation,
      children
    }) => {
      return (
        <Collapsible defaultOpen={annotation.query !== "collapsed"}>
          {children}
        </Collapsible>
      );
    },
  };
  
  const icon = (
    <ChevronRightSquare
      style={{
        display: 'inline-block',
        transition: 'transform 0.2s, opacity 0.2s',
        opacity: '0.3',
        marginBottom: '2px',
      }}
      size={15}
      className="group-data-[state=closed]:-rotate-90 group-data-[state=closed]:opacity-80 group-hover:!opacity-100"
    />
  );
  
  export const collapseTrigger: AnnotationHandler = {
    name: "CollapseTrigger",
    onlyIfAnnotated: true,
    AnnotatedLine: ({
      annotation,
      ...props
    }) => (
      <CollapsibleTrigger>
        <InnerLine merge={props} data={{ icon }} />
      </CollapsibleTrigger>
    ),
    Line: (props) => {
      const icon = props.data?.icon as React.ReactNode;
      return (
        <div style={{ display: 'table-row' }}>
          <span style={{
            width: '20px',
            textAlign: 'center',
            display: 'table-cell'
          }}>
            {icon}
          </span>
          <div style={{ display: 'table-cell' }}>
            <InnerLine merge={props} />
          </div>
        </div>
      );
    },
  };
  
  export const collapseContent: AnnotationHandler = {
    name: "CollapseContent",
    Block: CollapsibleContent,
  };
  