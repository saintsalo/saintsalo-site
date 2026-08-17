/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  // llms.txt is for AI crawlers, not search results — noindex keeps the file
  // (and the former-name reference inside it) out of Google.
  async headers() {
    return [
      {
        source: '/llms.txt',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      // The social-card image routes return 200 to Googlebot, which files them
      // under "Crawled - currently not indexed". noindex rather than a robots.txt
      // disallow: Twitterbot honours disallow and would stop fetching the card.
      {
        source: '/opengraph-image',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/twitter-image',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
  // Legacy routes now live under /patches — redirect so search engines and old
  // links consolidate on the canonical URLs.
  async redirects() {
    return [
      // www and apex both resolve to this app, so Google crawls every page
      // twice and files the www copy under "Alternate page with proper
      // canonical tag". Redirect www -> apex (matching SITE_URL in lib/seo)
      // so there's exactly one crawlable URL per page.
      // Railway's edge proxy rewrites the Host header to the internal service
      // name and passes the real one in x-forwarded-host, so the `host` rule
      // below never matches in production. Keep both: the header rule is what
      // actually fires on Railway, the host rule covers local/other runtimes.
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-host', value: 'www.saintsalo.com' }],
        destination: 'https://saintsalo.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.saintsalo.com' }],
        destination: 'https://saintsalo.com/:path*',
        permanent: true,
      },
      { source: '/patch', destination: '/patches', permanent: true },
      { source: '/rnbo', destination: '/patches/rnbo', permanent: true },
      { source: '/synth', destination: '/patches/synth', permanent: true },
      { source: '/whitenoise', destination: '/patches/whitenoise', permanent: true },
      // Old Squarespace blog post, still linked from forums/Discord.
      {
        source: '/salo-news/2018/10/18/video-game-release-space-hole-2018',
        destination: '/music/space-hole-2018',
        permanent: true,
      },
      // Squarespace-era URLs still reported as 404s in Search Console.
      { source: '/index', destination: '/', permanent: true },
      {
        source: '/photo-album/a-story-of-rats',
        destination: '/projects/a-story-of-rats',
        permanent: true,
      },
      {
        source: '/mad-tiger-dvd-released',
        destination: '/music/mad-tiger',
        permanent: true,
      },
      // Old Squarespace blog + its ?format=rss feed. There's no RSS now, and
      // no /news index — the homepage is where news posts are listed.
      { source: '/dl-salo', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
