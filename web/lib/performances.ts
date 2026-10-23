// Local data for the /performances page and its drill-down detail pages.
//
// Performances aren't in the CMS, so they live here and are maintained by hand
// (same pattern as lib/releaseDates.ts). Add a new show by prepending an entry.
//
// `date` (ISO YYYY-MM-DD) drives sorting and the upcoming/past split: anything
// on or after today renders as an upcoming card; everything earlier is archived
// into the compact timeline. Each show is clickable through to /performances/<slug>.

import type { ProjectSlug } from "@/lib/projects"

export interface PerformanceLink {
  label: string
  href: string
}

export interface Performance {
  slug: string
  title: string
  /** project/collaborator the show belongs to (null/omitted = DL Salo) */
  project?: ProjectSlug | null
  date: string // ISO "YYYY-MM-DD"
  dateLabel: string // human-friendly, as shown on the page
  venue?: string
  location?: string
  image?: string // filename under /public/images (resolve with setImage)
  /** one-line blurb for the timeline + card subtitle */
  summary?: string
  links?: PerformanceLink[]
  /** rich description (HTML) shown on the detail page */
  details?: string
  /** pin to the top as an active/upcoming card even if the date has passed */
  featured?: boolean
}

export const performances: Performance[] = [
  {
    slug: "2220-arts-holy-sun-opera-house-carolyn-pennypacker-riggs",
    title: "Holy Sun Opera House + Carolyn Pennypacker Riggs w/ Saint Salo Plastilina",
    project: "holy-sun-opera-house",
    date: "2026-10-24",
    dateLabel: "Saturday, October 24, 8pm",
    venue: "2220 Arts + Archives",
    location: "2220 Beverly Blvd, Los Angeles, CA 90057",
    image: "2220Arts-10-24-2026/holy-sun-opera-house-carolyn-pennypacker-riggs-2220-arts-poster.jpeg",
    summary:
      "KCRW and 2220 Arts present Holy Sun Opera House and Carolyn Pennypacker Riggs, with Saint Salo Plastilina.",
    links: [
      {
        label: "Tickets on dice.fm",
        href: "https://dice.fm/event/dk7pae-holy-sun-opera-house-x-carolyn-pennypacker-riggs-24th-oct-2220-arts-archives-los-angeles-tickets",
      },
      { label: "Saint Salo Plastilina", href: "/projects/saint-salo-plastilina" },
      { label: "@holy_sun_opera_house", href: "https://www.instagram.com/holy_sun_opera_house/" },
      { label: "@carolynpennypackerriggs", href: "https://www.instagram.com/carolynpennypackerriggs/" },
      { label: "@2220arts", href: "https://www.instagram.com/2220arts/" },
    ],
    details: `<p>KCRW and 2220 Arts present a night with Holy Sun Opera House and Carolyn Pennypacker Riggs, with Saint Salo Plastilina.</p>
<p><a href="/projects/saint-salo-plastilina">Saint Salo Plastilina</a> is a new collaboration between dl Salo and <a href="https://www.instagram.com/la.bruja.plastilina/" target="_blank" rel="noopener">La Bruja Plastilina</a>: an all new series of music and piano love songs. 2220 Arts has a wonderful grand piano, so it will be a really nice night to take a theater seat. This is also Holy Sun Opera House's last show of the year.</p>
<p><strong>Holy Sun Opera House</strong> creates emotionally engaging and haunting symphonic music embellished by electronics, heavy drums and synthesizers. Led by soprano and drummer Krissy Barker with composer dl Salo, the group features a revolving cast of collaborators, singers and performers. They have been described as “Opera Cult” and as one who would play at the Roadhouse in Twin Peaks. Their debut album, <em>The Holy Sun Opera House</em>, is an ethereal journey that blends electro, darkwave and contemporary classical. It has been featured on KCRW and in The Wire Magazine.</p>
<p><strong>Carolyn Pennypacker Riggs</strong> is a composer working in site-responsive performance, installation, recorded sound, and object-making. Her work has been presented by the LA Phil; Getty Center; ICA, LA; the Broad; MoCA; Hammer Museum; High Desert Test Sites (Joshua Tree); and featured in Artforum.com, Frieze.com, X-TRA, New York Times Magazine and, recently, The New York Times. She leads two choral groups and a band called Bouquet, described as “Heady” by Under the Radar Magazine, “Best New Music” by KCRW, and “prismatic…perfection” by KEXP. In 2025, she published new writing in WITCH Anthology edited by Michelle Tea on Dopamine Books, an imprint of Semiotext(e).</p>
<p>8pm · 2220 Arts + Archives, 2220 Beverly Blvd, Los Angeles, CA 90057</p>
<figure class="flex flex-col gap-2">
<img class="rounded-xs" src="/images/2220Arts-10-24-2026/saint-salo-plastilina-elizabeth-weinberg-1.jpg" alt="Saint Salo Plastilina: La Bruja Plastilina and dl Salo" />
<figcaption><em>Saint Salo Plastilina. Photo by <a href="https://www.instagram.com/elizabethrweinberg/" target="_blank" rel="noopener">Elizabeth Weinberg</a></em></figcaption>
</figure>`,
  },
  {
    slug: "hsoh-album-release-el-cid",
    title: "Holy Sun Opera House album release show w/ Lia Braswell and Pony Sweat",
    project: "holy-sun-opera-house",
    date: "2026-05-29",
    dateLabel: "May 29th",
    venue: "El Cid",
    location: "Los Angeles",
    image: "Voice_Of_Gob.png",
    summary: "Album release show for Holy Sun Opera House's debut album, The Holy Sun Opera House.",
    links: [
      {
        label: "Tickets on dice.fm",
        href: "https://dice.fm/event/q2wqdo-holy-sun-opera-house-lia-braswell-pony-sweat-29th-may-el-cid-los-angeles-tickets",
      },
      { label: "Lia Braswell", href: "https://liabraswell.bandcamp.com/album/rising" },
      { label: "Pony Sweat", href: "https://www.ponysweataerobics.com/" },
      { label: "@holy_sun_opera_house", href: "https://www.instagram.com/holy_sun_opera_house/" },
    ],
    details: `<p>Album release show for Holy Sun Opera House's debut album, <em>The Holy Sun Opera House</em>, with <a href="https://liabraswell.bandcamp.com/album/rising" target="_blank" rel="noopener">Lia Braswell</a> and <a href="https://www.ponysweataerobics.com/" target="_blank" rel="noopener">Pony Sweat</a>.</p>
<p>Follow <a href="https://www.instagram.com/holy_sun_opera_house/" target="_blank" rel="noopener">@holy_sun_opera_house</a> for updates.</p>`,
  },
  {
    slug: "damaged-disco-gold-diggers",
    title: "Damaged Disco w/ Holy Sun Opera House and Cruel Diagonals",
    project: "holy-sun-opera-house",
    date: "2025-07-31",
    dateLabel: "Thursday, July 31, 7pm",
    venue: "Gold-Diggers",
    location: "Los Angeles",
    image: "dd-salo-hsoh.jpg",
    summary: "Holy Sun Opera House with Cruel Diagonals at Gold-Diggers.",
    links: [
      {
        label: "Tickets (cheaper to buy early!)",
        href: "https://dice.fm/event/v37k3d-damaged-disco-w-holy-sun-opera-house-cruel-diagonals-31st-jul-gold-diggers-los-angeles-tickets",
      },
      { label: "Holy Sun Opera House", href: "https://www.instagram.com/holy_sun_opera_house/" },
      { label: "Cruel Diagonals", href: "https://www.crueldiagonals.com/" },
    ],
  },
  {
    slug: "dronebath-007",
    title: "DRONEBATH 007 — dl Salo with George Jensen",
    project: null, // DL Salo
    date: "2025-06-15",
    dateLabel: "Sunday, June 15, 2025",
    location: "Los Angeles",
    image: "dronebath 007 flyer.jpeg",
    summary: "An electronic sound bath series: 3 hours of uninterrupted low frequency.",
    links: [
      {
        label: "Partiful invite (RSVP and address)",
        href: "https://partiful.com/e/NN6cVuPsT8hW90aSTkhP",
      },
      { label: "instagram.com/dronebath", href: "https://instagram.com/dronebath" },
      { label: "mobius-acoustics.com", href: "http://mobius-acoustics.com" },
    ],
    details: `<p><strong>Tickets will be available at the door via Venmo or cash.</strong> This RSVP will give you the address and parking instructions.</p>
<p><strong>$40</strong> - sliding scale always available</p>
<p><strong>DRONEBATH</strong> is an electronic sound bath series featuring <strong>3 hours of uninterrupted low frequency</strong> to facilitate a restful journey.</p>
<p>Our lineup of artists <strong>Laura Escudé, Gavin Gamboa, dl Salo with George Jensen, Ivana Dama, Rachel Beetz</strong>, and <strong>Mitchell Brown</strong> will bring you to a new portal through the state-of-the-art <a href="https://www.instagram.com/mobius_acoustics/?hl=en" target="_blank" rel="noopener">Mobius Acoustics Hi-Fi system</a>. We encourage you to come prepared with anything you'd need to get comfortable.</p>
<p><em>Tap into your uninterrupted source with an optional micro-dose provided from <a href="https://instagram.com/toasty.town" target="_blank" rel="noopener">@toasty.town</a></em></p>
<p><strong>Flyer by Christos Tejada</strong></p>`,
  },
  {
    slug: "damaged-disco-halloween",
    title: "Damaged Disco Halloween Party ft I Speak Machine and Holy Sun Opera House",
    project: "holy-sun-opera-house",
    date: "2024-10-29",
    dateLabel: "Tue, Oct 29, 2024 — 7pm",
    venue: "Gold-Diggers",
    location: "5630 Santa Monica Blvd, Los Angeles, CA 90038",
    image: "Damaged-Disco-026-v2.jpg",
    summary: "Damaged Disco celebrates Halloween with I Speak Machine and Holy Sun Opera House.",
    links: [
      {
        label: "RSVP (free on dice.fm)",
        href: "https://dice.fm/event/oeyxom-damaged-disco-halloween-party-ft-i-speak-machine-and-holy-sun-opera-house-29th-oct-gold-diggers-los-angeles-tickets",
      },
      { label: "I Speak Machine", href: "https://www.ispeakmachine.com/" },
    ],
    details: `<p class="italic">From Damaged Disco:</p>
<p>Join us as Damaged Disco celebrates Halloween on October 29 at Gold-Diggers with I Speak Machine and Holy Sun Opera House!</p>
<p>We are excited to welcome back I Speak Machine for a special Damaged Disco Halloween event. Musician/performer Tara Busch and filmmaker Maf Lewis have earned a devoted fan base touring with legends Gary Numan and L7, along with industrial music heavyweights Curse Mackey &amp; SINE. Their explosive multimedia live show reflects the intense anger &amp; beauty of the music while keeping its darkly tongue-in-cheek undercurrents intact.</p>
<p>Holy Sun Opera House is classically trained soprano and drummer Krissy Barker (Object as Subject) and composer dl Salo (A Story of Rats, Saint Genet). Together they weave symphonic synths and operatic vocals with heavy drums into music that evokes joy, terror, anger, love, and grief in a dreamlike fashion.</p>
<p>With resident DJ DAT68 spinning minimal wave, dark disco, industrial, and post-punk.</p>
<p>Damaged Disco night is a monthly event with live performances of minimal synth and post-punk artists curated by the Damaged Disco label, happening on the last Tuesday of each month at Gold-Diggers. Follow for updates! @damaged_disco</p>
<p>7pm · No Cover · 21+<br />Gold-Diggers, 5632 Santa Monica Blvd.<br />Free parking at 5731 Santa Monica Blvd, Los Angeles, CA, 90038</p>`,
  },
  {
    slug: "hsoh-healing-force",
    title: "Holy Sun Opera House",
    project: "holy-sun-opera-house",
    date: "2024-03-10",
    dateLabel: "March 10, 2024",
    venue: "Healing Force of the Universe",
    location: "1200 E Walnut Street, Pasadena, CA 91106",
    links: [{ label: "Healing Force of the Universe", href: "https://healingforcerecords.com/" }],
  },
  {
    slug: "extreme-evolution-listening-party",
    title: "Extreme Evolution: Drive to Divinity Listening Party",
    project: null, // DL Salo
    date: "2024-02-10",
    dateLabel: "Feb 10, 2024 — 6-9pm",
    venue: "Revenge of",
    location: "Los Angeles (Glassell Park)",
    image: "ExtremeEvolution_Flyer.jpeg",
    summary:
      "A listening party of the entire Extreme Evolution soundtrack — play the game and join casual pinball tournaments.",
    links: [
      { label: "Revenge of", href: "https://www.revengeof.com/" },
      {
        label: "IG: @revengeof_comicsandpinball",
        href: "https://www.instagram.com/revengeof_comicsandpinball/",
      },
    ],
    details: `<p>Join Salo &amp; Revenge of for a listening party of the entire Extreme Evolution Soundtrack! Play the game and join in on casual pinball tournaments.</p>`,
  },
  {
    slug: "hsoh-viper-room",
    title: "Holy Sun Opera House",
    project: "holy-sun-opera-house",
    date: "2024-01-12",
    dateLabel: "Jan 12, 2024 — 8pm doors",
    venue: "Viper Room",
    location: "Los Angeles",
    summary: "Black Sabbitch tour kickoff show!",
    links: [{ label: "Viper Room", href: "https://www.viperroom.com/" }],
  },
]

export const getPerformanceBySlug = (slug: string) => performances.find(p => p.slug === slug)
