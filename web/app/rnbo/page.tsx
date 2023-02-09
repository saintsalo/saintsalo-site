// "use client"
// import { createDevice, MIDIEvent, Parameter } from "@rnbo/js"
// import { useState } from "react"
// import patch from "../../patches/delay/patch.export.json"

function Rnbo() {
  // const [patchDevice, setPatchDevice] = useState<any>()
  // const WAContext = window.AudioContext
  // const context = new WAContext()

  // const handleClick = async () => {
  //   const device = await createDevice({
  //     patcher: patch as any,
  //     context,
  //   })

  //   const fileResponse = await fetch("/assets/body-1.wav")
  //   const arrayBuf = await fileResponse.arrayBuffer()
  //   const audioBuf = await context.decodeAudioData(arrayBuf)

  //   await device.setDataBuffer("myfile", audioBuf)

  //   device.node.connect(context.destination)

  //   device.messageEvent.subscribe(e => console.log(e.payload))
  //   device.midiEvent.subscribe((e: MIDIEvent) => console.log(e.data))
  //   setPatchDevice(device)
  //   console.log(device.parameters)
  // }

  return (
    <div>
      rnbo
      {/* <button onClick={() => handleClick()}>Start MDX RNBO</button>
      {patchDevice && (
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
      )} */}
    </div>
  )
}

export default Rnbo
