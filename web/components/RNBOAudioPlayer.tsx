"use client"
import { useEffect, useRef } from "react"
import { createDevice, Device } from "@rnbo/js"
import { useDarkMode } from "@/lib/useDarkMode"
import patch from "../patches/delay/patch.export.json"

export function RNBOAudioPlayer() {
  const { isDarkMode } = useDarkMode()
  const deviceRef = useRef<Device | null>(null)
  const contextRef = useRef<AudioContext | null>(null)
  const isInitializingRef = useRef(false)

  useEffect(() => {
    const initializeAudio = async () => {
      if (isInitializingRef.current) return
      isInitializingRef.current = true

      try {
        if (isDarkMode) {
          // Initialize or resume audio context
          if (!contextRef.current) {
            contextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
          }

          const context = contextRef.current

          // Resume context for autoplay policy
          if (context.state === "suspended") {
            await context.resume()
          }

          // Create device if not already created
          if (!deviceRef.current) {
            deviceRef.current = await createDevice({
              patcher: patch as any,
              context,
            })

            // Fetch and set audio buffer
            try {
              const fileResponse = await fetch(
                "https://res.cloudinary.com/object-sonore/video/upload/v1675972689/saint-salo-local/audio/gland-block_q0pbmb.wav"
              )
              const arrayBuf = await fileResponse.arrayBuffer()
              const audioBuf = await context.decodeAudioData(arrayBuf)

              await deviceRef.current.setDataBuffer("myfile", audioBuf)
            } catch (e) {
              console.warn("Could not load audio buffer:", e)
            }

            // Connect to speakers
            deviceRef.current.node.connect(context.destination)
          }

          // Start playback
          context.resume()
        } else {
          // Stop audio when exiting dark mode
          if (deviceRef.current && contextRef.current) {
            deviceRef.current.node.disconnect()
            if (contextRef.current.state !== "closed") {
              await contextRef.current.close()
            }
            deviceRef.current = null
            contextRef.current = null
          }
        }
      } catch (error) {
        console.error("Error initializing RNBO audio:", error)
      } finally {
        isInitializingRef.current = false
      }
    }

    initializeAudio()

    return () => {
      // Cleanup on unmount
      if (deviceRef.current && contextRef.current && !isDarkMode) {
        deviceRef.current.node.disconnect()
      }
    }
  }, [isDarkMode])

  // The site now loads straight into dark mode, so there's been no user gesture
  // and the browser keeps the AudioContext suspended. Resume it on the first
  // interaction (click / key / touch / scroll) so the music starts playing.
  useEffect(() => {
    if (!isDarkMode) return

    const resume = () => {
      const ctx = contextRef.current
      if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {})
    }

    const opts: AddEventListenerOptions = { passive: true }
    window.addEventListener("pointerdown", resume, opts)
    window.addEventListener("keydown", resume)
    window.addEventListener("touchstart", resume, opts)
    window.addEventListener("scroll", resume, opts)

    return () => {
      window.removeEventListener("pointerdown", resume)
      window.removeEventListener("keydown", resume)
      window.removeEventListener("touchstart", resume)
      window.removeEventListener("scroll", resume)
    }
  }, [isDarkMode])

  return null
}
