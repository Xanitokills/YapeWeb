import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import { AuthResponse, ErrorResponse } from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    // Limpiar cookie
    res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production'}`)

    res.status(200).json({
      message: 'Logout exitoso'
    })

  } catch (error) {
    console.error('Error en logout:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}