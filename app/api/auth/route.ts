import { NextRequest, NextResponse } from 'next/server'
import { Messages } from '@/constant/messages'
import { LoginSchema } from '@/hooks/forms/auth/schema'
import { encrypt } from '@/lib/jwt'
import { createClient } from '@/utils/supabase/server'
import { validateFormData } from '@/utils/zod/api/validateFormData'

export async function POST(request: NextRequest) {
  const body = await request.formData()

  const validationResult = validateFormData(LoginSchema, body)

  if (!validationResult.success) {
    return NextResponse.json(
      { messages: validationResult.errors.errors },
      { status: 400 }
    )
  }

  const { username, password } = validationResult.data

  const supabase = await createClient()

  const { data: managersData, error } = await supabase
    .from('managers')
    .select('name, role')
    .eq('username', username)
    .eq('password', password)
    .single()

  if (error || !managersData) {
    return NextResponse.json(
      { messages: Messages.api.notFoundUser },
      { status: 401 }
    )
  }

  type payloadType = typeof managersData
  const encryptedData = await encrypt<payloadType>(managersData)

  const response = NextResponse.json(encryptedData)

  response.cookies.set('auth_token', encryptedData, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
  })

  return response
}
