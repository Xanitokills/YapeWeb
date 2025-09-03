import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import jwt from 'jsonwebtoken'
import { LoginRequest, AuthResponse, ErrorResponse } from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password }: LoginRequest = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' })
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return res.status(401).json({ error: error.message })
    }

    if (!data.user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    // Crear JWT personalizado
    const token = jwt.sign(
      { 
        userId: data.user.id, 
        email: data.user.email 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    // Configurar cookie httpOnly
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production'}`)

    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.user_metadata?.full_name || '',
        firstName: data.user.user_metadata?.first_name || '',
        lastName: data.user.user_metadata?.last_name || ''
      },
      session: data.session
    })

  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}