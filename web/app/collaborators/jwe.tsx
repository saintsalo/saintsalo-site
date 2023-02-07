"use client"
import { useState } from "react"
import Image from "next/image"

export const Jwe = () => {
  const [imageFocus, setImageFocus] = useState(false)
  return (
    <div>
      <h2>Joy Wants Eternity</h2>
      <p>
        Ambient instrumental ensemble Joy Wants Eternity originated in a Seattle basement fall 2003
        as a gathering of several musicians experimenting with instrumental walls of noise. Joy
        Wants Eternity released three albums Must You Smash Your Ears Before You Learn to Listen
        with Your Eyes (EP - 2005), You Who Pretend to Sleep (2007), and The Fog is Rising (2012).
        Along with member dl Salo&apos;s score, they performed on the soundtrack Mad Tiger.
      </p>
    </div>
  )
}
