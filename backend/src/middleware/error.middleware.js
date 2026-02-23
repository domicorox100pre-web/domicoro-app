export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)
  
  // Error de MongoDB (duplicado)
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Datos duplicados',
      field: Object.keys(err.keyValue)[0]
    })
  }
  
  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ message: 'Error de validación', errors: messages })
  }
  
  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Token inválido' })
  }
  
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}