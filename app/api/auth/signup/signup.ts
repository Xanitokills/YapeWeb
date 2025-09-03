import { NextApiRequest, NextApiResponse } from 'next'
import { supabase, supabaseAdmin } from '../../../../lib/supabase'
import { SignupRequest, AuthResponse, ErrorResponse } from '../../../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password, firstName, lastName }: SignupRequest = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`
        }
      }
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    // Si necesitas crear un perfil adicional en una tabla personalizada
    if (data.user) {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          first_name: firstName,
          last_name: lastName,
          created_at: new Date().toISOString()
        })

      if (profileError) {
        console.error('Error creando perfil:', profileError)
      }
    }

    res.status(201).json({
      message: 'Usuario creado exitosamente. Revisa tu email para confirmar tu cuenta.',
      user: data.user && data.user.email ? {
        id: data.user.id,
        email: data.user.email,
        firstName,
        lastName
      } : undefined
    })

  } catch (error) {
    console.error('Error en signup:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}