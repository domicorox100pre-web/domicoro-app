import { motion } from 'framer-motion'
import { X, Crown, Check, Star, Zap, Ghost, Gift } from 'lucide-react'
import { Button, Card } from '../ui'

const benefits = [
  { icon: Ghost, text: 'Modo Fantasma ilimitado' },
  { icon: Star, text: 'Ver quién te dio like' },
  { icon: Zap, text: 'Likes ilimitados' },
  { icon: Gift, text: 'Regalos gratis semanales' },
]

const plans = [
  { name: '1 Mes', price: '$9.99', popular: false },
  { name: '6 Meses', price: '$39.99', popular: true, save: '33%' },
  { name: '1 Año', price: '$59.99', popular: false, save: '50%' },
]

export const VIPSection = ({ onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-domi-dark z-50 flex flex-col overflow-y-auto">
    <div className="flex justify-between items-center p-4 sticky top-0 bg-domi-dark/95 backdrop-blur z-10">
      <h2 className="text-xl font-black text-yellow-400 flex items-center gap-2">
        <Crown /> Zona VIP 👑
      </h2>
      <button onClick={onClose} className="p-2 bg-white/10 rounded-full"><X size={24} /></button>
    </div>

    <div className="p-6 space-y-6">
      <div className="text-center">
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-yellow-500/50">
          <Crown size={48} className="text-black" />
        </motion.div>
        <h3 className="text-2xl font-black text-white mb-2">Desbloquea todo</h3>
        <p className="text-gray-400">Únete a los coristas VIP</p>
      </div>

      <div className="space-y-3">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-center gap-3 bg-domi-card p-3 rounded-xl">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400">
              <b.icon size={20} />
            </div>
            <p className="text-white font-medium">{b.text}</p>
            <Check size={20} className="text-green-400 ml-auto" />
          </div>
        ))}
      </div>

      <div className="grid gap-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative ${plan.popular ? 'border-yellow-500/50 bg-yellow-500/10' : ''}`}>
            {plan.popular && <Badge className="absolute -top-2 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">POPULAR</Badge>}
            {plan.save && <span className="absolute top-4 right-4 text-green-400 text-xs font-bold">AHORRA {plan.save}</span>}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-white text-lg">{plan.name}</p>
                <p className="text-2xl font-black text-yellow-400">{plan.price}</p>
              </div>
              <Button variant={plan.popular ? 'vip' : 'secondary'} size="sm">Elegir</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </motion.div>
)