import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import "./globals.css"
import { GiRose } from "react-icons/gi"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hhy8jas.css" />
      </head>
      <body>
        <Container>
          <GiRose />

          <Header />
          <div>{children}</div>
        </Container>
      </body>
    </html>
  )
}
