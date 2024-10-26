import { NextRequest, NextResponse } from 'next/server'
import { Messages } from '@/constant/messages'
import { encrypt } from '@/lib/jwt'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  const body = await request.formData()
  const form = {
    username: body.get('username'),
    password: body.get('password'),
  }

  if (form.username && form.password) {
    const supabase = await createClient()

    const { data: managersData, error } = await supabase
      .from('managers')
      .select('name, role')
      .eq('username', form.username)
      .eq('password', form.password)
      .single()

    if (error) {
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

  return NextResponse.error()
}
