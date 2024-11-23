import { ModalsAddRoom } from '@/components/modals/addRoom'
import { RoomsPanel } from './panel'

export default function Rooms() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end">
        <ModalsAddRoom />
      </div>
      <RoomsPanel />
    </div>
  )
}
