// Synth Engine - Web Audio API based synthesizer
export interface OscillatorParams {
  waveform: OscillatorType
  octave: number
  detune: number
  mix: number
}

export interface FilterParams {
  cutoff: number
  resonance: number
  envDepth: number
}

export interface ADSRParams {
  attack: number
  decay: number
  sustain: number
  release: number
}

export interface LFOParams {
  rate: number
  depth: number
  waveform: OscillatorType
  destination: "filter" | "pitch"
}

export interface SynthParams {
  osc1: OscillatorParams
  osc2: OscillatorParams
  filter: FilterParams
  noteEnvelope: ADSRParams
  filterEnvelope: ADSRParams
  lfo: LFOParams
  masterVolume: number
}

export interface SynthVoice {
  note: number
  oscillator1: OscillatorNode
  oscillator2: OscillatorNode
  gainEnv: GainNode
  filterEnv: GainNode
  startTime: number
  releaseTime?: number
}

export class SynthEngine {
  private context: AudioContext
  private masterGain: GainNode
  private filter: BiquadFilterNode
  private filterEnv: GainNode
  private lfoOscillator: OscillatorNode
  private lfoGain: GainNode
  private voices: Map<number, SynthVoice> = new Map()
  private params: SynthParams

  constructor(context: AudioContext, params: SynthParams) {
    this.context = context
    this.params = params

    // Master gain
    this.masterGain = context.createGain()
    this.masterGain.gain.value = params.masterVolume
    this.masterGain.connect(context.destination)

    // Filter
    this.filter = context.createBiquadFilter()
    this.filter.type = "lowpass"
    this.filter.frequency.value = params.filter.cutoff
    this.filter.Q.value = params.filter.resonance
    this.filter.connect(this.masterGain)

    // Filter envelope
    this.filterEnv = context.createGain()
    this.filterEnv.gain.value = 0
    this.filterEnv.connect(this.filter.frequency)

    // LFO
    this.lfoOscillator = context.createOscillator()
    this.lfoOscillator.type = params.lfo.waveform
    this.lfoOscillator.frequency.value = params.lfo.rate

    this.lfoGain = context.createGain()
    this.lfoGain.gain.value = params.lfo.depth
    this.lfoOscillator.connect(this.lfoGain)

    // Route LFO to appropriate destination
    if (params.lfo.destination === "filter") {
      this.lfoGain.connect(this.filter.frequency)
    }

    this.lfoOscillator.start(0)
  }

  private noteToFreq(note: number): number {
    return 440 * Math.pow(2, (note - 69) / 12)
  }

  private createADSRCurve(
    startTime: number,
    params: ADSRParams,
    gainNode: GainNode,
    isRelease: boolean = false,
  ): number {
    const now = this.context.currentTime

    if (isRelease) {
      gainNode.gain.cancelScheduledValues(now)
      gainNode.gain.setValueAtTime(gainNode.gain.value, now)
      gainNode.gain.linearRampToValueAtTime(0, now + params.release)
      return now + params.release
    }

    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(1, startTime + params.attack)
    gainNode.gain.linearRampToValueAtTime(params.sustain, startTime + params.attack + params.decay)

    return startTime + params.attack + params.decay
  }

  noteOn(note: number): void {
    if (this.voices.has(note)) {
      return // Already playing
    }

    const startTime = this.context.currentTime
    const freq = this.noteToFreq(note)

    // Oscillator 1
    const osc1 = this.context.createOscillator()
    osc1.type = this.params.osc1.waveform
    osc1.frequency.value = freq * Math.pow(2, this.params.osc1.octave)
    osc1.detune.value = this.params.osc1.detune

    // Oscillator 2
    const osc2 = this.context.createOscillator()
    osc2.type = this.params.osc2.waveform
    osc2.frequency.value = freq * Math.pow(2, this.params.osc2.octave)
    osc2.detune.value = this.params.osc2.detune

    // Mix oscillators
    const osc1Gain = this.context.createGain()
    osc1Gain.gain.value = this.params.osc1.mix
    osc1.connect(osc1Gain)

    const osc2Gain = this.context.createGain()
    osc2Gain.gain.value = this.params.osc2.mix
    osc2.connect(osc2Gain)

    // Envelope for this voice
    const gainEnv = this.context.createGain()
    osc1Gain.connect(gainEnv)
    osc2Gain.connect(gainEnv)
    gainEnv.connect(this.filter)

    // Filter envelope for this note
    const filterEnv = this.context.createGain()
    filterEnv.gain.value = 0

    // Apply ADSR to note envelope
    this.createADSRCurve(startTime, this.params.noteEnvelope, gainEnv)

    // Apply ADSR to filter envelope with depth control
    const filterEnvAmount = this.params.filter.envDepth * 1000
    filterEnv.gain.setValueAtTime(0, startTime)
    filterEnv.gain.linearRampToValueAtTime(
      filterEnvAmount,
      startTime + this.params.filterEnvelope.attack,
    )
    filterEnv.gain.linearRampToValueAtTime(
      filterEnvAmount * this.params.filterEnvelope.sustain,
      startTime + this.params.filterEnvelope.attack + this.params.filterEnvelope.decay,
    )

    filterEnv.connect(this.filter.frequency)

    osc1.start(startTime)
    osc2.start(startTime)

    this.voices.set(note, {
      note,
      oscillator1: osc1,
      oscillator2: osc2,
      gainEnv,
      filterEnv,
      startTime,
    })
  }

  noteOff(note: number): void {
    const voice = this.voices.get(note)
    if (!voice) return

    const releaseEnd = this.createADSRCurve(
      this.context.currentTime,
      this.params.noteEnvelope,
      voice.gainEnv,
      true,
    )

    // Release filter envelope
    const now = this.context.currentTime
    voice.filterEnv.gain.cancelScheduledValues(now)
    voice.filterEnv.gain.setValueAtTime(voice.filterEnv.gain.value, now)
    voice.filterEnv.gain.linearRampToValueAtTime(0, now + this.params.filterEnvelope.release)

    // Stop oscillators after release
    setTimeout(() => {
      voice.oscillator1.stop()
      voice.oscillator2.stop()
      this.voices.delete(note)
    }, this.params.noteEnvelope.release * 1000)

    voice.releaseTime = this.context.currentTime
  }

  updateParam(param: keyof SynthParams, value: any): void {
    this.params[param] = value

    // Apply updates to nodes
    if (param === "masterVolume") {
      this.masterGain.gain.value = value
    } else if (param === "filter") {
      const filterParams = value as FilterParams
      this.filter.frequency.value = filterParams.cutoff
      this.filter.Q.value = filterParams.resonance
    } else if (param === "lfo") {
      const lfoParams = value as LFOParams
      this.lfoOscillator.type = lfoParams.waveform
      this.lfoOscillator.frequency.value = lfoParams.rate
      this.lfoGain.gain.value = lfoParams.depth
    }
  }

  getVoiceCount(): number {
    return this.voices.size
  }

  isNotePlaying(note: number): boolean {
    return this.voices.has(note)
  }

  allNotesOff(): void {
    this.voices.forEach((voice, note) => {
      this.noteOff(note)
    })
  }

  dispose(): void {
    this.allNotesOff()
    this.lfoOscillator.stop()
    this.filter.disconnect()
    this.masterGain.disconnect()
  }
}
