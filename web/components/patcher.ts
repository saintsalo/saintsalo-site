import { createDevice } from "@rnbo/js"
import patch from "../patches/synth/export/feedback-synth.export.json"

let context: AudioContext

context = new AudioContext()

const device = await createDevice({
  patcher: patch,
  context,
})
