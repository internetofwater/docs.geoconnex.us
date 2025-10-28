import React from "react";
import CodeBlock from "@theme/CodeBlock";
// @ts-ignore ignore types since it is a special static import
import shapeContent from "!!raw-loader!@site/static/shapes/geoconnex.ttl";

// load a codeblock with the shacl shape; note that this is a special static import
// that fetches the shape from the remote location at buildtime
// it should be always up-to-date after a build; if the shape is updated, you
// should rebuild 
const ShaclShape = () => {
  return <CodeBlock className="language-turtle">{shapeContent}</CodeBlock>;
};

export default ShaclShape;
