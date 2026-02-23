import mongoose from 'mongoose'

const coroSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['teteo', 'beber', 'bailar', 'playa'], required: true },
  description: { type: String, maxlength: 1000 },
  
  // Ubicación
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true },
    address: { type: String }
  },
  
  // Fecha y hora
  date: { type: Date, required: true },
  duration: { type: Number, default: 4 }, // horas
  
  // Participantes
  maxPeople: { type: Number, default: 10, max: 100 },
  attendees: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
    joinedAt: { type: Date, default: Date.now }
  }],
  
  // Estado
  status: { type: String, enum: ['active', 'cancelled', 'completed'], default: 'active' },
  
  // After Party (compartir ubicación en tiempo real)
  afterParty: {
    active: { type: Boolean, default: false },
    startedAt: { type: Date },
    expiresAt: { type: Date }
  }
  
}, { timestamps: true })

coroSchema.index({ location: '2dsphere' })
coroSchema.index({ date: 1 })

export const Coro = mongoose.model('Coro', coroSchema)