import Link from "next/link"

export default function Page() {
  return (
    <div>
      <h1>Contact</h1>
      <div>
        email: <Link href="mailto:saintsalo@gmail.com">saintsalo@gmail.com</Link>
      </div>
      <div>
        Object Sonore (Label) email:{" "}
        <Link href="mailto:salo@objectsonore.com">salo@objectsonore.com</Link>
      </div>
      <div>
        dm/instagram:{" "}
        <Link href="https://www.instagram.com/saintsalo/" target="_blank">
          @saintsalo
        </Link>
      </div>
    </div>
  )
}
