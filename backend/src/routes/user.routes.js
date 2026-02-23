import { Router } from 'express'
import { User } from '../models/User.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

// Obtener usuarios cercanos
router.get('/nearby', authMiddleware, async (req, res) => {
  try {
    const { lat, lng, maxDistance = 50000 } = req.query // metros
    
    const users = await User.find({
      _id: { $ne: req.userId },
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      },
      'ghostMode.active': false // No mostrar usuarios en modo fantasma
    }).select('-password -email').limit(20)
    
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error buscando usuarios' })
  }
})

// Dar like
router.post('/like/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId: likedUserId } = req.params
    const userId = req.userId
    
    // Verificar si hay match
    const likedUser = await User.findById(likedUserId)
    const hasMatch = likedUser.matches.includes(userId)
    
    if (hasMatch) {
      // Es un match mutuo!
      await User.findByIdAndUpdate(userId, { $addToSet: { matches: likedUserId } })
      return res.json({ match: true, message: '¡Nuevo match! 🔥' })
    }
    
    // Solo like
    await User.findByIdAndUpdate(likedUserId, { $inc: { likes: 1 } })
    res.json({ match: false, message: 'Like enviado' })
    
  } catch (error) {
    res.status(500).json({ message: 'Error procesando like' })
  }
})

// Actualizar perfil
router.patch('/profile', authMiddleware, async (req, res) => {
  try {
    const updates = req.body
    const allowedUpdates = ['name', 'age', 'bio', 'photos', 'preferences', 'location']
    
    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => ({ ...obj, [key]: updates[key] }), {})
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      filteredUpdates,
      { new: true, runValidators: true }
    ).select('-password')
    
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: 'Error actualizando perfil' })
  }
})

export { router as userRoutes }