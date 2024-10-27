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
      <div className="bg-white rounded-md w-full p-8">
        <h1 className="text-4xl">
          Damaged Disco Halloween Party <br />
          ft{" "}
          <a href="https://www.ispeakmachine.com/" target="_blank">
            I Speak Machine
          </a>{" "}
          and Holy Sun Opera House
        </h1>
        <h2 className="font-correct">
          <h3 className="text-3xl">Tue, Oct 29, 2024 - 7pm</h3>
          <div className="text-2xl">
            <a href="https://gold-diggers.com/" target="_blank">
              Gold-Diggers
            </a>{" "}
          </div>
          5630 Santa Monica Blvd, Los Angeles, CA 90038
        </h2>
        <div>
          <Image
            src={setImage("Damaged-Disco-026-v2.jpg")}
            alt={"Damaged Disco Halloween Party ft I Speak Machine and Holy Sun Opera House"}
            width={600}
            height={600}
            className="hover:contrast-150 transition-all"
          />
        </div>
        <div className="max-w-[500px] flex flex-col gap-8 pt-8">
          <p>
            <a
              href="https://dice.fm/event/oeyxom-damaged-disco-halloween-party-ft-i-speak-machine-and-holy-sun-opera-house-29th-oct-gold-diggers-los-angeles-tickets"
              target="_blank"
            >
              RSVP (Free on dice.fm)
            </a>
          </p>

          <p className="italic">From Damaged Disco:</p>
          <p>
            Join us as Damaged Disco celebrates Halloween on October 29 at Gold-Diggers with I Speak
            Machine and Holy Sun Opera House!
          </p>
          <p>
            We are excited to welcome back I Speak Machine for a special Damaged Disco Halloween
            event. Musician/performer Tara Busch and filmmaker Maf Lewis have earned a devoted fan
            base touring with legends Gary Numan and L7, along with industrial music heavyweights
            Curse Mackey & SINE. Their explosive multimedia live show reflects the intense anger &
            beauty of the music while keeping its darkly tongue-in-cheek undercurrents intact.
          </p>
          <p>
            Holy Sun Opera House is classically trained soprano and drummer Krissy Barker (Object as
            Subject) and composer dl Salo (A Story of Rats, Saint Genet). Together they weave
            symphonic synths and operatic vocals with heavy drums into music that evokes joy,
            terror, anger, love, and grief in a dreamlike fashion.
          </p>
          <p>
            With resident DJ DAT68 spinning minimal wave, dark disco, industrial, and post-punk.
          </p>
          <p>
            Damaged Disco night is a monthly event with live performances of minimal synth and
            post-punk artists curated by the Damaged Disco label, happening on the last Tuesday of
            each month at Gold-Diggers. Follow for updates! @damaged_disco
          </p>
          <p>Tues. October 29</p>
          <p>7pm · No Cover · 21+</p>
          <p>Gold-Diggers</p>
          <p>5632 Santa Monica Blvd.</p>
          <p>Free parking at 5731 Santa Monica Blvd, Los Angeles, CA, 90038</p>
        </div>
      </div>
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
