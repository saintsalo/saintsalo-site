import Image from "next/image"
import Link from "next/link"

import { JsonLd } from "@/components/JsonLd"
import { setImage } from "@/lib/setImage"
import { absoluteUrl, pageMetadata, personRef } from "@/lib/seo"

import type { Metadata } from "next"

export const metadata: Metadata = {
  ...pageMetadata({
    title: "About",
    description:
      "About dl Salo, a Los Angeles composer: Holy Sun Opera House, Cowboy Cinema, Saint Genet, film and video game scores, and the label Hologram Opera.",
    path: "/about",
  }),
  // Not linked from the nav yet — keep it out of the index (and the sitemap)
  // until it is, then remove this override.
  robots: { index: false, follow: true },
}

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: absoluteUrl("/about"),
  mainEntity: personRef,
}

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <JsonLd data={aboutSchema} />

      <div className="bg-white rounded-md w-full p-8">
        <h1>About</h1>
        <div className="flex md:flex-row flex-col gap-8 pt-2">
          <Image
            src={setImage("dl-salo-live-music.png")}
            alt="dl Salo playing keyboards"
            width={400}
            height={387}
            className="rounded-xs md:min-w-max"
          />
          <div className="flex flex-col gap-4">
            <p>
              <span className="bio-highlight">
                I&apos;m dl Salo, a composer in Los Angeles. My music brings together classical
                piano, synthesizers, electronics and ambience: haunting, but hopeful.
              </span>
            </p>
            <p>
              Most of what I make happens with other people: bands, opera, dance, installations,
              film and video games.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md w-full p-8 flex flex-col gap-4">
        <h2 className="text-2xl">Bands and collaborations</h2>
        <p>
          <Link href="/projects/holy-sun-opera-house">Holy Sun Opera House</Link> is my duo with
          soprano and drummer Krissy Barker. We weave symphonic synths and operatic vocals with
          heavy drums. Our self-titled debut album came out on May 15, 2026 on Hologram Opera and
          has been featured on KCRW and in The Wire.
        </p>
        <p>
          <Link href="/projects/cowboy-cinema">Cowboy Cinema</Link> is my collaboration with Michael
          Haertlein. We met when I scored his documentary <em>Mad Tiger</em>. Our debut album,{" "}
          <Link href="/music/lighting-fires-along-the-way">Lighting Fires Along the Way</Link>, came
          out on November 7, 2025.
        </p>
        <p>
          <Link href="/projects/saint-salo-plastilina">Saint Salo Plastilina</Link> is my newest
          project, with La Bruja Plastilina: an all new series of music and piano love songs.
        </p>
        <p>
          Before these, I composed and performed live for{" "}
          <Link href="/projects/saint-genet">Saint Genet</Link>&apos;s image-based opera and
          performance work, including <Link href="/music/frail-affinities">Frail Affinities</Link>{" "}
          and <Link href="/music/transports-of-delirium">Transports of Delirium</Link>, presented at
          the Frye Art Museum, On the Boards, the Donau Festival and the Luminato Festival. I made{" "}
          <Link href="/music/the-immeasurable-spiral">The Immeasurable Spiral</Link> with Garek Jon
          Druss as <Link href="/projects/a-story-of-rats">A Story of Rats</Link>, played piano in
          the Seattle ensemble <Link href="/projects/joy-wants-eternity">Joy Wants Eternity</Link>,
          and started the performance group{" "}
          <Link href="/projects/earth-and-ceremony">Earth and Ceremony</Link> with Rachel Green in
          2016, whose opera <Link href="/music/i-want-to-hear-the-sea">I Want to Hear the Sea</Link>{" "}
          premiered at the NW New Works Festival.
        </p>
      </div>

      <div className="bg-white rounded-md w-full p-8 flex flex-col gap-4">
        <h2 className="text-2xl">Film and games</h2>
        <p>
          I wrote the original score for <Link href="/music/mad-tiger">Mad Tiger</Link>, a feature
          documentary directed by Jonathan Yi and Michael Haertlein, performed with Joy Wants
          Eternity.
        </p>
        <p>
          I&apos;ve scored three video games by Sam Atlas:{" "}
          <Link href="/music/space-hole-2018">Space Hole 2018</Link>,{" "}
          <Link href="/music/space-hole-2020">Space Hole 2020</Link> and{" "}
          <Link href="/music/extreme-evolution-soundtrack">
            Extreme Evolution: Drive to Divinity
          </Link>
          , a 53-track soundtrack of synth, piano, voice and foley that runs over two and a half
          hours.
        </p>
      </div>

      <div className="bg-white rounded-md w-full p-8 flex flex-col gap-4">
        <h2 className="text-2xl">Hologram Opera</h2>
        <p>
          I run the Los Angeles record label{" "}
          <a href="https://www.hologramopera.com" target="_blank">
            Hologram Opera
          </a>{" "}
          with Morgane Lhote and Krissy Barker. We release music we love.
        </p>
        <p>
          For booking, press or label enquiries, see <Link href="/contact">contact</Link>.
        </p>
      </div>
    </div>
  )
}
