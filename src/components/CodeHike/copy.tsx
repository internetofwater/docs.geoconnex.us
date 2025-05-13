import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Copy } from "lucide-react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function CopyButton({ text, hovered }: { text: string, hovered: boolean }) {
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <button
      aria-label="Copy code to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault(); // Prevents page scroll when pressing space
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }
      }}
      style={{
        background: 'transparent',
        border: 'none',
        padding: 3,
        cursor: 'pointer',
        opacity: hovered || focused ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      {copied ? (
        <FontAwesomeIcon 
          icon={faCheck} 
          size="lg" 
          style={{ color: 'lightgreen', opacity: 0.8 }} 
        />
      ) : (
        <Copy size={18} color="white" style={{ opacity: 0.5 }} />
      )}
      {/* Aria-live region for announcing copied state */}
      <span 
        role="status" 
        aria-live="polite" 
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

export default CopyButton;
