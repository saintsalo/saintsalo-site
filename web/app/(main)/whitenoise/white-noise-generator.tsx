"use client"

import { useState, useRef, useEffect } from "react"

interface AudioControls {
  volume: number
  frequency: number
  delayTime: number
  delayFeedback: number
}

export function WhiteNoiseGenerator() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [controls, setControls] = useState<AudioControls>({
    volume: 0.3,
    frequency: 12000,
    delayTime: 0.5,
    delayFeedback: 0.4,
  })

  const audioContextRef = useRef<AudioContext | null>(null)
  const bufferSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const filterNodeRef = useRef<BiquadFilterNode | null>(null)
  const delayNodeRef = useRef<DelayNode | null>(null)
  const delayFeedbackRef = useRef<GainNode | null>(null)
  const dryGainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (isPlaying) {
        stopNoise()
      }
    }
  }, [isPlaying])

  const createWhiteNoise = (context: AudioContext, duration: number = 2) => {
    const sampleRate = context.sampleRate
    const length = sampleRate * duration
    const noiseBuffer = context.createBuffer(1, length, sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1
    }
    return noiseBuffer
  }

  const startNoise = async () => {
    if (!audioContextRef.current) {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)()
      await context.resume()
      audioContextRef.current = context

      // Create filter node
      const filter = context.createBiquadFilter()
      filter.type = "lowpass"
      filter.frequency.value = controls.frequency
      filterNodeRef.current = filter

      // Create delay node
      const delay = context.createDelay(5)
      delay.delayTime.value = controls.delayTime
      delayNodeRef.current = delay

      // Create feedback for delay
      const delayFeedback = context.createGain()
      delayFeedback.gain.value = controls.delayFeedback
      delayFeedbackRef.current = delayFeedback

      // Create dry gain (for the filter output)
      const dryGain = context.createGain()
      dryGain.gain.value = 0.7
      dryGainRef.current = dryGain

      // Create main gain node (wet delay)
      const wetGain = context.createGain()
      wetGain.gain.value = 0.3

      // Create master gain node
      const gainNode = context.createGain()
      gainNode.gain.value = controls.volume
      gainNodeRef.current = gainNode

      // Connect: source -> filter
      // filter -> dry path + wet path (delay)
      // dry path: filter -> dryGain -> gainNode -> destination
      // wet path: filter -> delay -> delayFeedback -> delay (feedback loop)
      //           delay -> wetGain -> gainNode -> destination

      filter.connect(dryGain)
      filter.connect(delay)

      dryGain.connect(gainNode)
      delay.connect(delayFeedback)
      delayFeedback.connect(delay) // Feedback loop
      delay.connect(wetGain)
      wetGain.connect(gainNode)

      gainNode.connect(context.destination)

      // Create and play white noise buffer (looping)
      const noiseBuffer = createWhiteNoise(context, 2)
      const source = context.createBufferSource()
      source.buffer = noiseBuffer
      source.loop = true
      source.connect(filter)
      source.start(0)
      bufferSourceRef.current = source
    }

    setIsPlaying(true)
  }

  const stopNoise = () => {
    if (bufferSourceRef.current) {
      try {
        bufferSourceRef.current.stop()
      } catch (e) {
        // Already stopped
      }
      bufferSourceRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    setIsPlaying(false)
  }

  const handleVolumeChange = (value: number) => {
    setControls(prev => ({ ...prev, volume: value }))
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = value
    }
  }

  const handleFrequencyChange = (value: number) => {
    setControls(prev => ({ ...prev, frequency: value }))
    if (filterNodeRef.current) {
      filterNodeRef.current.frequency.value = value
    }
  }

  const handleDelayTimeChange = (value: number) => {
    setControls(prev => ({ ...prev, delayTime: value }))
    if (delayNodeRef.current) {
      delayNodeRef.current.delayTime.value = value
    }
  }

  const handleDelayFeedbackChange = (value: number) => {
    setControls(prev => ({ ...prev, delayFeedback: value }))
    if (delayFeedbackRef.current) {
      delayFeedbackRef.current.gain.value = value
    }
  }

  const toggleNoise = () => {
    if (isPlaying) {
      stopNoise()
    } else {
      startNoise()
    }
  }

  return (
    <div>
      <h1>White Noise Generator</h1>
      <p className="mb-4">
        A white noise generator with frequency filtering and delay effect controls.
      </p>

      <div className="my-6">
        <button
          type="button"
          onClick={toggleNoise}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {isPlaying ? "Stop" : "Start"} {`->`}
        </button>
      </div>

      <div className="my-8 grid gap-5 md:grid-cols-2">
        {/* Volume Control */}
        <div className="bg-off-white p-4 rounded-sm shadow-xs font-sans">
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="volume">Volume</label>
            <span className="tabular-nums">{controls.volume.toFixed(3)}</span>
          </div>
          <input
            id="volume"
            type="range"
            className="w-full"
            min="0"
            max="1"
            step="0.01"
            value={controls.volume}
            onChange={e => handleVolumeChange(Number(e.target.value))}
          />
          <div className="flex items-center justify-between mt-1 text-xs opacity-60">
            <span>0</span>
            <button
              type="button"
              className="border-0 bg-transparent p-0 underline hover:bg-transparent"
              onClick={() => handleVolumeChange(0.3)}
            >
              reset
            </button>
            <span>1</span>
          </div>
        </div>

        {/* Filter Frequency Control */}
        <div className="bg-off-white p-4 rounded-sm shadow-xs font-sans">
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="frequency">Filter Frequency (Hz)</label>
            <span className="tabular-nums">{controls.frequency.toFixed(0)}</span>
          </div>
          <input
            id="frequency"
            type="range"
            className="w-full"
            min="20"
            max="20000"
            step="1"
            value={controls.frequency}
            onChange={e => handleFrequencyChange(Number(e.target.value))}
          />
          <div className="flex items-center justify-between mt-1 text-xs opacity-60">
            <span>20</span>
            <button
              type="button"
              className="border-0 bg-transparent p-0 underline hover:bg-transparent"
              onClick={() => handleFrequencyChange(12000)}
            >
              reset
            </button>
            <span>20000</span>
          </div>
        </div>

        {/* Delay Time Control */}
        <div className="bg-off-white p-4 rounded-sm shadow-xs font-sans">
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="delayTime">Delay Time (s)</label>
            <span className="tabular-nums">{controls.delayTime.toFixed(3)}</span>
          </div>
          <input
            id="delayTime"
            type="range"
            className="w-full"
            min="0.01"
            max="2"
            step="0.01"
            value={controls.delayTime}
            onChange={e => handleDelayTimeChange(Number(e.target.value))}
          />
          <div className="flex items-center justify-between mt-1 text-xs opacity-60">
            <span>0.01</span>
            <button
              type="button"
              className="border-0 bg-transparent p-0 underline hover:bg-transparent"
              onClick={() => handleDelayTimeChange(0.5)}
            >
              reset
            </button>
            <span>2</span>
          </div>
        </div>

        {/* Delay Feedback Control */}
        <div className="bg-off-white p-4 rounded-sm shadow-xs font-sans">
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="delayFeedback">Delay Feedback</label>
            <span className="tabular-nums">{controls.delayFeedback.toFixed(3)}</span>
          </div>
          <input
            id="delayFeedback"
            type="range"
            className="w-full"
            min="0"
            max="0.8"
            step="0.01"
            value={controls.delayFeedback}
            onChange={e => handleDelayFeedbackChange(Number(e.target.value))}
          />
          <div className="flex items-center justify-between mt-1 text-xs opacity-60">
            <span>0</span>
            <button
              type="button"
              className="border-0 bg-transparent p-0 underline hover:bg-transparent"
              onClick={() => handleDelayFeedbackChange(0.4)}
            >
              reset
            </button>
            <span>0.8</span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-off-white my-8 rounded-sm text-sm opacity-70 dark:text-black">
        <p>
          This white noise generator uses the Web Audio API to create real-time audio processing.
          Adjust the volume, cutoff frequency, and delay parameters using the sliders. The filter
          removes high frequencies to create a softer sound, and the delay effect adds repeats with
          configurable time and feedback.
        </p>
      </div>
    </div>
  )
}
