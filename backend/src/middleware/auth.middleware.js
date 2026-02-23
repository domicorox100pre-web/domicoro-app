import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ message: 'No autorizado - Token no proporcionado' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey')
    req.userId = decoded.userId
    
    next()
  } catch (error) {
    res.status(401).json({ message: 'No autorizado - Token inválido' })
  }
}