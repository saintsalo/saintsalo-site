"use client"

import { useEffect, useRef, useState } from "react"
import * as Slider from "@radix-ui/react-slider"
import { SynthEngine, type SynthParams } from "@/lib/synth-engine"

const KEYBOARD_MAP_LEFT = {
  a: 48,
  w: 49,
  s: 50,
  e: 51,
  d: 52,
  f: 53,
  t: 54,
  g: 55,
  h: 56,
  u: 57,
  j: 58,
  i: 59,
  k: 60,
  o: 61,
  l: 62,
}

const KEYBOARD_MAP_RIGHT = {
  z: 48,
  x: 49,
  c: 50,
  v: 51,
  b: 52,
  n: 53,
  m: 54,
  ",": 55,
  ".": 56,
}

type KeyMap = Record<string, number>
const FULL_KEYBOARD_MAP: KeyMap = { ...KEYBOARD_MAP_LEFT, ...KEYBOARD_MAP_RIGHT }

export function SynthComponent() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set())
  const [voiceCount, setVoiceCount] = useState(0)

  const synthRef = useRef<SynthEngine | null>(null)
  const contextRef = useRef<AudioContext | null>(null)
  const pressingKeysRef = useRef<Set<string>>(new Set())

  const [params, setParams] = useState<SynthParams>({
    osc1: { waveform: "sawtooth", octave: 0, detune: 0, mix: 0.5 },
    osc2: { waveform: "triangle", octave: 0, detune: 5, mix: 0.5 },
    filter: { cutoff: 5000, resonance: 5, envDepth: 2 },
    noteEnvelope: { attack: 0.01, decay: 0.1, sustain: 0.7, release: 0.3 },
    filterEnvelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 0.5 },
    lfo: { rate: 2, depth: 200, waveform: "sine", destination: "filter" },
    masterVolume: 0.3,
  })

  const updateVoiceCount = () => {
    if (synthRef.current) {
      setVoiceCount(synthRef.current.getVoiceCount())
    }
  }

  const initializeSynth = async () => {
    if (!contextRef.current) {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)()
      await context.resume()
      contextRef.current = context
      synthRef.current = new SynthEngine(context, params)
      setIsInitialized(true)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in FULL_KEYBOARD_MAP && !pressingKeysRef.current.has(key)) {
        pressingKeysRef.current.add(key)
        const note = FULL_KEYBOARD_MAP[key]
        if (synthRef.current) {
          synthRef.current.noteOn(note)
          setActiveNotes(prev => new Set([...prev, note]))
          updateVoiceCount()
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in FULL_KEYBOARD_MAP) {
        pressingKeysRef.current.delete(key)
        const note = FULL_KEYBOARD_MAP[key]
        if (synthRef.current) {
          synthRef.current.noteOff(note)
          setActiveNotes(prev => {
            const next = new Set(prev)
            next.delete(note)
            return next
          })
          updateVoiceCount()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const handleParamChange = (
    section: keyof SynthParams,
    key: string | number,
    value: number | string
  ) => {
    const newParams = { ...params }

    // Handle master volume as a top-level number
    if (section === "masterVolume") {
      newParams.masterVolume = value as number
    } else {
      const sectionData = newParams[section] as any
      sectionData[key as string] = value
    }

    setParams(newParams)

    if (synthRef.current) {
      if (section === "masterVolume") {
        synthRef.current.updateParam(section, value)
      } else {
        synthRef.current.updateParam(section, newParams[section])
      }
    }
  }

  const ControlSlider = ({
    label,
    min,
    max,
    step,
    value,
    onChange,
  }: {
    label: string
    min: number
    max: number
    step: number
    value: number
    onChange: (v: number) => void
  }) => (
    <div className="bg-off-white p-4 rounded-sm shadow-xs">
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-mono">{value.toFixed(2)}</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        onValueChange={val => onChange(val[0])}
        min={min}
        max={max}
        step={step}
      >
        <Slider.Track className="relative grow h-1 bg-gray-300 rounded-full">
          <Slider.Range className="absolute h-full bg-black rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-black rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer"
          aria-label={label}
        />
      </Slider.Root>
    </div>
  )

  const WaveformSelect = ({
    label,
    value,
    onChange,
  }: {
    label: string
    value: string
    onChange: (v: string) => void
  }) => (
    <div className="bg-off-white p-3 rounded-sm shadow-xs">
      <label className="text-sm font-medium block mb-2">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-sm"
      >
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
  )

  return (
    <div>
      <h1>Polyphonic Synthesizer</h1>
      <p className="mb-4">A fully functional synth with dual oscillators, filters, and effects.</p>

      {!isInitialized && (
        <div className="my-6">
          <button
            onClick={initializeSynth}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Initialize Synth →
          </button>
        </div>
      )}

      {isInitialized && (
        <>
          <div className="my-4 p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm">
              <strong>Keyboard:</strong> Left side (A-L), Right side (Z-M) | Active Voices:{" "}
              <span className="font-bold">{voiceCount}</span>
            </p>
          </div>

          {/* OSCILLATORS */}
          <div className="my-8">
            <h2 className="text-lg font-bold mb-4">Oscillators</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* OSC 1 */}
              <WaveformSelect
                label="OSC 1 Waveform"
                value={params.osc1.waveform}
                onChange={v => handleParamChange("osc1", "waveform", v)}
              />
              <ControlSlider
                label="OSC 1 Octave"
                min={-2}
                max={2}
                step={1}
                value={params.osc1.octave}
                onChange={v => handleParamChange("osc1", "octave", v)}
              />
              <ControlSlider
                label="OSC 1 Detune"
                min={-50}
                max={50}
                step={1}
                value={params.osc1.detune}
                onChange={v => handleParamChange("osc1", "detune", v)}
              />
              <ControlSlider
                label="OSC 1 Mix"
                min={0}
                max={1}
                step={0.01}
                value={params.osc1.mix}
                onChange={v => handleParamChange("osc1", "mix", v)}
              />

              {/* OSC 2 */}
              <WaveformSelect
                label="OSC 2 Waveform"
                value={params.osc2.waveform}
                onChange={v => handleParamChange("osc2", "waveform", v)}
              />
              <ControlSlider
                label="OSC 2 Octave"
                min={-2}
                max={2}
                step={1}
                value={params.osc2.octave}
                onChange={v => handleParamChange("osc2", "octave", v)}
              />
              <ControlSlider
                label="OSC 2 Detune"
                min={-50}
                max={50}
                step={1}
                value={params.osc2.detune}
                onChange={v => handleParamChange("osc2", "detune", v)}
              />
              <ControlSlider
                label="OSC 2 Mix"
                min={0}
                max={1}
                step={0.01}
                value={params.osc2.mix}
                onChange={v => handleParamChange("osc2", "mix", v)}
              />
            </div>
          </div>

          {/* FILTER */}
          <div className="my-8">
            <h2 className="text-lg font-bold mb-4">Filter</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <ControlSlider
                label="Cutoff Frequency (Hz)"
                min={20}
                max={20000}
                step={1}
                value={params.filter.cutoff}
                onChange={v => handleParamChange("filter", "cutoff", v)}
              />
              <ControlSlider
                label="Resonance (Q)"
                min={0.1}
                max={30}
                step={0.1}
                value={params.filter.resonance}
                onChange={v => handleParamChange("filter", "resonance", v)}
              />
              <ControlSlider
                label="Env Depth"
                min={0}
                max={5}
                step={0.1}
                value={params.filter.envDepth}
                onChange={v => handleParamChange("filter", "envDepth", v)}
              />
            </div>
          </div>

          {/* ENVELOPES */}
          <div className="my-8">
            <h2 className="text-lg font-bold mb-4">Envelopes (ADSR)</h2>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Note Envelope</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <ControlSlider
                  label="Attack (s)"
                  min={0}
                  max={2}
                  step={0.01}
                  value={params.noteEnvelope.attack}
                  onChange={v => handleParamChange("noteEnvelope", "attack", v)}
                />
                <ControlSlider
                  label="Decay (s)"
                  min={0}
                  max={2}
                  step={0.01}
                  value={params.noteEnvelope.decay}
                  onChange={v => handleParamChange("noteEnvelope", "decay", v)}
                />
                <ControlSlider
                  label="Sustain"
                  min={0}
                  max={1}
                  step={0.01}
                  value={params.noteEnvelope.sustain}
                  onChange={v => handleParamChange("noteEnvelope", "sustain", v)}
                />
                <ControlSlider
                  label="Release (s)"
                  min={0}
                  max={3}
                  step={0.01}
                  value={params.noteEnvelope.release}
                  onChange={v => handleParamChange("noteEnvelope", "release", v)}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Filter Envelope</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <ControlSlider
                  label="Attack (s)"
                  min={0}
                  max={2}
                  step={0.01}
                  value={params.filterEnvelope.attack}
                  onChange={v => handleParamChange("filterEnvelope", "attack", v)}
                />
                <ControlSlider
                  label="Decay (s)"
                  min={0}
                  max={2}
                  step={0.01}
                  value={params.filterEnvelope.decay}
                  onChange={v => handleParamChange("filterEnvelope", "decay", v)}
                />
                <ControlSlider
                  label="Sustain"
                  min={0}
                  max={1}
                  step={0.01}
                  value={params.filterEnvelope.sustain}
                  onChange={v => handleParamChange("filterEnvelope", "sustain", v)}
                />
                <ControlSlider
                  label="Release (s)"
                  min={0}
                  max={3}
                  step={0.01}
                  value={params.filterEnvelope.release}
                  onChange={v => handleParamChange("filterEnvelope", "release", v)}
                />
              </div>
            </div>
          </div>

          {/* LFO */}
          <div className="my-8">
            <h2 className="text-lg font-bold mb-4">LFO (Low Frequency Oscillator)</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <ControlSlider
                label="Rate (Hz)"
                min={0.1}
                max={20}
                step={0.1}
                value={params.lfo.rate}
                onChange={v => handleParamChange("lfo", "rate", v)}
              />
              <ControlSlider
                label="Depth"
                min={0}
                max={1000}
                step={10}
                value={params.lfo.depth}
                onChange={v => handleParamChange("lfo", "depth", v)}
              />
              <WaveformSelect
                label="LFO Waveform"
                value={params.lfo.waveform}
                onChange={v => handleParamChange("lfo", "waveform", v)}
              />
              <div className="bg-off-white p-3 rounded-sm shadow-xs">
                <label className="text-sm font-medium block mb-2">Destination</label>
                <select
                  value={params.lfo.destination}
                  onChange={e => handleParamChange("lfo", "destination", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="filter">Filter Cutoff</option>
                  <option value="pitch">Oscillator Pitch</option>
                </select>
              </div>
            </div>
          </div>

          {/* MASTER */}
          <div className="my-8">
            <h2 className="text-lg font-bold mb-4">Master</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <ControlSlider
                label="Master Volume"
                min={0}
                max={1}
                step={0.01}
                value={params.masterVolume}
                onChange={v => handleParamChange("masterVolume", "", v)}
              />
            </div>
          </div>

          <div className="p-4 md:p-6 bg-off-white my-8 rounded-sm text-sm opacity-70">
            <p className="mb-2">
              <strong>How to play:</strong> Use your computer keyboard to trigger notes. Left side
              (A-L) for left hand, right side (Z-M) for right hand. Each key maps to a different
              MIDI note.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
