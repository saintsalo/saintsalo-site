"use client"

import { Breadcrumb } from "@/components/Breadcrumb"
import { WhiteNoiseGenerator } from "../../whitenoise/white-noise-generator"
import { CopyButton } from "@/components/CopyButton"

const codeSample = `"use client"

import { useState, useRef, useEffect } from "react"

export function WhiteNoiseGenerator() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [controls, setControls] = useState({
    volume: 0.3,
    frequency: 12000,
    delayTime: 0.5,
    delayFeedback: 0.4,
  })

  const audioContextRef = useRef<AudioContext | null>(null)
  const bufferSourceRef = useRef<AudioBufferSource | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const filterNodeRef = useRef<BiquadFilterNode | null>(null)
  const delayNodeRef = useRef<DelayNode | null>(null)
  const delayFeedbackRef = useRef<GainNode | null>(null)

  const createWhiteNoise = (context: AudioContext) => {
    const sampleRate = context.sampleRate
    const length = sampleRate * 2
    const noiseBuffer = context.createBuffer(1, length, sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1
    }
    return noiseBuffer
  }

  const startNoise = async () => {
    const context = new window.AudioContext()
    await context.resume()

    const filter = context.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.value = controls.frequency

    const delay = context.createDelay(5)
    delay.delayTime.value = controls.delayTime

    const delayFeedback = context.createGain()
    delayFeedback.gain.value = controls.delayFeedback

    const gainNode = context.createGain()
    gainNode.gain.value = controls.volume

    filter.connect(gainNode)
    delay.connect(delayFeedback)
    delayFeedback.connect(delay)
    delay.connect(gainNode)
    gainNode.connect(context.destination)

    const noiseBuffer = createWhiteNoise(context)
    const source = context.createBufferSource()
    source.buffer = noiseBuffer
    source.loop = true
    source.connect(filter)
    source.start(0)

    audioContextRef.current = context
    bufferSourceRef.current = source
    gainNodeRef.current = gainNode
    filterNodeRef.current = filter
    delayNodeRef.current = delay
    delayFeedbackRef.current = delayFeedback
    setIsPlaying(true)
  }

  const stopNoise = () => {
    if (bufferSourceRef.current) {
      bufferSourceRef.current.stop()
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
    setIsPlaying(false)
  }

  // ... rest of implementation
}`

export function WhiteNoiseWithBreadcrumb() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Patches", href: "/patches" },
          { label: "White Noise", href: "/patches/whitenoise" },
        ]}
      />
      <WhiteNoiseGenerator />

      <div className="p-8 md:p-12 bg-white my-8 rounded-sm">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>Using Web Audio API with delay and filtering.</div>
          <CopyButton value={codeSample} className="shrink-0" />
        </div>
        <pre className="text-sm md:text-base font-mono whitespace-pre-wrap wrap-break-word overflow-x-auto">
          {codeSample}
        </pre>
      </div>
    </div>
  )
}
