"use client"

import { Breadcrumb } from "@/components/Breadcrumb"
import { SynthComponent } from "../../synth/synth"
import { CopyButton } from "@/components/CopyButton"

const codeSample = `"use client"

import { useEffect, useRef, useState } from "react"
import * as Slider from "@radix-ui/react-slider"

// Dual keyboard mapping for polyphonic input
const KEYBOARD_MAP_LEFT = {
  a: 48, w: 49, s: 50, e: 51, d: 52, f: 53, t: 54,
  g: 55, h: 56, u: 57, j: 58, i: 59, k: 60, o: 61, l: 62,
}

const KEYBOARD_MAP_RIGHT = {
  z: 48, x: 49, c: 50, v: 51, b: 52, n: 53, m: 54,
  ",": 55, ".": 56,
}

export function SynthComponent() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [voiceCount, setVoiceCount] = useState(0)

  const [params, setParams] = useState({
    osc1: { waveform: "sawtooth", octave: 0, detune: 0, mix: 0.5 },
    osc2: { waveform: "triangle", octave: 0, detune: 5, mix: 0.5 },
    filter: { cutoff: 5000, resonance: 5, envDepth: 2 },
    noteEnvelope: { attack: 0.01, decay: 0.1, sustain: 0.7, release: 0.3 },
    filterEnvelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 0.5 },
    lfo: { rate: 2, depth: 200, waveform: "sine", destination: "filter" },
    masterVolume: 0.3,
  })

  const handleParamChange = (section, key, value) => {
    // Update parameters and synth engine
  }

  useEffect(() => {
    // Setup keyboard event listeners
  }, [])

  return (
    <div>
      <h1>Polyphonic Synthesizer</h1>
      {/* Control sliders using Radix UI */}
      {/* Oscillators, Filters, ADSR, LFO controls */}
    </div>
  )
}`

export function SynthWithBreadcrumb() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Patches", href: "/patches" },
          { label: "Synth", href: "/patches/synth" },
        ]}
      />
      <SynthComponent />

      <div className="p-8 md:p-12 bg-white my-8 rounded-sm">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>Using Web Audio API with dual oscillators and advanced synthesis.</div>
          <CopyButton value={codeSample} className="shrink-0" />
        </div>
        <pre className="text-sm md:text-base font-mono whitespace-pre-wrap wrap-break-word overflow-x-auto">
          {codeSample}
        </pre>
      </div>
    </div>
  )
}
