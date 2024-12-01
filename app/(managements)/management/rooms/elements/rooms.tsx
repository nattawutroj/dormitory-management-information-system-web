import { useRoomByDormitory } from '@/hooks/queries/client/room'

export const RoomsList = ({ dormitoryID }: { dormitoryID: string }) => {
  const { data: roomList } = useRoomByDormitory(dormitoryID)
  return (
    <ul>
      {roomList?.map((a, b) => {
        return <li key={b}>{a.room_number}</li>
      })}
    </ul>
  )
}
