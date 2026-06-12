"use client"
import { createDevice, Device, MIDIEvent, Parameter } from "@rnbo/js"
import { useState } from "react"
import patch from "../../../patches/delay/patch.export.json"
import { CopyButton } from "@/components/CopyButton"

const codeSample = `"use client"
import { createDevice, MIDIEvent, Parameter } from "@rnbo/js"
import { useState } from "react"
import patch from "../../../patches/delay/patch.export.json"

function Rnbo() {
  const [patchDevice, setPatchDevice] = useState<any>()
  const WAContext = window.AudioContext
  const context = new WAContext()

  const handleClick = async () => {
    const device = await createDevice({
      patcher: patch as any,
      context,
    })

    const fileResponse = await fetch(
      "https://res.cloudinary.com/object-sonore/video/upload/v1675972689/saint-salo-local/audio/gland-block_q0pbmb.wav"
    )
    const arrayBuf = await fileResponse.arrayBuffer()
    const audioBuf = await context.decodeAudioData(arrayBuf)

    await device.setDataBuffer("myfile", audioBuf)

    device.node.connect(context.destination)

    device.messageEvent.subscribe(e => console.log(e.payload))
    device.midiEvent.subscribe((e: MIDIEvent) => console.log(e.data))
    setPatchDevice(device)
    console.log(device.parameters)
  }

  // drag a slider -> push the value straight into the live device
  const updateParam = (param: Parameter, value: number) => {
    param.value = value
  }
  ...
  `

function Rnbo() {
  const [patchDevice, setPatchDevice] = useState<Device>()
  // mirror of each param's value so sliders stay controlled / re-render live
  const [paramValues, setParamValues] = useState<Record<string, number>>({})
  const [running, setRunning] = useState(false)

  const handleClick = async () => {
    const context = new window.AudioContext()
    await context.resume()

    const device = await createDevice({
      patcher: patch as any,
      context,
    })

    const fileResponse = await fetch(
      "https://res.cloudinary.com/object-sonore/video/upload/v1675972689/saint-salo-local/audio/gland-block_q0pbmb.wav",
    )
    const arrayBuf = await fileResponse.arrayBuffer()
    const audioBuf = await context.decodeAudioData(arrayBuf)

    await device.setDataBuffer("myfile", audioBuf)

    device.node.connect(context.destination)

    device.messageEvent.subscribe(e => console.log(e.payload))
    device.midiEvent.subscribe((e: MIDIEvent) => console.log(e.data))

    setParamValues(Object.fromEntries(device.parameters.map(p => [p.id, p.value])))
    setPatchDevice(device)
    setRunning(true)
  }

  const updateParam = (param: Parameter, value: number) => {
    param.value = value // pushes the new value into the live RNBO device
    setParamValues(prev => ({ ...prev, [param.id]: value }))
  }

  const resetParam = (param: Parameter) => updateParam(param, param.initialValue)

  return (
    <div>
      <h1>Exporting Web Audio with MAX/MSP using RNBO.</h1>
      <p className="mb-4">
        Start the patch, then drag the sliders to modify the delay parameters in real time.
        (sometimes a second click is needed to start the patch — seems like a streaming bug)
      </p>

      <div className="my-4">
        <button type="button" onClick={() => handleClick()}>
          {running ? "Restart RNBO Patch" : "Start RNBO Patch"} {`->`}
        </button>
      </div>

      {patchDevice && patchDevice.parameters && (
        <div className="my-8 grid gap-5 md:grid-cols-2">
          {patchDevice.parameters.map((param: Parameter) => {
            const value = paramValues[param.id] ?? param.value
            const range = param.max - param.min
            const step = param.steps > 1 ? range / (param.steps - 1) : range / 1000
            return (
              <div key={param.id} className="bg-off-white p-4 rounded-sm shadow-xs font-sans">
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor={param.id}>{param.displayName || param.name || param.id}</label>
                  <span className="tabular-nums">
                    {value.toFixed(3)}
                    {param.unit ? ` ${param.unit}` : ""}
                  </span>
                </div>
                <input
                  id={param.id}
                  type="range"
                  className="w-full"
                  min={param.min}
                  max={param.max}
                  step={step || "any"}
                  value={value}
                  onChange={e => updateParam(param, Number(e.target.value))}
                />
                <div className="flex items-center justify-between mt-1 text-xs opacity-60">
                  <span>{param.min}</span>
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 underline hover:bg-transparent"
                    onClick={() => resetParam(param)}
                  >
                    reset
                  </button>
                  <span>{param.max}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="p-8 md:p-12 bg-white my-8 rounded-sm">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>Using React / NextJs to pull in a patch.</div>
          <CopyButton value={codeSample} className="shrink-0" />
        </div>
        <pre className="text-sm md:text-base font-sans whitespace-pre-wrap wrap-break-word">
          {codeSample}
        </pre>
      </div>
    </div>
  )
}

export default Rnbo
