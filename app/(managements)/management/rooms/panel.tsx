'use client'

import { useDormitories } from '@/hooks/queries/client/dormitory'

export const RoomsPanel = () => {
  const { data: getDormitoryValue } = useDormitories()
  return (
    <>
      <div>{getDormitoryValue?.map((a, b) => <p key={b}>{a.name}</p>)}</div>
    </>
  )
}
