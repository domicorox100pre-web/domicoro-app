import { Router } from 'express'
import { body } from 'express-validator'
import { authController } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

// Validaciones
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
  body('name').trim().isLength({ min: 2 }).withMessage('Nombre requerido')
]

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
]

// Rutas
router.post('/register', registerValidation, authController.register)
router.post('/login', loginValidation, authController.login)
router.get('/me', authMiddleware, authController.me)
router.post('/logout', authMiddleware, authController.logout)

export { router as authRoutes }