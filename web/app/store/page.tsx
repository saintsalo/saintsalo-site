function Page() {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <i>Vinyl copies are currently sold out</i>
      </div>
      <div>
        <h2 className="text-lg mb-4">Digital Downloads</h2>
      </div>
      <div>
        <h2 className="text-lg mb-8">A Story of Rats</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-8">
          <div className="flex flex-col">
            <h3>Motel</h3>
            <iframe
              style={{ border: 0, width: "350px", height: "470px" }}
              src="https://bandcamp.com/EmbeddedPlayer/album=1276359757/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
              seamless
            >
              <a href="https://asor.bandcamp.com/album/motel-2">MOTEL by A STORY OF RATS</a>
            </iframe>
          </div>
          <div className="flex flex-col">
            <h3>Immeasurable Spiral</h3>
            <iframe
              style={{ border: 0, width: "350px", height: "470px" }}
              src="https://bandcamp.com/EmbeddedPlayer/album=2818561452/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
              seamless
            >
              <a href="https://asor.bandcamp.com/album/the-immeasurable-spiral-3">
                The Immeasurable Spiral by A STORY OF RATS
              </a>
            </iframe>
          </div>
          <div className="flex flex-col">
            <h3>Circling the Garland</h3>
            <iframe
              style={{ border: 0, width: "350px", height: "470px" }}
              src="https://bandcamp.com/EmbeddedPlayer/track=1842347705/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
              seamless
            >
              <a href="https://asor.bandcamp.com/track/circling-the-garland">
                Circling The Garland by A STORY OF RATS
              </a>
            </iframe>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg mb-8">Joy Wants Eternity</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-8">
          <div className="flex flex-col">
            <h3>The Fog is Rising</h3>
            <iframe
              style={{ border: 0, width: "350px", height: "470px" }}
              src="https://bandcamp.com/EmbeddedPlayer/album=1584663395/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
              seamless
            >
              <a href="https://joywantseternity.bandcamp.com/album/the-fog-is-rising">
                The Fog is Rising by Joy Wants Eternity
              </a>
            </iframe>
          </div>
          <div className="flex flex-col">
            <h3>MYSYEBYLTLWYE</h3>
            <iframe
              style={{ border: 0, width: "350px", height: "470px" }}
              src="https://bandcamp.com/EmbeddedPlayer/album=3424174603/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
              seamless
            >
              <a href="https://joywantseternity.bandcamp.com/album/must-you-smash-your-ears-before-you-learn-to-listen-with-your-eyes">
                must you smash your ears before you learn to listen with your eyes by joy wants
                eternity
              </a>
            </iframe>
          </div>
          <div className="flex flex-col">
            <h3>You Who Pretend to Sleep</h3>
            <iframe
              style={{ border: 0, width: "350px", height: "470px" }}
              src="https://bandcamp.com/EmbeddedPlayer/album=2074367101/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
              seamless
            >
              <a href="https://joywantseternity.bandcamp.com/album/you-who-pretend-to-sleep">
                You Who Pretend to Sleep by Joy Wants Eternity
              </a>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
