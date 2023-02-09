"use client"
import { createDevice } from "@rnbo/js"
import patch from "../patches/synth/export/feedback-synth.export.json"
const WAContext = window.AudioContext
export const setup = async () => {
  const context = new WAContext()

  const device = await createDevice({
    patcher: patch as any,
    context,
  })

  device.node.connect(context.destination)
}
