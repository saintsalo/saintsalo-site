"use client"
import { createDevice, MIDIEvent, Parameter } from "@rnbo/js"
import { useState } from "react"
import patch from "../../patches/delay/patch.export.json"

function Rnbo() {
  const [patchDevice, setPatchDevice] = useState<any>()
  let WAContext
  if (typeof window !== "undefined") {
    WAContext = window.AudioContext
  }

  if (!WAContext) return null

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

  return (
    <div>
      <h1>Exporting Web Audio with MAX/MSP using RNBO.</h1>
      (sometimes a seond click is needed to start the patch - seems like a streaming bug)
      <div>
        <button type="button" onClick={() => handleClick()}>
          Start MDX RNBO {`->`}
        </button>
      </div>
      {patchDevice && patchDevice.parameters && (
        <div>
          {patchDevice?.parameters.map((param: Parameter, index: any) => (
            <div key={index}>
              <div>{param.id}</div>
              <input defaultValue={param.value} />
              <div>
                <>{console.log(`PARAM: ${param.displayName}`)}</>
                <>{console.log(param)}</>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="p-20 bg-white my-8">
        <div>Using React / NextJs to pull in a patch.</div>
        <pre className="text-base font-sans">
          {`"use client"
import { createDevice, MIDIEvent, Parameter } from "@rnbo/js"
import { useState } from "react"
import patch from "../../patches/delay/patch.export.json"

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
  ...
  `}
        </pre>
      </div>
    </div>
  )
}

export default Rnbo
