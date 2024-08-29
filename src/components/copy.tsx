import { Copy, Check } from "lucide-react"
import React from "react"
import { useState } from "react"


export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (

    <button
      style={{ cursor: "pointer", opacity: 0.6 }}
      aria-label="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}

