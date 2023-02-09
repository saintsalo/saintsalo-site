import {
  WiMoonAltFirstQuarter,
  WiMoonAltFull,
  WiMoonAltNew,
  WiMoonAltThirdQuarter,
  WiMoonAltWaningCrescent3,
  WiMoonAltWaningGibbous3,
  WiMoonAltWaxingCrescent3,
  WiMoonAltWaxingGibbous3,
} from "react-icons/wi"

const lunarMonth = 29.530588853

const getJulianDate = (date = new Date()) => {
  const time = date.getTime()
  const tzoffset = date.getTimezoneOffset()

  return time / 86400000 - tzoffset / 1440 + 2440587.5
}

export const getLunarAge = (date = new Date()) => {
  const percent = getLunarAgePercent(date)
  const age = percent * lunarMonth
  return { age, percent }
}

export const getLunarAgePercent = (date = new Date()) => {
  return normalize((getJulianDate(date) - 2451550.1) / lunarMonth)
}

const normalize = (value: number) => {
  value = value - Math.floor(value)
  if (value < 0) value = value + 1
  return value
}

export const getLunarPhase = (date = new Date()) => {
  const { age } = getLunarAge(date)
  if (age < 1.84566) return "New"
  else if (age < 5.53699) return "Waxing Crescent"
  else if (age < 9.22831) return "First Quarter"
  else if (age < 12.91963) return "Waxing Gibbous"
  else if (age < 16.61096) return "Full"
  else if (age < 20.30228) return "Waning Gibbous"
  else if (age < 23.99361) return "Last Quarter"
  else if (age < 27.68493) return "Waning Crescent"
  return "New"
}

export const getLunarIcon = (date = new Date()) => {
  const moonPhase = getLunarPhase(date)
  if (moonPhase === "Full") return <WiMoonAltFull />
  if (moonPhase === "New") return <WiMoonAltNew />
  if (moonPhase === "First Quarter") return <WiMoonAltFirstQuarter />
  if (moonPhase === "Last Quarter") return <WiMoonAltThirdQuarter />
  if (moonPhase === "Waxing Crescent") return <WiMoonAltWaxingCrescent3 />
  if (moonPhase === "Waxing Gibbous") return <WiMoonAltWaxingGibbous3 />
  if (moonPhase === "Waning Crescent") return <WiMoonAltWaningCrescent3 />
  if (moonPhase === "Waning Gibbous") return <WiMoonAltWaningGibbous3 />
  return <WiMoonAltNew />
}
