import Link from "next/link"

function Page() {
  return (
    <div>
      Experiments with Max/MSP and RNBO... <div className="">(this page always changes)</div>
      <div className="my-8">
        <Link href="/rnbo">Web Audio Export</Link>
      </div>
    </div>
  )
}

export default Page
