"use client"
import { useState } from "react"
import { HiOutlineClipboard, HiCheck } from "react-icons/hi2"

interface CopyButtonProps {
  /** The text written to the clipboard when clicked. */
  value: string
  /** Visible label (and aria-label). Defaults to "Copy". */
  label?: string
  className?: string
}

export const CopyButton = ({ value, label = "Copy", className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable (e.g. non-secure context) — fail silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={`inline-flex items-center gap-1 p-2 text-sm font-sans ${className}`}
    >
      {copied ? <HiCheck aria-hidden /> : <HiOutlineClipboard aria-hidden />}
      {copied ? "Copied" : label}
    </button>
  )
}
