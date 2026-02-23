import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  name: { type: String, required: true, trim: true },
  age: { type: Number, min: 18, max: 100 },
  bio: { type: String, maxlength: 500 },
  photos: [{ type: String }],
  avatar: { type: String },
  
  // Ubicación
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  },
  
  // Preferencias
  preferences: {
    lookingFor: { type: String, enum: ['teteo', 'beber', 'bailar', 'playa', 'todo'], default: 'todo' },
    ageRange: { min: { type: Number, default: 18 }, max: { type: Number, default: 50 } },
    distance: { type: Number, default: 50 } // km
  },
  
  // Stats
  likes: { type: Number, default: 0 },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // VIP
  isVip: { type: Boolean, default: false },
  vipExpires: { type: Date },
  
  // Modo Fantasma
  ghostMode: {
    active: { type: Boolean, default: false },
    expiresAt: { type: Date }
  },
  
  // Status
  isOnline: { type: Boolean, default: false },
  lastActive: { type: Date, default: Date.now },
  
  // Verificación
  isVerified: { type: Boolean, default: false },
  verificationPhoto: { type: String }
  
}, { timestamps: true })

userSchema.index({ location: '2dsphere' })

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model('User', userSchema)