import { Container } from "@/components/Container"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container>
        <Header />
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}
