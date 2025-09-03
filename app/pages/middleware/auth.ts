import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { JWTPayload, ErrorResponse } from '../../lib/types'

export interface AuthenticatedRequest extends NextApiRequest {
  user: JWTPayload;
}

type AuthenticatedHandler = (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => Promise<void> | void;

export const authMiddleware = (handler: AuthenticatedHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse<any | ErrorResponse>) => {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
      const authReq = req as AuthenticatedRequest
      authReq.user = decoded
      return handler(authReq, res)
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirado' })
    }
  }
}