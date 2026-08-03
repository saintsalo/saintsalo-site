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
    ]
  },
  // Legacy routes now live under /patches — redirect so search engines and old
  // links consolidate on the canonical URLs.
  async redirects() {
    return [
      { source: '/patch', destination: '/patches', permanent: true },
      { source: '/rnbo', destination: '/patches/rnbo', permanent: true },
      { source: '/synth', destination: '/patches/synth', permanent: true },
      { source: '/whitenoise', destination: '/patches/whitenoise', permanent: true },
    ]
  },
}

module.exports = nextConfig
