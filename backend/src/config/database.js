import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/domicoro', {
      // Opciones deprecadas eliminadas en Mongoose 6+
    })
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message)
    process.exit(1)
  }
}