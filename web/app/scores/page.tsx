import Link from "next/link"

export default function Page() {
  return (
    <div>
      <h1>Music Score Clips</h1>
      <div className="flex flex-col">
        <div className="flex md:flex-row flex-col gap-4">
          <div>title</div>
          <div>video</div>
        </div>
      </div>
    </div>
  )
}
