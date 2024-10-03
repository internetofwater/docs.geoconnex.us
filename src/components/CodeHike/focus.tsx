import {
    AnnotationHandler,
    InnerPre,
    getPreRef,
    InnerLine,
  } from "codehike/code"
  import React, { useLayoutEffect, useRef } from "react"
  
  export const focus: AnnotationHandler = {
    name: "focus",
    onlyIfAnnotated: true,
    PreWithRef: (props) => {
      const ref = getPreRef(props)
      useScrollToFocus(ref)
      return <InnerPre merge={props} />
    },
    Line: (props) => (
      <InnerLine
        merge={props}
        style={props['data-focus'] ? { opacity: "1", paddingLeft: "0.5rem", paddingRight: "0.5rem" } : { opacity: "0.5", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
      />
    ),
    AnnotatedLine: ({ annotation, ...props }) => (
      <InnerLine
        merge={props}
        data-focus={true}
        style={{ backgroundColor: "rgba(63, 63, 70, 0.3)" }}
      />
    ),
  }
  
  function useScrollToFocus(ref: React.RefObject<HTMLPreElement>) {
    const firstRender = useRef(true)
    useLayoutEffect(() => {
      if (ref.current) {
        // find all descendants with data-focus="true"
        const focusedElements = ref.current.querySelectorAll(
          "[data-focus=true]",
        ) as NodeListOf<HTMLElement>
  
        // find top and bottom of the focused elements
        const containerRect = ref.current.getBoundingClientRect()
        let top = Infinity
        let bottom = -Infinity
        focusedElements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          top = Math.min(top, rect.top - containerRect.top)
          bottom = Math.max(bottom, rect.bottom - containerRect.top)
        })
  
        // scroll to the focused elements if any part of them is not visible
        if (bottom > containerRect.height || top < 0) {
          ref.current.scrollTo({
            top: ref.current.scrollTop + top - 10,
            behavior: firstRender.current ? "instant" : "smooth",
          })
        }
        firstRender.current = false
      }
    }, [ref])
  }
  