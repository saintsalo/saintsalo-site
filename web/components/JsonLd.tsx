// Renders a schema.org JSON-LD block. Drop one (or more) into any server
// component's JSX to expose structured data to search engines.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject; there is no user-controlled
      // HTML here, only serialised data we construct.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
