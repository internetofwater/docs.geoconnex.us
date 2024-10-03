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
    >
      {copied ? (
        <FontAwesomeIcon icon={faCheck} size="sm" color="green" />
      ) : (
        <Copy size={16} style={{ opacity: 0.5 }} />
      )}
    </button>
  );
}

export default CopyButton;
