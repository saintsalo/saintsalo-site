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
      {/* HSOH Gold Diggers July 31, 2025 */}
      <div className="bg-white rounded-md w-full p-8">
        <h1 className="text-4xl">
          Damaged Disco w/ <br />
          <a href="https://www.instagram.com/holy_sun_opera_house/" target="_blank">
            Holy Sun Opera House
          </a>
          <br />
          <a href="https://www.crueldiagonals.com/" target="_blank">
            Cruel Diagonals
          </a>
        </h1>
        <h2 className="font-correct">
          <h3 className="text-3xl">Thursday, July 31 7pm, Gold-Diggers Los Angeles</h3>
          <div className="text-2xl">
            <a
              href="https://dice.fm/event/v37k3d-damaged-disco-w-holy-sun-opera-house-cruel-diagonals-31st-jul-gold-diggers-los-angeles-tickets?pid=74589ab9&_branch_match_id=1442976232047470910&utm_medium=partners_api&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9ZLyUxO1UvL1c%2ByMDZLTjJMNjY1NbIvyEyxNTcxtbBMTLJUqytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAT%2BjkTkgAAAA%3D"
              target="_blank"
            >
              Tickets (Cheaper to buy early!)
            </a>{" "}
          </div>
        </h2>
        <div className="pt-4">
          <Image
            src={setImage("dd-salo-hsoh.jpg")}
            alt={"Holy Sun Opera House with Cruel Diagonals at Gold Diggers July 31, 2025"}
            width={500}
            height={500}
            className="hover:contrast-150 transition-all"
          />
        </div>
      </div>
      {/* Drone bath show */}
      <div className="bg-white rounded-md w-full p-8 opacity-20">
        <h1 className="text-4xl">
          DRONEBATH 007 <br />
          dl Salo with George Jensen.
        </h1>
        <h2 className="font-correct">
          <h3 className="text-3xl">Sunday, June 15, 2025 Los Angeles</h3>
          <div className="text-2xl">
            <a href="https://partiful.com/e/NN6cVuPsT8hW90aSTkhP" target="_blank">
              Partiful invite (RSVP and Address)
            </a>{" "}
          </div>
        </h2>
        <div className="pt-4">
          <Image
            src={setImage("dronebath 007 flyer.jpeg")}
            alt={"dl Salo at DRONEBATH 007 in Los Angeles June 15, 2025"}
            width={600}
            height={600}
            className="hover:contrast-150 transition-all"
          />
        </div>
        <div className="max-w-[500px] flex flex-col gap-8 pt-8">
          <p>
            <strong>Tickets will be available at the door via Venmo or cash.</strong> This RSVP will
            give you the address and parking instructions.
          </p>

          <p>
            <strong>$40</strong> - sliding scale always available
          </p>

          <p>
            <strong>DRONEBATH</strong> is an electronic sound bath series featuring{" "}
            <strong>3 hours of uninterrupted low frequency</strong> to facilitate a restful journey.
          </p>

          <p>
            Our lineup of artists{" "}
            <strong>
              Laura Escudé, Gavin Gamboa, dl Salo with George Jensen, Ivana Dama, Rachel Beetz
            </strong>
            , and <strong>Mitchell Brown</strong> will bring you to a new portal through the
            state-of-the-art{" "}
            <a
              href="https://www.instagram.com/mobius_acoustics/?hl=en"
              target="_blank"
              rel="noopener"
            >
              Mobius Acoustics Hi-Fi system
            </a>
            . We encourage you to come prepared with anything you&apos;d need to get comfortable.
          </p>

          <p>
            <em>
              Tap into your uninterrupted source with an optional micro-dose provided from{" "}
              <a href="https://instagram.com/toasty.town" target="_blank" rel="noopener">
                @toasty.town
              </a>
            </em>
          </p>

          <p>
            <strong>Flyer by Christos Tejada</strong>
          </p>

          <p>
            <strong>Mobius Acoustics:</strong>
            <br />
            <a href="http://mobius-acoustics.com" target="_blank" rel="noopener">
              mobius-acoustics.com
            </a>
          </p>

          <p>
            <strong>IG:</strong>
            <br />
            <a href="https://instagram.com/dronebath" target="_blank" rel="noopener">
              instagram.com/dronebath
            </a>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-md w-full p-8 opacity-20">
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
