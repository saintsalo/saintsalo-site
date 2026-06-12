// Local release-date map for the /timeline page.
//
// The CMS has no real release-date field (`createdAt` is the import date, not the
// release date), so timeline dates live here and are maintained by hand.
//
// Format: slug -> "YYYY-MM". The month + year drive the sticky "MONTH YEAR"
// label. A slug not listed here (or with an empty value) is omitted from the
// timeline.
//
// Dates below were researched from official sources (Bandcamp, Discogs, label
// PR, SoundCloud upload timestamps). The source + confidence is noted per line.
// Where only a year or a performance/premiere is documented, the month is a
// best-effort proxy — flagged `month approx`. Correct any of these as you like;
// you (saintsalo) are the source of truth.

export const releaseDates: Record<string, string> = {
  // newest first
  "the-holy-sun-opera-house": "2026-05", // high — Bandcamp/label PR: May 15, 2026
  "lighting-fires-along-the-way": "2025-11", // high — Cowboy Cinema (dl Salo + Michael Haertlein), Bandcamp: Nov 7, 2025
  "extreme-evolution-soundtrack": "2024-02", // high — Bandcamp: Feb 1, 2024
  "attic-ep": "2023-12", // high — Bandcamp: Dec 9, 2023
  "sorrows-sachiko-sorrows-lincoln": "2019-10", // high — SoundCloud upload: Oct 30, 2019
  "the-immeasurable-spiral": "2018-04", // high — Bandcamp: Apr 6, 2018
  "i-want-to-hear-the-sea": "2017-06", // medium — NW New Works premiere Jun 2017 (SC upload Nov 2017)
  "who-with-their-fear-is-set-beside-their-part": "2016-04", // medium — donaufestival 2016 (Apr 29–May 7); month approx
  "frail-affinities": "2016-04", // medium — Saint Genet premiere, donaufestival 2016; month approx
  "an-exemplary-case-of-love-without-respite": "2015-05", // medium — Vimeo film portrait May 4, 2015 (SC audio Sep 2015)
  "mad-tiger": "2015-10", // low(month) — Discogs LP 2015; month approx from Oct 2015 soundtrack video
  "transports-of-delirium": "2013-01", // medium — SC tracks Jan 30, 2013 (performance 2011)
  "the-fog-is-rising": "2012-05", // high — Bandcamp: May 22, 2012 (Joy Wants Eternity)
  "a-story-of-rats-motel": "2022-01", // high — Bandcamp: Jan 21, 2022
  "space-hole-2020": "2020-11", // medium — game launch Nov 15, 2020 (no standalone OST release)
  "you-who-pretend-to-sleep": "2007-05", // high — Bandcamp: May 28, 2007 (Joy Wants Eternity)
}
