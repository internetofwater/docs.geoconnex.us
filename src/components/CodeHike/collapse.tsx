import {
    AnnotationHandler,
    BlockAnnotation,
    InnerLine
  } from "codehike/code";
  import {
    ArrowRightCircle,
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
    <ArrowRightCircle
      style={{
        display: 'inline-block',
        marginTop: '1px',
        transition: 'transform 0.2s, opacity 0.2s',
        opacity: '0.8',
        marginBottom: '1px',
      }}
      size={15}
    />
  );
  
  export const collapseTrigger: AnnotationHandler = {

    name: "CollapseTrigger",
    onlyIfAnnotated: true,
    AnnotatedLine: ({ annotation, ...props }) => {
      return (
        <CollapsibleTrigger>
          <InnerLine merge={props} data={{ icon }} />
        </CollapsibleTrigger>
      );
    },
    Line: (props) => {
      const icon = props.data?.icon as React.ReactNode;
      return (
        <div style={{ display: 'table-row' }}>
            {icon}
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
  