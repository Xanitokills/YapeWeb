import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import { ForgotPasswordRequest, AuthResponse, ErrorResponse } from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email }: ForgotPasswordRequest = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email es requerido' })
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.status(200).json({
      message: 'Email de recuperación enviado exitosamente'
    })

  } catch (error) {
    console.error('Error en forgot password:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}