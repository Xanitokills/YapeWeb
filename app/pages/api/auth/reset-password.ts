import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import { ResetPasswordRequest, AuthResponse, ErrorResponse } from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { access_token, refresh_token, password }: ResetPasswordRequest = req.body

  if (!access_token || !refresh_token || !password) {
    return res.status(400).json({ error: 'Tokens y nueva contraseña son requeridos' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
  }

  try {
    // Establecer la sesión con los tokens
    const { error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token
    })

    if (sessionError) {
      return res.status(400).json({ error: 'Tokens inválidos o expirados' })
    }

    // Actualizar la contraseña
    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    })

    if (updateError) {
      return res.status(400).json({ error: updateError.message })
    }

    res.status(200).json({
      message: 'Contraseña actualizada exitosamente'
    })

  } catch (error) {
    console.error('Error en reset password:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}