import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../lib/supabase'
import { JWTPayload, User, ErrorResponse } from '../../lib/types'

interface VerifyTokenResponse {
  valid: boolean;
  user?: User;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyTokenResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token }: { token: string } = req.body

  if (!token) {
    return res.status(400).json({ error: 'Token es requerido' })
  }

  try {
    // Verificar JWT personalizado
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload

    // Verificar que el usuario existe en Supabase
    const { data: user, error } = await supabaseAdmin.auth.admin.getUserById(decoded.userId)

    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido' })
    }

    res.status(200).json({
      valid: true,
      user: {
        id: user.user.id,
        email: user.user.email!,
        fullName: user.user.user_metadata?.full_name || '',
        firstName: user.user.user_metadata?.first_name || '',
        lastName: user.user.user_metadata?.last_name || ''
      }
    })

  } catch (error) {
    console.error('Error verificando token:', error)
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}