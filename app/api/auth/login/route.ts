import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '../../../lib/supabase' // Nota: la importación cambia a @/lib
import jwt from 'jsonwebtoken'
import { LoginRequest, AuthResponse, ErrorResponse } from '../../../lib/types'

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const { email, password }: LoginRequest = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email y contraseña son requeridos' },
      { status: 400 }
    )
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    if (!data.user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 })
    }

    // Crear JWT personalizado
    const token = jwt.sign(
      { userId: data.user.id, email: data.user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    // Crear la respuesta para enviar la cookie HttpOnly
    const response = NextResponse.json(
      {
        message: 'Login exitoso',
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name || '',
          firstName: data.user.user_metadata?.first_name || '',
          lastName: data.user.user_metadata?.last_name || ''
        },
        session: data.session
      },
      { status: 200 }
    )

    // Configurar la cookie HttpOnly
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 86400,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    })

    return response
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}