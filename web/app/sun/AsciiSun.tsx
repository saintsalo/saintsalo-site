"use client"

import { useEffect, useRef, useState } from "react"

// Brightness ramp from dark -> bright. Index into this with a 0..1 value.
const RAMP = " .`'\":;~-=+coaO*%#&@"

// ---------------------------------------------------------------------------
// Default settings. Tweak live with the panel (press "S"), then use the panel's
// "Log to console" button to print these out and paste them back here.
// ---------------------------------------------------------------------------
type Settings = {
  // timing / sizing
  loopMs: number
  fps: number
  density: number // target number of columns; drives font size
  cellAspect: number // monospace cell height / width correction
  // sun geometry
  sunX: number // 0..1 horizontal position
  sunRadius: number // fraction of viewport height
  // horizontal bands (the retro sun)
  bandSpacing: number // band cycle height, in cell-heights
  bandMinLit: number // lit fraction of a band at the horizon
  bandMaxLit: number // lit fraction near the top of the dome
  bandFalloff: number // how quickly bands dissolve toward the horizon
  // radiating light
  rayCount: number
  rayRotateSpeed: number
  sparkleCount: number
  sparkleSpeed: number
  // brightness / shimmer
  discBrightness: number
  discShimmer: number
  gapGlow: number
  coronaBase: number
  coronaSpread: number
  flickerSpeed: number
  flickerAmount: number
  skyTwinkle: number
  // appearance
  glow: number // drop-shadow blur in px (0 = off)
  glowColor: string
  // gradient stops (color + position %)
  c0: string
  p0: number
  c1: string
  p1: number
  c2: string
  p2: number
  c3: string
  p3: number
  c4: string
  p4: number
}

const DEFAULTS: Settings = {
  loopMs: 34500,
  fps: 11,
  density: 130,
  cellAspect: 1.8,
  sunX: 0,
  sunRadius: 0.44,
  bandSpacing: 2.4,
  bandMinLit: 0,
  bandMaxLit: 1,
  bandFalloff: 0.92,
  rayCount: 20,
  rayRotateSpeed: 6,
  sparkleCount: 7,
  sparkleSpeed: 5,
  discBrightness: 0,
  discShimmer: 0.08,
  gapGlow: 1,
  coronaBase: 0.2,
  coronaSpread: 0.1,
  flickerSpeed: 4,
  flickerAmount: 0.35,
  skyTwinkle: 0.05,
  glow: 16.5,
  glowColor: "#ec5b5b",
  c0: "#000000",
  p0: 50,
  c1: "#0a0303",
  p1: 68,
  c2: "#2a0606",
  p2: 79,
  c3: "#5c0d0d",
  p3: 88,
  c4: "#991717",
  p4: 100,
}

// Numeric sliders shown in the panel.
const NUM_CONTROLS: { k: keyof Settings; label: string; min: number; max: number; step: number }[] =
  [
    { k: "loopMs", label: "loop (ms)", min: 2000, max: 60000, step: 500 },
    { k: "fps", label: "fps", min: 5, max: 60, step: 1 },
    { k: "density", label: "density (cols)", min: 60, max: 320, step: 5 },
    { k: "cellAspect", label: "cell aspect", min: 1, max: 3, step: 0.05 },
    { k: "sunX", label: "sun x", min: 0, max: 1, step: 0.01 },
    { k: "sunRadius", label: "sun radius", min: 0.2, max: 1.2, step: 0.01 },
    { k: "bandSpacing", label: "band spacing", min: 1, max: 10, step: 0.1 },
    { k: "bandMinLit", label: "band min lit", min: 0, max: 1, step: 0.01 },
    { k: "bandMaxLit", label: "band max lit", min: 0, max: 1, step: 0.01 },
    { k: "bandFalloff", label: "band falloff", min: 0.2, max: 1.5, step: 0.01 },
    { k: "rayCount", label: "ray count", min: 0, max: 60, step: 1 },
    { k: "rayRotateSpeed", label: "ray rotate", min: 0, max: 8, step: 1 },
    { k: "sparkleCount", label: "sparkle count", min: 0, max: 30, step: 1 },
    { k: "sparkleSpeed", label: "sparkle speed", min: 0, max: 8, step: 1 },
    { k: "discBrightness", label: "disc bright", min: 0, max: 1, step: 0.01 },
    { k: "discShimmer", label: "disc shimmer", min: 0, max: 0.5, step: 0.01 },
    { k: "gapGlow", label: "gap glow", min: 0, max: 1, step: 0.01 },
    { k: "coronaBase", label: "corona base", min: 0, max: 1, step: 0.01 },
    { k: "coronaSpread", label: "corona spread", min: 0.1, max: 2, step: 0.05 },
    { k: "flickerSpeed", label: "flicker speed", min: 0, max: 10, step: 1 },
    { k: "flickerAmount", label: "flicker amt", min: 0, max: 1, step: 0.01 },
    { k: "skyTwinkle", label: "sky twinkle", min: 0, max: 0.3, step: 0.01 },
    { k: "glow", label: "glow blur (px)", min: 0, max: 20, step: 0.5 },
  ]

