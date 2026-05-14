import { getPostsData } from "@/lib/getPosts"
import { setImage } from "@/lib/setImage"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const { posts } = await getPostsData("news")
  const { posts: features } = await getPostsData("feature")
  return (
    <div className="w-auto flex flex-col">
      <div className="bg-white rounded-md w-full p-8">
        <p>
          dl Salo is a composer creating music that interweaves classical piano, synthesizers,
          electronics and ambience - he is known for his haunting yet hopeful style of musical
          compositions.
        </p>
      </div>

      <div className="bg-white rounded-md w-full p-8 mt-8">
        <div className="flex flex-col gap-2 mb-4">
          <div className="text-sm uppercase tracking-wide opacity-70">Album premiere</div>
          <h2 className="text-4xl">The Holy Sun Opera House</h2>
          <div className="text-2xl font-correct">
            <a href="https://www.instagram.com/holy_sun_opera_house/" target="_blank">
              Holy Sun Opera House
            </a>{" "}
            &mdash; out May 15, 2026 on{" "}
            <a href="https://hologramopera.com/" target="_blank">
              Hologram Opera
            </a>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-8 pt-2">
          <a
            href="https://holysunoperahouse.bandcamp.com/album/the-holy-sun-opera-house"
            target="_blank"
            className="md:min-w-max"
          >
            <Image
              src={setImage("THSOH_digitalcover.png")}
              alt="The Holy Sun Opera House - debut album cover"
              width={500}
              height={500}
              className="hover:contrast-150 transition-all rounded-xs"
            />
          </a>

          <div className="flex flex-col gap-4 flex-1">
            <p>
              The debut album from Holy Sun Opera House &mdash; the duo of soprano and percussionist{" "}
              <strong>Krissy Barker</strong> and composer <strong>dl Salo</strong>. Self-produced
              and built around Barker&apos;s recurring dreams of shifting rooms, dilapidated houses,
              and hidden passages, the record traces an obsessive, anxious mind through electro,
              darkwave, and contemporary classical territory &mdash; synths and electronics
              underpinned by heavy drums and operatic vocals, with ritualistic choir passages
              that lean on cult cinema and 1970s mystical aesthetics.
            </p>

            <p>
              Featuring a choir of Tany Ling, Anna Wickenden, Isaac Prado, Rachel Gertz, Rachael
              Ferguson, and Jessica Basta. Recorded at Dead Flowers in Los Angeles, mastered by
              Chuck Johnson, with artwork by Arina Kokoreva.
            </p>

            <div className="flex flex-col gap-1">
              <div className="font-correct text-xl">Tracklist</div>
              <div>
                <strong>Side A:</strong> Voice of Gob &middot; Passage II &middot; Latched On
                &middot; Decrepit Mansion &middot; Witch in the Attic
              </div>
              <div>
                <strong>Side B:</strong> The Attic &middot; Room That Wasn&apos;t There Before
                &middot; Passage I &middot; Room with the Rain
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-correct text-xl">Available on</div>
              <div>12&quot; LP &middot; Cassette &middot; CD DigiPak &middot; Digital (24-bit/96kHz)</div>
            </div>

            <div className="flex flex-col gap-2 text-2xl">
              <a
                href="https://hologramopera.com/products/the-holy-sun-opera-house"
                target="_blank"
              >
                Order from Hologram Opera &rarr;
              </a>
              <a
                href="https://holysunoperahouse.bandcamp.com/album/the-holy-sun-opera-house"
                target="_blank"
              >
                Listen / pre-order on Bandcamp &rarr;
              </a>
            </div>
            <p>
              Album release show:{" "}
              <a
                href="https://dice.fm/event/q2wqdo-holy-sun-opera-house-lia-braswell-pony-sweat-29th-may-el-cid-los-angeles-tickets"
                target="_blank"
              >
                May 29th at El Cid, Los Angeles
              </a>{" "}
              w/ Lia Braswell and Pony Sweat.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md w-full p-8 mt-8">
        <div className="flex flex-col gap-2 mb-4">
          <div className="text-sm uppercase tracking-wide opacity-70">Out now</div>
          <h2 className="text-4xl">Lighting Fires Along the Way</h2>
          <div className="text-2xl font-correct">
            <a href="https://cowboycinema.bandcamp.com/" target="_blank">
              Cowboy Cinema
            </a>{" "}
            &mdash; released November 7, 2025
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-8 pt-2">
          <a
            href="https://cowboycinema.bandcamp.com/album/lighting-fires-along-the-way"
            target="_blank"
            className="md:min-w-max"
          >
            <Image
              src={setImage("cowboy-cinema-lfatw.jpg")}
              alt="Cowboy Cinema - Lighting Fires Along the Way album cover"
              width={500}
              height={500}
              className="hover:contrast-150 transition-all rounded-xs"
            />
          </a>

          <div className="flex flex-col gap-4 flex-1">
            <p>
              Cowboy Cinema is <strong>Michael Haertlein</strong> (vocals, guitar) and{" "}
              <strong>dl Salo</strong> (piano, synth). Written and recorded across several years
              while both were moving through major upheaval in their lives, the record sits in the
              uncertain space between an ending and whatever comes next. Equal parts personal and
              experimental, every song works the line between love and melancholy.
            </p>

            <p>
              With additional vocals by Krissy Barker. Recorded at Dead Flowers in Los Angeles
              and mastered by Mell Dettmer at Studio Soli.
            </p>

            <div className="flex flex-col gap-1">
              <div className="font-correct text-xl">Tracklist</div>
              <div>
                Go Alone &middot; Fall Away &middot; Mountain Range &middot; Dos Panteras &middot;
                Green Sky &middot; Let Go &middot; Unravel Me &middot; Feathers
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-correct text-xl">Available on</div>
              <div>12&quot; Vinyl &middot; Digital (24-bit/48kHz, FLAC, MP3)</div>
            </div>

            <div className="flex flex-col gap-2 text-2xl">
              <a
                href="https://cowboycinema.bandcamp.com/album/lighting-fires-along-the-way"
                target="_blank"
              >
                Listen / order on Bandcamp &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 h-auto mt-0 mb-20 md:mt-20">
        {features &&
          features.map(feature => (
            <div
              key={feature.slug}
              className="group flex flex-col gap-4 md:mx-8 p-4 card"
            >
              {feature.promo?.filename && (
                <Link href={`/news/${feature.slug}`} className="min-w-full">
                  <Image
                    alt={feature.promo?.altText || "dl salo"}
                    src={setImage(feature.promo?.filename)}
                    width="400"
                    height="400"
                    className="rounded-xs"
                  />
                </Link>
              )}

              <div>
                {feature.content && <DocumentRenderer document={feature.content.document} />}
              </div>
            </div>
          ))}
      </div>

      <div>----------------------------------------</div>
      {posts &&
        posts
          .sort((a, b) => {
            if (a.order === b.order) return 0
            if (a.order === null || a.order === undefined) return 1
            if (b.order === null || b.order === undefined) return -1
            return a.order < b.order ? -1 : 1
          })
          .map(post => (
            <div
              key={post.slug}
              className="group flex flex-col gap-4 md:mx-8 p-4 card"
            >
              <Link href={`/news/${post.slug}`}>
                <h3 className="group-hover:font-corrected">{post.name}</h3>
              </Link>
              <div className="flex md:flex-row flex-col gap-4">
                {post?.promo?.filename && (
                  <Link href={`/news/${post.slug}`} className="md:min-w-max min-w-full">
                    <Image
                      alt={post.promo?.altText || "dl salo"}
                      src={setImage(post.promo?.filename)}
                      width="200"
                      height="200"
                      className="rounded-xs"
                    />
                  </Link>
                )}
                <div>{post.content && <DocumentRenderer document={post.content.document} />}</div>
              </div>
            </div>
          ))}
    </div>
  )
}
