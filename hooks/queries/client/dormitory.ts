import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'
import { TablesInsert } from '@/utils/supabase/database.types'

const DormitoryClient = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.from('dormitory').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const useDormitories = () =>
  useQuery({
    queryKey: ['dormitory'],
    queryFn: DormitoryClient,
  })

export const CreateDormitoryClient = async (
  value: TablesInsert<'dormitory'>
) => {
  const supabase = createClient()

  const { data, status } = await supabase.from('dormitory').insert(value)

  return { data, status }
}
