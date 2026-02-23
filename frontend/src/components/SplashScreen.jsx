import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const newProgress = Math.min(p + Math.random() * 4 + 1, 100)
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onFinish, 500)
          return 100
        }
        return newProgress
      })
    }, 50)
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <motion.div className="fixed inset-0 bg-domi-dark z-[100] flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-64 h-80 mb-8">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF3340" />
              <stop offset="100%" stopColor="#0057B8" />
            </linearGradient>
          </defs>
          <motion.path d="M20,10 Q40,5 60,15 L75,25 Q85,35 80,50 L75,70 Q80,85 70,95 L55,105 Q40,115 25,105 L15,95 Q5,85 10,70 L15,50 Q10,35 15,25 Z" fill="url(#logoGrad)" stroke="white" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
          {[0,1,2,3,4].map(i => (
            <motion.circle key={i} cx={30+i*10} cy={30+(i%2)*20} r="3" fill="white" initial={{ scale: 0 }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
          ))}
        </svg>
      </motion.div>
      <h1 className="text-6xl font-black italic mb-6"><span className="text-domi-red">DOMI</span><span className="text-domi-blue">CORO</span></h1>
      <div className="w-72">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-domi-red to-domi-blue" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Cargando...</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  )
}