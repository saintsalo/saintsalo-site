import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hhy8jas.css" />
      </head>
      <body>
        <Container>
          <Header />
          <div>{children}</div>
        </Container>
      </body>
    </html>
  )
}
