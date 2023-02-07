import { Jwe } from "@/app/collaborators/jwe"
import { SaintGenet } from "@/app/collaborators/saintgenet"

export default function Collaborators() {
  return (
    <div>
      <h1 className="uppercase mb-8">collaborators</h1>
      <div className="flex flex-col space-y-8">
        <SaintGenet />
        <div className="font-underlined w-full text-center">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <Jwe />
      </div>
    </div>
  )
}
