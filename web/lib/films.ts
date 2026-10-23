// Film scores for the /timeline page, from my IMDb composer credits
// (https://www.imdb.com/name/nm7953646/). Like lib/performances.ts these aren't
// in the CMS, so they live here and are maintained by hand.
//
// Mad Tiger is left out: it's already on the timeline through its soundtrack
// release in the CMS (/music/mad-tiger).

export interface Film {
  /** IMDb title id; entries link out to the IMDb title page */
  imdbId: string
  title: string
  /** "YYYY-MM" release, per IMDb */
  date: string
  director: string
  /** one-line synopsis, from IMDb where it has one */
  summary?: string
  /** poster filename under /public/images (resolve with setImage) */
  image?: string
}

export const films: Film[] = [
  {
    imdbId: "tt12605156",
    title: "Be Safe",
    date: "2019-10",
    director: "Matt Dy",
    summary: "A lecherous scientist is faced with a dark decision.",
    image: "films/be-safe.jpg",
  },
  {
    imdbId: "tt12580240",
    title: "Loop",
    date: "2018-10",
    director: "Matt Dy",
    image: "films/loop.jpg",
  },
  {
    imdbId: "tt8134888",
    title: "One Way or Another",
    date: "2018-04",
    director: "Rich Phelps",
    summary:
      "On a quiet night in a roadside bar, egos and alcohol ignite, sending two friends toward a violent showdown.",
    image: "films/one-way-or-another.jpg",
  },
  {
    imdbId: "tt8993416",
    title: "Cat Box",
    date: "2017-10",
    director: "Kris Kristensen",
    summary:
      "A cat sitter's curiosity gets the better of him when a series of keys lead him to a well kept secret.",
    image: "films/cat-box.jpg",
  },
  {
    imdbId: "tt12572428",
    title: "Rematch",
    date: "2017-10",
    director: "Matt Dy",
    summary:
      "A disgraced word game champion, dealing with addiction and a dissolving marriage, faces his greatest opponent.",
    image: "films/rematch.jpg",
  },
  {
    imdbId: "tt8351408",
    title: "Unbearable",
    date: "2017-06",
    director: "Kris Kristensen",
    image: "films/unbearable.jpg",
  },
]

export const imdbUrl = (film: Film): string => `https://www.imdb.com/title/${film.imdbId}/`
