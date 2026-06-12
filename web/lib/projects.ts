// Maps releases / performances to the project (band/collaboration) they belong
// to, so the timelines can show a header like "Holy Sun Opera House" above each
// entry. Every project except your own name links to its /projects/<slug> page.
//
// Project slugs match the CMS `project` posts (see /projects). A `null` mapping
// means it's a self-release credited to DL Salo (no link).

const PROJECT_NAMES = {
  "holy-sun-opera-house": "Holy Sun Opera House",
  "joy-wants-eternity": "Joy Wants Eternity",
  "saint-genet": "Saint Genet",
  "a-story-of-rats": "A Story of Rats",
  "earth-and-ceremony": "Earth and Ceremony",
  "cowboy-cinema": "Cowboy Cinema",
} as const

export type ProjectSlug = keyof typeof PROJECT_NAMES

export const SELF_NAME = "DL Salo"

export interface ProjectRef {
  name: string
  href?: string // omitted for self-releases
}

// Resolve a project slug (or null/undefined = self) to a display ref.
export const projectRef = (slug: ProjectSlug | null | undefined): ProjectRef =>
  slug ? { name: PROJECT_NAMES[slug], href: `/projects/${slug}` } : { name: SELF_NAME }

// Music release slug -> project slug (null = DL Salo self-release).
export const releaseProjects: Record<string, ProjectSlug | null> = {
  "the-holy-sun-opera-house": "holy-sun-opera-house",
  "lighting-fires-along-the-way": "cowboy-cinema", // dl Salo + Michael Haertlein
  "extreme-evolution-soundtrack": null, // game OST by dl Salo
  "attic-ep": "holy-sun-opera-house",
  "sorrows-sachiko-sorrows-lincoln": "saint-genet", // re-recorded music from Saint Genet's Paradisiacal Rites
  "the-immeasurable-spiral": "a-story-of-rats",
  "i-want-to-hear-the-sea": "earth-and-ceremony",
  "who-with-their-fear-is-set-beside-their-part": "saint-genet",
  "frail-affinities": "saint-genet",
  "an-exemplary-case-of-love-without-respite": "saint-genet", // verify — film score w/ Garek Jon Druss (R.C. Mitchell)
  "mad-tiger": "joy-wants-eternity", // verify — OST performed by Joy Wants Eternity
  "transports-of-delirium": "saint-genet", // Saint Genet "Sorrows: Music from Transports of Delirium"
  "the-fog-is-rising": "joy-wants-eternity",
  "a-story-of-rats-motel": "a-story-of-rats",
  "space-hole-2020": null, // video game OST by dl Salo
  "you-who-pretend-to-sleep": "joy-wants-eternity",
}
