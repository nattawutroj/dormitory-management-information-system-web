import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Messages } from '@/constant/messages'
import { toast } from '@/hooks/use-toast'
import { createClient } from '@/utils/supabase/client'
import { TablesInsert } from '@/utils/supabase/database.types'

export const useRoomByDormitory = (dormitoryId: string) =>
  useQuery({
    queryKey: ['room', dormitoryId],
    queryFn: () => RoomClientByDormitory(dormitoryId),
  })

const RoomClientByDormitory = async (dormitoryId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('room')
    .select('*')
    .eq('dormitory_id', dormitoryId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const useCreateRoom = (dormitory_id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createRoom'],
    mutationFn: ({ room_number }: { room_number: string }) =>
      CreateRoomClient({ dormitory_id, room_number }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room', dormitory_id] })
      toast({
        variant: 'default',
        title: Messages.rooms.modal.toast.success.title,
      })
    },
  })
}

export const CreateRoomClient = async (value: TablesInsert<'room'>) => {
  const supabase = createClient()

  const { data, status } = await supabase.from('room').insert(value)

  return { data, status }
}
