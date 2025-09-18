import React, { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";

const ShaclShape = ({ url }) => {
  const [ttlContent, setTtlContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShape = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setTtlContent(text);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchShape();
  }, [url]);

  if (error) {
    return (
      <div style={{ color: "red" }}>Error loading SHACL shape: {error}</div>
    );
  }

  if (!ttlContent) {
    return <div>Loading SHACL shape...</div>;
  }

  return <CodeBlock className="language-turtle">{ttlContent}</CodeBlock>;
};

export default ShaclShape;
