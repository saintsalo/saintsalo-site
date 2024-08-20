import { setImage } from "@/lib/setImage"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Upcoming performances",
  description: "Scheduled live performances by composer dl Salo",
}

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-md w-full p-8 opacity-20">
        <h1>Holy Sun Opera House</h1>
        <h2 className="font-correct">
          <h3 className="text-3xl">March 10, 2024</h3>
          <div>
            <a href="https://healingforcerecords.com/" target="_blank">
              Healing Force of the Universe
            </a>{" "}
          </div>
          1200 E Walnut Street Pasadena, CA 91106
        </h2>
        <div>8pm Doors</div>
        <div>MORE DETAILS COMING SOON!</div>
      </div>
      <div className="bg-white rounded-md w-full p-8 opacity-20">
        <h1>Extreme Evolution: Drive to Divinity Listening Party</h1>
        <h2 className="font-correct">
          Feb, 10 2024 @{" "}
          <a href="https://www.revengeof.com/" target="_blank">
            Revenge of
          </a>{" "}
          in Los Angeles (Glassel Park)
        </h2>
        <div>6-9pm</div>
        <div>
          Join Salo &amp; Revenge of for a listening party of the entire Extreme Evolution
          Soundtrack! Play the game and join in on casual pinball tournaments.
        </div>
        <div>
          <a href="https://www.instagram.com/revengeof_comicsandpinball/" target="_blank">
            IG: @revengeof_comicsandpinball
          </a>
        </div>
        <Image
          src={setImage("ExtremeEvolution_Flyer.jpeg")}
          alt={
            "dl Salo's soundtrack extreme evolution listening party at Revenge of in Los Angeles"
          }
          width={400}
          height={400}
          className="hover:contrast-150 transition-all"
        />
      </div>
      <div>-------------------------------------------</div>
      <div className="bg-white rounded-md w-full p-8 opacity-20">
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
