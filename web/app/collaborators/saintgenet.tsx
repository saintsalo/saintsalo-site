"use client"
import { useState } from "react"
import Image from "next/image"

export const SaintGenet = () => {
  const [imageFocus, setImageFocus] = useState(false)
  return (
    <div>
      <h2>Saint Genet</h2>
      <p>
        Saint Genet is a company that creates large scale, innovative environmental installations,
        image-based opera, body-based performance and dance. Our work has been presented at Frye Art
        Museum, On the Boards, the Donau Festival, the Luminato Festival, and in any number of
        abandoned buildings, alleyways, and secret locations. dl Salo and Brian Lawlor composed and
        performed live for several performances including Paradisical Rites, Frail Affinities and
        Sorrows.
      </p>
    </div>
  )
}
