import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upcoming performances",
  description: "Scheduled live performances by composer dl Salo",
}

export default function Page() {
  return (
    <div>
      <div>
        <h1>Holy Sun Opera House</h1>
        <h2 className="font-correct">
          Jan 12, 2024 @{" "}
          <a href="https://www.viperroom.com/" target="_blank">
            Viper Room
          </a>{" "}
          in Los Angeles
        </h2>
        <div>8pm Doors</div>
        <div>Black Sabbitch tour kickoff show!</div>
      </div>
    </div>
  )
}
