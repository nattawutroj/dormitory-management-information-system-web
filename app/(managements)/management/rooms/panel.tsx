'use client'

import { useDormitories } from '@/hooks/queries/client/dormitory'
import { RoomsList } from './elements/rooms'

export const RoomsPanel = () => {
  const { data: getDormitoryValue } = useDormitories()
  return (
    <>
      <div>
        {getDormitoryValue?.map((a, b) => (
          <div key={b}>
            <p>{a.name}</p>
            <RoomsList dormitoryID={a.id} />
          </div>
        ))}
      </div>
    </>
  )
}
