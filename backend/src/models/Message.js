import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Para chats 1 a 1 o grupales
  conversationId: { type: String, required: true },
  
  content: { type: String, required: true, maxlength: 2000 },
  type: { type: String, enum: ['text', 'image', 'gift', 'location'], default: 'text' },
  
  // Metadatos
  isRead: { type: Boolean, default: false },
  readAt: { type: Date },
  
  // Regalos
  gift: {
    type: { type: String },
    amount: { type: Number }
  }
  
}, { timestamps: true })

messageSchema.index({ conversationId: 1, createdAt: -1 })
messageSchema.index({ sender: 1, recipient: 1 })

export const Message = mongoose.model('Message', messageSchema)