// Gradient color stops shown in the panel.
const STOPS: { c: keyof Settings; p: keyof Settings }[] = [
  { c: "c0", p: "p0" },
  { c: "c1", p: "p1" },
  { c: "c2", p: "p2" },
  { c: "c3", p: "p3" },
  { c: "c4", p: "p4" },
]

export default function AsciiSun({ hideControls = false }: { hideControls?: boolean } = {}) {
  const preRef = useRef<HTMLPreElement>(null)
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [show, setShow] = useState(!hideControls)

  // Keep a ref in sync so the animation loop always reads the latest settings
  // without being torn down and recreated on every slider move.
  const settingsRef = useRef(settings)
  settingsRef.current = settings

  const colsRef = useRef(0)
  const rowsRef = useRef(0)
  const resizeRef = useRef<() => void>(() => {})

  // Toggle the panel with "S" (ignored while typing in an input).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return
      if (e.key === "s" || e.key === "S") setShow(v => !v)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // The animation loop. Set up once; reads everything from settingsRef.
  useEffect(() => {
    const pre = preRef.current
    if (!pre) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const TWO_PI = Math.PI * 2
    let raf = 0
    let start = 0
    let lastFrame = -1

    const resize = () => {
      const s = settingsRef.current
      const fontPx = Math.max(5, Math.min(18, window.innerWidth / s.density))
      const charW = fontPx * 0.6
      const charH = fontPx * s.cellAspect * 0.6
      colsRef.current = Math.max(40, Math.floor(window.innerWidth / charW))
      rowsRef.current = Math.max(24, Math.floor(window.innerHeight / charH))
      pre.style.fontSize = `${fontPx}px`
      pre.style.lineHeight = `${charH}px`
    }
    resizeRef.current = resize

    const render = (phase: number) => {
      const s = settingsRef.current
      const cols = colsRef.current
      const rows = rowsRef.current
      const cw = 1
      const ch = s.cellAspect
      const W = cols * cw
      const H = rows * ch

      const sx = W * s.sunX
      const sy = H // horizon = bottom of the page
      const R = H * s.sunRadius
      const stripePeriod = ch * s.bandSpacing

      const ramp = RAMP
      const rampMax = ramp.length - 1
      let out = ""

      for (let y = 0; y < rows; y++) {
        const py = y * ch
        for (let x = 0; x < cols; x++) {
          const px = x * cw
          const dx = px - sx
          const dy = py - sy
          const dist = Math.hypot(dx, dy)
          let b: number

          const angle = Math.atan2(dy, dx)
          const rays = 0.5 + 0.5 * Math.sin(angle * s.rayCount + phase * TWO_PI * s.rayRotateSpeed)
          const sparkle =
            0.5 + 0.5 * Math.sin(angle * s.sparkleCount - phase * TWO_PI * s.sparkleSpeed)

          if (dist < R) {
            // Inside the disc: solid dome up top dissolving into horizontal
            // bands toward the horizon.
            const yFromHorizon = sy - py
            const t = Math.min(1, yFromHorizon / (R * s.bandFalloff))
            const inStripe = (((py % stripePeriod) + stripePeriod) % stripePeriod) / stripePeriod
            const onFraction = s.bandMinLit + (s.bandMaxLit - s.bandMinLit) * t
            if (inStripe < onFraction) {
              const tw =
                Math.sin(px * 0.5 + phase * TWO_PI * 3) * Math.sin(py * 0.6 - phase * TWO_PI * 2)
              b = s.discBrightness + s.discShimmer * tw
            } else {
              b = 0.05 + s.gapGlow * rays * sparkle
            }
          } else {
            // Corona above the dome: spokes fading up into the sky.
            const fall = Math.exp(-(dist - R) / (R * s.coronaSpread))
            b = fall * (s.coronaBase + rays * sparkle)
            b *=
              1 - s.flickerAmount + s.flickerAmount * Math.sin(phase * TWO_PI * s.flickerSpeed + dist * 0.06)
          }

          // Faint atmospheric twinkle across the open sky.
          b +=
            s.skyTwinkle *
            (0.5 + 0.5 * Math.sin(px * 0.5 + phase * TWO_PI * 2) * Math.sin(py * 0.6 - phase * TWO_PI * 3))

          if (b < 0) b = 0
          else if (b > 1) b = 1
          out += ramp[Math.round(b * rampMax)]
        }
        if (y < rows - 1) out += "\n"
      }

      pre.textContent = out
    }

    const loop = (now: number) => {
      if (!start) start = now
      const s = settingsRef.current
      const phase = reduced ? 0 : ((now - start) % s.loopMs) / s.loopMs
      const frame = Math.floor((now - start) / (1000 / s.fps))
      if (frame !== lastFrame) {
        lastFrame = frame
        render(phase)
      }
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener("resize", resize)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  // Re-fit the grid when sizing-related settings change.
  useEffect(() => {
    resizeRef.current()
  }, [settings.density, settings.cellAspect])

  const setNum = (k: keyof Settings, v: number) =>
    setSettings(s => ({ ...s, [k]: v }) as Settings)
  const setStr = (k: keyof Settings, v: string) =>
    setSettings(s => ({ ...s, [k]: v }) as Settings)

  const gradient = `linear-gradient(to bottom, ${settings.c0} ${settings.p0}%, ${settings.c1} ${settings.p1}%, ${settings.c2} ${settings.p2}%, ${settings.c3} ${settings.p3}%, ${settings.c4} ${settings.p4}%)`

  const logSettings = () => {
    // eslint-disable-next-line no-console
    console.log("=== AsciiSun settings ===\n" + JSON.stringify(settings, null, 2))
    navigator.clipboard?.writeText(JSON.stringify(settings, null, 2)).catch(() => {})
  }

  return (
    <>
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{
          margin: 0,
          whiteSpace: "pre",
          overflow: "hidden",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          background: gradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          userSelect: "none",
          filter: settings.glow > 0 ? `drop-shadow(0 0 ${settings.glow}px ${settings.glowColor})` : "none",
        }}
      />

      <button
        type="button"
        aria-label={show ? "Hide sun controls" : "Show sun controls"}
        aria-expanded={show}
        onClick={() => setShow(v => !v)}
        style={sunIconStyle}
      >
        <span aria-hidden="true">☀</span>
      </button>

      <div style={{ ...panelStyle, transform: show ? "translateY(0)" : "translateY(-100%)" }}>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
            <strong style={{ letterSpacing: 1 }}>ASCII SUN</strong>
            <span style={{ opacity: 0.6 }}>click ☀ or press S to hide</span>
            <span style={{ flex: 1 }} />
            <button type="button" style={btnStyle} onClick={logSettings}>
              log + copy settings
            </button>
            <button type="button" style={btnStyle} onClick={() => setSettings(DEFAULTS)}>
              reset
            </button>
          </div>

          {NUM_CONTROLS.map(c => (
            <label key={c.k} style={rowStyle}>
              <span style={labelStyle}>{c.label}</span>
              <input
                type="range"
                min={c.min}
                max={c.max}
                step={c.step}
                value={settings[c.k] as number}
                onChange={e => setNum(c.k, parseFloat(e.target.value))}
                style={{ flex: 1, minWidth: 60 }}
              />
              <input
                type="number"
                min={c.min}
                max={c.max}
                step={c.step}
                value={settings[c.k] as number}
                onChange={e => setNum(c.k, parseFloat(e.target.value))}
                style={numStyle}
              />
            </label>
          ))}

          <div style={{ gridColumn: "1 / -1", opacity: 0.6, marginTop: 4 }}>gradient stops (top → bottom)</div>
          {STOPS.map(stop => (
            <label key={stop.c} style={rowStyle}>
              <input
                type="color"
                value={settings[stop.c] as string}
                onChange={e => setStr(stop.c, e.target.value)}
                style={{ width: 28, height: 20, padding: 0, border: "none", background: "none" }}
              />
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={settings[stop.p] as number}
                onChange={e => setNum(stop.p, parseFloat(e.target.value))}
                style={{ flex: 1, minWidth: 60 }}
              />
              <span style={numStyle}>{settings[stop.p] as number}%</span>
            </label>
          ))}

          <label style={rowStyle}>
            <span style={labelStyle}>glow color</span>
            <input
              type="color"
              value={settings.glowColor}
              onChange={e => setStr("glowColor", e.target.value)}
              style={{ width: 28, height: 20, padding: 0, border: "none", background: "none" }}
            />
          </label>
      </div>
    </>
  )
}

const panelStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  maxHeight: "48vh",
  overflowY: "auto",
  padding: "8px 10px",
  background: "rgba(0,0,0,0.85)",
  color: "#ddd",
  borderBottom: "1px solid #333",
  font: "11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
  columnGap: 14,
  rowGap: 3,
  pointerEvents: "auto",
  transition: "transform 0.35s ease",
  willChange: "transform",
}

const sunIconStyle: React.CSSProperties = {
  position: "fixed",
  top: 10,
  left: 10,
  zIndex: 51,
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  lineHeight: 1,
  color: "#ffcf5c",
  background: "rgba(0,0,0,0.55)",
  border: "1px solid #444",
  borderRadius: "50%",
  cursor: "pointer",
  pointerEvents: "auto",
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
}

const labelStyle: React.CSSProperties = {
  width: 92,
  flexShrink: 0,
  opacity: 0.85,
}

const numStyle: React.CSSProperties = {
  width: 56,
  flexShrink: 0,
  textAlign: "right",
  background: "#111",
  color: "#ddd",
  border: "1px solid #333",
  font: "inherit",
}

const btnStyle: React.CSSProperties = {
  font: "inherit",
  color: "#ddd",
  background: "#1a1a1a",
  border: "1px solid #444",
  padding: "2px 8px",
  cursor: "pointer",
}
