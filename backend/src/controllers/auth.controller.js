import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' })
}

export const authController = {
  // Registro
  register: async (req, res) => {
    try {
      const { email, password, name, age } = req.body
      
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Email ya registrado' })
      }
      
      const user = await User.create({
        email,
        password,
        name,
        age: age || 18
      })
      
      const token = generateToken(user._id)
      
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          age: user.age
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message })
    }
  },
  
  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' })
      }
      
      const isValidPassword = await user.comparePassword(password)
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Credenciales inválidas' })
      }
      
      // Actualizar estado online
      user.isOnline = true
      user.lastActive = new Date()
      await user.save()
      
      const token = generateToken(user._id)
      
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          age: user.age,
          isVip: user.isVip,
          photos: user.photos
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message })
    }
  },
  
  // Perfil actual
  me: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password')
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' })
    }
  },
  
  // Logout
  logout: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.userId, { isOnline: false, lastActive: new Date() })
      res.json({ message: 'Logout exitoso' })
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' })
    }
  }
}