import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Copy } from "lucide-react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import './copy.css';

export function CopyButton({ text, hovered }: { text: string, hovered: boolean }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={`copy-button ${hovered ? 'visible' : ''}`}
      aria-label="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      style={{ background: 'transparent', border: 'none', padding: 3 }} // Make background transparent and remove border
    >
      {copied ? (
        <FontAwesomeIcon 
          icon={faCheck} 
          size="lg" 
          style={{ color: 'lightgreen', opacity: 0.8 , cursor: 'pointer'}} // Full opacity for the icon
        />
      ) : (
        <Copy size={18} color="white" style={{ opacity: 0.5 , cursor: 'pointer'}} />
      )}
    </button>
  );
}

export default CopyButton;
