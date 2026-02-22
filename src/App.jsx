import { useState, useEffect } from 'react';
import { 
  Ghost, MapPin, Gift, MessageCircle, User, Crown, 
  Flame, Beer, Plus, Grid, Tv, X, Send, Check, 
  Navigation, Heart, Star, Clock, Phone, Camera,
  Settings, HelpCircle, ChevronRight, LogOut, Music
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// === COMPONENTE SPLASH SCREEN ===
const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div 
      className="fixed inset-0 bg-domi-dark z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="relative w-64 h-80 mb-8">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          <path 
            d="M20,10 Q40,5 60,15 L75,25 Q85,35 80,50 L75,70 Q80,85 70,95 L55,105 Q40,115 25,105 L15,95 Q5,85 10,70 L15,50 Q10,35 15,25 Z" 
            fill="#1a1a1a" stroke="#EF3340" strokeWidth="1"
          />
          {[0,1,2,3,4].map(i => (
            <g key={i}>
              <circle cx={30+i*10} cy={30+(i%2)*20} r="3" fill="#EF3340">
                <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite" begin={`${i*0.2}s`}/>
              </circle>
            </g>
          ))}
        </svg>
      </div>
      <h1 className="text-5xl font-black italic mb-2">
        <span className="text-domi-red">DOMI</span>
        <span className="text-domi-blue">CORO</span>
      </h1>
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-domi-red to-domi-blue" style={{width: `${progress}%`}}/>
      </div>
      <p className="text-gray-600 text-xs mt-2">{progress}%</p>
    </motion.div>
  );
};

// === COMPONENTE MAPA ===
const MapaRD = ({ onClose }) => {
  const [selected, setSelected] = useState(null);
  const coros = [
    { id: 1, name: 'Zona Colonial', x: 66, y: 56, icon: '🔥', activos: 45, desc: 'Coros históricos' },
    { id: 2, name: '75 Grados', x: 68, y: 54, icon: '🍻', activos: 32, desc: 'El punto de encuentro' },
    { id: 3, name: 'Malecón', x: 67, y: 55, icon: '💃', activos: 28, desc: 'Vistas al mar' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-white/10 bg-domi-card/80">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <MapPin className="text-domi-red"/> Mapa de Coros
        </h2>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full btn-active">
          <X size={24} className="text-white"/>
        </button>
      </div>
      <div className="flex-1 relative bg-domi-dark">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M15,15 Q25,10 35,15 L45,20 Q55,15 65,20 L75,25 Q80,35 75,45 L70,55 Q75,65 65,70 L55,75 Q45,80 35,75 L25,70 Q15,65 20,55 L15,45 Q10,35 15,25 Z" 
            fill="#1a1a1a" stroke="#333" strokeWidth="0.3"/>
          {coros.map(c => (
            <g key={c.id} onClick={() => setSelected(c)} className="cursor-pointer">
              <circle cx={c.x} cy={c.y} r="4" fill="#EF3340" opacity="0.6">
                <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
              </circle>
              <text x={c.x} y={c.y-6} textAnchor="middle" fontSize="4">{c.icon}</text>
            </g>
          ))}
        </svg>
      </div>
      {selected && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }}
          className="bg-domi-card p-6 rounded-t-3xl border-t border-white/10 absolute bottom-0 w-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-black text-white">{selected.icon} {selected.name}</h3>
              <p className="text-gray-400 text-sm">{selected.desc}</p>
            </div>
            <button onClick={() => setSelected(null)} className="p-2 bg-white/10 rounded-full">
              <X size={20} className="text-white"/>
            </button>
          </div>
          <div className="flex items-center gap-2 text-domi-red mb-4">
            <span className="font-bold">{selected.activos} coristas</span>
          </div>
          <button className="w-full bg-domi-red text-white py-4 rounded-2xl font-black btn-active">
            UNIRME AL CORO
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

// === MODO FANTASMA ===
const ModoFantasma = ({ onClose }) => {
  const [step, setStep] = useState('warning');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([{from: 'them', text: 'Hey 👋'}]);
  const [input, setInput] = useState('');
  const chats = [
    { id: 1, name: 'Usuario-452', msg: '¿Vamos pa\' la Zona?', time: '2m', unread: 2 },
    { id: 2, name: 'Usuario-891', msg: 'Estoy en 75 grados', time: '15m', unread: 0 },
  ];

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, {from: 'me', text: input}]);
    setInput('');
    setTimeout(() => setMessages(prev => [...prev, {from: 'them', text: 'Dale 🔥'}]), 1000);
  };

  if (step === 'warning') return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      className="fixed inset-0 bg-domi-dark z-50 flex flex-col items-center justify-center p-8 text-center ghost-pattern">
      <Ghost size={64} className="text-green-400 mb-6"/>
      <h2 className="text-3xl font-black text-white mb-4">MODO FANTASMA 👻</h2>
      <div className="space-y-3 text-gray-400 text-sm mb-8 text-left w-full max-w-xs">
        {['Nadie verá tu foto ni nombre real', 'Chats encriptados y temporales', 'Solo accedes a chats existentes'].map((t,i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check size={14} className="text-green-400"/>
            </div>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setStep('chats')} className="w-full max-w-xs bg-green-600 text-white py-4 rounded-2xl font-black btn-active">
        ENTRAR COMO FANTASMA
      </button>
      <button onClick={onClose} className="mt-4 text-gray-500">Cancelar</button>
    </motion.div>
  );

  if (selectedChat) return (
    <div className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex items-center gap-4 p-4 border-b border-white/10 bg-domi-card">
        <button onClick={() => setSelectedChat(null)}><X size={24} className="text-white"/></button>
        <div>
          <h3 className="text-white font-bold">{selectedChat.name}</h3>
          <p className="text-green-400 text-xs flex items-center gap-1"><Ghost size={10}/> Modo Fantasma</p>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-3 text-center">
          <p className="text-green-400 text-xs">🔒 Este chat es temporal y anónimo</p>
        </div>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${m.from === 'me' ? 'bg-green-600 text-white rounded-br-none' : 'bg-domi-card text-gray-200 rounded-bl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-domi-card border-t border-white/10 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Mensaje anónimo..." 
          className="flex-1 bg-domi-dark text-white px-4 py-3 rounded-xl text-sm"/>
        <button type="submit" className="bg-green-600 text-white px-4 rounded-xl btn-active"><Send size={20}/></button>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-domi-dark z-50 flex flex-col ghost-pattern">
      <div className="flex justify-between items-center p-4 border-b border-white/10 bg-domi-card/80">
        <div className="flex items-center gap-3">
          <Ghost size={28} className="text-green-400"/>
          <div>
            <h2 className="text-white font-black">Modo Fantasma</h2>
            <p className="text-green-400 text-xs">Navegación privada activada</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full btn-active"><X size={24} className="text-white"/></button>
      </div>
      <div className="flex-1 p-4 space-y-3">
        {chats.map(chat => (
          <button key={chat.id} onClick={() => setSelectedChat(chat)} 
            className="w-full bg-domi-card p-4 rounded-2xl flex items-center gap-4 text-left btn-active border border-white/5">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <Ghost size={24} className="text-green-400"/>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold">{chat.name}</h4>
              <p className="text-gray-400 text-sm">{chat.msg}</p>
            </div>
            {chat.unread > 0 && <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">{chat.unread}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

// === CHAT CON FRASES ===
const ChatConFrases = ({ onClose }) => {
  const [messages, setMessages] = useState([{from: 'them', text: 'Hey, ¿qué lo que? 👋'}]);
  const [input, setInput] = useState('');
  const frases = ["¿Quieres bailar? 💃", "¿Qué tomas? 🍻", "Me gustas 😏", "¿Me enseñas a bailar? 🕺"];

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages([...messages, {from: 'me', text}]);
    setTimeout(() => setMessages(prev => [...prev, {from: 'them', text: 'Jajaja, dale 🔥'}]), 1000);
  };

  return (
    <div className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex items-center gap-4 p-4 border-b border-white/10 bg-domi-card">
        <button onClick={onClose} className="btn-active"><X size={24} className="text-white"/></button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-domi-red flex items-center justify-center font-bold">S</div>
        <div>
          <h3 className="text-white font-bold">Sofía M.</h3>
          <p className="text-green-400 text-xs flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/> En línea</p>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${m.from === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-domi-card text-gray-200 rounded-bl-none'}`}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-4 bg-domi-card border-t border-white/10">
        <p className="text-gray-500 text-xs mb-2">💡 Frases sugeridas:</p>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
          {frases.map((f, i) => (
            <button key={i} onClick={() => sendMessage(f)} 
              className="flex-shrink-0 bg-domi-dark text-white text-xs px-4 py-2 rounded-full border border-white/10 btn-active">
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe..." 
            className="flex-1 bg-domi-dark text-white px-4 py-3 rounded-xl text-sm" onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}/>
          <button onClick={() => sendMessage(input)} className="bg-blue-600 text-white px-4 rounded-xl btn-active"><Send size={20}/></button>
        </div>
      </div>
    </div>
  );
};

// === AFTER PARTY ===
const AfterParty = ({ onClose }) => {
  const [step, setStep] = useState('terms');
  const [checked, setChecked] = useState(Array(7).fill(false));
  const terminos = [
    'Tu ubicación se comparte SOLO con personas autorizadas',
    'Se actualiza en tiempo real mientras estés activo',
    'Puedes desactivar el GPS en cualquier momento',
    'DomiCoro NO se hace responsable de encuentros en persona',
    'Verifica identidad antes de reunirte',
    'Máximo 4 horas de duración',
    'Solo mayores de 18 años'
  ];

  if (step === 'terms') return (
    <div className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex items-center gap-4 p-4 border-b border-white/10">
        <button onClick={onClose} className="btn-active"><X size={24} className="text-white"/></button>
        <h2 className="text-xl font-black text-white">After Party 🎉</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3 mb-6">
          {terminos.map((t, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <div onClick={() => {
                const newChecked = [...checked];
                newChecked[i] = !newChecked[i];
                setChecked(newChecked);
              }} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${checked[i] ? 'bg-domi-red border-domi-red' : 'border-gray-600'}`}>
                {checked[i] && <span className="text-white text-xs">✓</span>}
              </div>
              <span className="text-gray-300 text-sm">{t}</span>
            </label>
          ))}
        </div>
        <button onClick={() => setStep('active')} disabled={!checked.every(c => c)}
          className={`w-full py-4 rounded-2xl font-black text-lg ${checked.every(c => c) ? 'bg-domi-red text-white btn-active' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
          ACTIVAR AFTER PARTY
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-domi-card/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-domi-red/20 rounded-full flex items-center justify-center animate-pulse">
            <MapPin size={20} className="text-domi-red"/>
          </div>
          <div>
            <h2 className="text-white font-bold">After Party Activo</h2>
            <p className="text-domi-red text-xs">4h máximo • GPS en vivo</p>
          </div>
        </div>
        <button onClick={onClose} className="bg-domi-red text-white px-4 py-2 rounded-xl text-sm font-bold btn-active">Detener</button>
      </div>
      <div className="flex-1 relative bg-domi-dark">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-32 h-32 bg-domi-red/20 rounded-full animate-ping absolute -inset-16"/>
            <div className="w-12 h-12 bg-domi-red rounded-full border-4 border-white relative z-10 flex items-center justify-center">
              <span className="text-xs font-black text-white">TÚ</span>
            </div>
          </div>
        </div>
        <div className="absolute top-[30%] left-[60%] bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold animate-bounce">
          👥 Juan P. • 120m
        </div>
      </div>
    </div>
  );
};

// === MODO JARTURA ===
const Jartura = ({ onClose }) => {
  const restaurantes = [
    { name: 'Pica Pollo El Ñato', tipo: 'Pica Pollo', rating: 4.5, tiempo: '8 min', distancia: '450m', color: 'from-yellow-600 to-orange-600' },
    { name: 'Empanadas La Dominicana', tipo: 'Empanadas', rating: 4.8, tiempo: '5 min', distancia: '200m', color: 'from-orange-500 to-red-600' },
  ];

  return (
    <div className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex items-center gap-4 p-4 border-b border-white/10 bg-domi-card/80">
        <button onClick={onClose} className="btn-active"><X size={24} className="text-white"/></button>
        <div>
          <h2 className="text-xl font-black text-white">🍗 Modo Jartura</h2>
          <p className="text-gray-400 text-xs">Comida rápida cerca de ti</p>
        </div>
      </div>
      <div className="flex gap-2 p-4 overflow-x-auto bg-domi-dark border-b border-white/10 scrollbar-hide">
        {['Todos', 'Pica Pollo', 'Empanadas', 'Pizza'].map(t => (
          <button key={t} className="px-4 py-2 rounded-full text-xs font-bold bg-orange-500 text-white">{t}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {restaurantes.map((r, i) => (
          <div key={i} className="bg-domi-card rounded-3xl overflow-hidden border border-white/10">
            <div className={`h-32 bg-gradient-to-r ${r.color} flex items-center justify-center text-6xl`}>🍗</div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-bold text-lg">{r.name}</h3>
                  <p className="text-orange-400 text-sm">{r.tipo}</p>
                </div>
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-lg text-xs font-bold">⭐ {r.rating}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                <span className="flex items-center gap-1"><Clock size={14}/> {r.tiempo}</span>
                <span className="flex items-center gap-1"><MapPin size={14}/> {r.distancia}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-domi-dark text-white py-2 rounded-xl text-sm font-bold btn-active border border-white/10">
                  <Phone size={16} className="inline mr-2"/>Llamar
                </button>
                <button className="flex-1 bg-orange-600 text-white py-2 rounded-xl text-sm font-bold btn-active">
                  <Navigation size={16} className="inline mr-2"/>Ir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// === REGALOS ===
const GiftModal = ({ onClose }) => {
  const [step, setStep] = useState('select');
  const credits = 1250;
  const regalos = [
    { id: 'cerveza', name: 'Cerveza', icon: '🍺', price: 50 },
    { id: 'whisky', name: 'Whisky', icon: '🥃', price: 150 },
    { id: 'rosa', name: 'Rosa', icon: '🌹', price: 75 },
    { id: 'corazon', name: 'Corazón', icon: '❤️', price: 100 },
    { id: 'teddy', name: 'Teddy', icon: '🧸', price: 300 },
    { id: 'diamante', name: 'Diamante', icon: '💎', price: 5000 },
  ];

  if (step === 'success') return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-domi-red rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce text-4xl">🎁</div>
        <h4 className="text-white font-black text-3xl mb-2">¡Regalo enviado!</h4>
        <p className="text-gray-400 mb-8">A Sofía M. le encantará 💝</p>
        <button onClick={onClose} className="bg-white text-black px-8 py-4 rounded-2xl font-bold btn-active">Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-end justify-center">
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} className="w-full max-w-md bg-domi-card rounded-t-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-white font-black text-xl">Enviar Regalo 🎁</h3>
            <p className="text-gray-400 text-sm">A: <span className="text-pink-400 font-bold">Sofía M.</span></p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500/20 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="text-yellow-400 font-bold">💎 {credits}</span>
            </div>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full btn-active"><X size={20} className="text-white"/></button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {regalos.map(g => (
            <button key={g.id} onClick={() => setStep('success')} 
              className="p-4 rounded-2xl border-2 border-white/10 bg-white/5 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all btn-active">
              <div className="text-3xl mb-2">{g.icon}</div>
              <p className="text-white text-xs font-bold">{g.name}</p>
              <p className="text-yellow-400 text-sm font-black">💎 {g.price}</p>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// === VIP ===
const VIPSection = ({ onClose }) => {
  const beneficios = [
    { icon: Star, text: 'Perfil destacado en búsquedas' },
    { icon: () => <span>⚡</span>, text: 'Mensajes ilimitados' },
    { icon: Heart, text: 'Ver quién te dio like' },
    { icon: Gift, text: 'Regalos exclusivos mensuales' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-domi-dark via-yellow-900/20 to-domi-dark z-50 flex flex-col">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full btn-active"><X size={24} className="text-white"/></button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200 }}
          className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
          <Crown size={64} className="text-white fill-white"/>
        </motion.div>
        <h2 className="text-4xl font-black text-white mb-2">ZONA VIP</h2>
        <p className="text-yellow-400 text-lg mb-8 font-medium">Desbloquea todo el potencial</p>
        <div className="w-full max-w-sm space-y-4 mb-8">
          {beneficios.map((b, i) => (
            <motion.div key={i} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <b.icon size={20} className="text-yellow-400"/>
              </div>
              <span className="text-white font-medium">{b.text}</span>
              <Check size={20} className="text-green-400 ml-auto"/>
            </motion.div>
          ))}
        </div>
        <button className="w-full max-w-sm bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-4 rounded-2xl font-black text-lg shadow-lg btn-active">
          UNIRSE AL VIP - $9.99/mes
        </button>
      </div>
    </motion.div>
  );
};

// === CREAR CORO ===
const CrearCoro = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState(null);
  const [maxPersonas, setMaxPersonas] = useState(5);
  const tipos = [
    { icon: Flame, label: 'Teteo', color: 'text-red-500' },
    { icon: Beer, label: 'Beber', color: 'text-yellow-500' },
    { icon: Music, label: 'Bailar', color: 'text-purple-500' },
    { icon: MapPin, label: 'Playa', color: 'text-cyan-500' },
  ];

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex items-center gap-4 p-4 border-b border-white/10">
        <button onClick={onClose} className="btn-active"><X size={24} className="text-white"/></button>
        <h2 className="text-xl font-black text-white">Crear Nuevo Coro</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Nombre del coro</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Corito de la Zona"
            className="w-full bg-domi-card border border-white/10 rounded-2xl px-4 py-4 text-white placeholder-gray-600"/>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-3 block">Tipo de coro</label>
          <div className="grid grid-cols-4 gap-3">
            {tipos.map((t, i) => (
              <button key={i} onClick={() => setTipo(i)}
                className={`p-4 rounded-2xl border-2 btn-active ${tipo === i ? 'border-domi-red bg-domi-red/20' : 'border-white/10 bg-domi-card'}`}>
                <t.icon size={24} className={`mx-auto mb-2 ${t.color}`}/>
                <span className="text-xs text-gray-300 block">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-3 block flex justify-between">
            <span>Máximo de personas</span>
            <span className="text-domi-red font-bold">{maxPersonas}</span>
          </label>
          <input type="range" min="2" max="15" value={maxPersonas} onChange={(e) => setMaxPersonas(parseInt(e.target.value))}
            className="w-full h-2 bg-domi-card rounded-lg appearance-none cursor-pointer accent-domi-red"/>
        </div>
      </div>
      <div className="p-6 border-t border-white/10 bg-domi-card/50">
        <button disabled={!nombre || tipo === null}
          className={`w-full py-4 rounded-2xl font-black text-lg ${nombre && tipo !== null ? 'bg-domi-red text-white btn-active' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
          CREAR CORO
        </button>
      </div>
    </motion.div>
  );
};

// === DOMI TV ===
const DomiTV = ({ onClose }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="w-32 h-32 bg-gradient-to-br from-domi-red to-domi-blue rounded-3xl flex items-center justify-center mb-8">
        <Tv size={64} className="text-white"/>
      </motion.div>
      <h2 className="text-3xl font-black text-white mb-2">DomiTV</h2>
      <p className="text-gray-400 text-center mb-8 flex items-center gap-2">
        <span className="w-2 h-2 bg-domi-red rounded-full animate-pulse"/> SINTONIZANDO: 75 GRADOS
      </p>
      <div className="w-64 h-2 bg-domi-card rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-domi-red to-domi-blue" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }}/>
      </div>
      <button onClick={onClose} className="absolute top-4 right-4 p-3 bg-white/10 rounded-full btn-active">
        <span className="text-white text-xl">✕</span>
      </button>
    </motion.div>
  );
};

// === PERFIL ===
const Perfil = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const menuItems = [
    { icon: Settings, label: 'Configuración', color: 'text-gray-400' },
    { icon: HelpCircle, label: 'Ayuda', color: 'text-green-400' },
  ];

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="relative h-48 bg-gradient-to-b from-domi-blue/30 to-domi-dark">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 rounded-full btn-active">
          <X size={24} className="text-white"/>
        </button>
      </div>
      <div className="px-6 -mt-16 mb-6">
        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-pink-500 to-domi-red p-1">
          <div className="w-full h-full rounded-full bg-domi-dark flex items-center justify-center text-5xl">
            👤
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mt-4 mb-1">Tu Perfil</h2>
        <p className="text-gray-400 text-sm flex items-center gap-1"><MapPin size={14}/> Santo Domingo, RD</p>
      </div>
      <div className="px-6 mb-6">
        <div className="bg-domi-card rounded-2xl p-4 flex justify-around border border-white/10">
          {[
            { icon: Users, value: '12', label: 'Coros', color: 'text-domi-red' },
            { icon: Heart, value: '48', label: 'Matches', color: 'text-pink-500' },
            { icon: Flame, value: '156', label: 'Likes', color: 'text-orange-500' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={20} className={`mx-auto mb-1 ${stat.color}`}/>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 px-6">
        <div className="flex gap-2 bg-domi-card p-1 rounded-xl mb-4">
          {['posts', 'photos', 'videos'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold ${activeTab === tab ? 'bg-domi-red text-white' : 'text-gray-400'}`}>
              {tab === 'posts' ? 'Publicaciones' : tab === 'photos' ? 'Fotos' : 'Videos'}
            </button>
          ))}
        </div>
        {activeTab === 'posts' && (
          <div className="space-y-3">
            {menuItems.map((item, i) => (
              <button key={i} className="w-full bg-domi-card p-4 rounded-2xl flex items-center gap-4 btn-active border border-white/5">
                <div className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon size={20}/>
                </div>
                <span className="text-white font-medium flex-1 text-left">{item.label}</span>
                <ChevronRight size={20} className="text-gray-600"/>
              </button>
            ))}
          </div>
        )}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square bg-domi-card rounded-xl flex items-center justify-center text-2xl">📷</div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// === APP PRINCIPAL ===
export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');
  const [modals, setModals] = useState({
    mapa: false, fantasma: false, chat: false, afterParty: false,
    jartura: false, gift: false, vip: false, crear: false, tv: false, perfil: false
  });

  const toggleModal = (name) => setModals(prev => ({ ...prev, [name]: !prev[name] }));

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;

  return (
    <div className="bg-domi-dark min-h-screen text-white font-sans pb-24">
      <AnimatePresence>
        {modals.mapa && <MapaRD onClose={() => toggleModal('mapa')} />}
        {modals.fantasma && <ModoFantasma onClose={() => toggleModal('fantasma')} />}
        {modals.chat && <ChatConFrases onClose={() => toggleModal('chat')} />}
        {modals.afterParty && <AfterParty onClose={() => toggleModal('afterParty')} />}
        {modals.jartura && <Jartura onClose={() => toggleModal('jartura')} />}
        {modals.gift && <GiftModal onClose={() => toggleModal('gift')} />}
        {modals.vip && <VIPSection onClose={() => toggleModal('vip')} />}
        {modals.crear && <CrearCoro onClose={() => toggleModal('crear')} />}
        {modals.tv && <DomiTV onClose={() => toggleModal('tv')} />}
        {modals.perfil && <Perfil onClose={() => toggleModal('perfil')} />}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black/80 backdrop-blur-lg sticky top-0 z-40">
        <h1 className="text-2xl font-black italic bg-gradient-to-r from-domi-red via-white to-domi-blue bg-clip-text text-transparent">
          DomiCoro
        </h1>
        <div className="flex gap-2">
          <button onClick={() => toggleModal('mapa')} className="p-2 bg-white/10 rounded-full btn-active hover:bg-white/20">
            <MapPin size={20} className="text-white"/>
          </button>
          <button onClick={() => toggleModal('chat')} className="p-2 bg-white/10 rounded-full relative btn-active hover:bg-white/20">
            <MessageCircle size={20} className="text-white"/>
            <span className="absolute top-0 right-0 w-3 h-3 bg-domi-red rounded-full border-2 border-black animate-pulse"/>
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-6">
        {/* Estados */}
        <section>
          <h3 className="text-xs font-black text-gray-500 mb-3 uppercase tracking-widest">Estados del Coro</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {['Tú', 'Sofía', 'Javier', 'Elena', 'Luis', 'Ana', 'Carlos'].map((name, i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer" onClick={() => name === 'Tú' ? toggleModal('perfil') : toggleModal('chat')}>
                <div className={`w-16 h-16 rounded-full p-[2px] ${i === 0 ? 'border-2 border-dashed border-gray-600 hover:border-domi-red' : 'bg-gradient-to-tr from-pink-500 to-domi-red'}`}>
                  <div className="w-full h-full rounded-full bg-domi-dark p-[2px]">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-lg font-bold">
                      {name[0]}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] mt-1 text-gray-300 font-medium">{name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Card principal */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Coros Futuros</h3>
            <button onClick={() => toggleModal('crear')} className="w-8 h-8 bg-domi-red rounded-full flex items-center justify-center btn-active">
              <Plus size={16} className="text-white"/>
            </button>
          </div>
          <div className="relative bg-domi-card rounded-3xl overflow-hidden mb-6 aspect-[3/4] shadow-2xl border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10"/>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-8xl opacity-50">👤</div>
            <button onClick={() => toggleModal('gift')} className="absolute top-4 right-4 z-20 p-3 bg-black/40 backdrop-blur-md rounded-full btn-active border border-white/10">
              <Gift size={20} className="text-white"/>
            </button>
            <div className="absolute bottom-0 w-full p-6 z-20">
              <h2 className="text-4xl font-black text-white mb-2">Corista-162</h2>
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <MapPin size={16} className="text-domi-red"/>
                <span className="text-sm font-bold">Santo Domingo</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['🔥 Teteo', '🍻 Beber', '💃 Bailar'].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-domi-red/20 text-domi-red border border-white/5">{tag}</span>
                ))}
              </div>
              <div className="flex justify-center gap-6">
                <button className="w-14 h-14 bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-full text-red-500 flex items-center justify-center btn-active hover:bg-red-500/20">
                  <span className="text-2xl">✕</span>
                </button>
                <button className="w-14 h-14 bg-black/60 backdrop-blur-md border-2 border-green-500/50 rounded-full text-green-500 flex items-center justify-center btn-active hover:bg-green-500/20">
                  <Flame size={28} fill="currentColor"/>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="grid grid-cols-2 gap-4">
          <button onClick={() => toggleModal('afterParty')} className="group bg-domi-red/10 border border-domi-red/30 p-5 rounded-3xl text-left btn-active hover:bg-domi-red/20">
            <div className="w-12 h-12 bg-domi-red/20 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MapPin size={24} className="text-domi-red"/>
            </div>
            <p className="text-white font-bold text-lg">After Party</p>
            <p className="text-domi-red text-xs font-medium">Compartir ubicación</p>
          </button>
          <button onClick={() => toggleModal('jartura')} className="group bg-orange-600/10 border border-orange-500/30 p-5 rounded-3xl text-left btn-active hover:bg-orange-600/20">
            <div className="w-12 h-12 bg-orange-600/20 rounded-2xl flex items-center justify-center mb-3 text-2xl group-hover:scale-110 transition-transform">
              🍗
            </div>
            <p className="text-white font-bold text-lg">Modo Jartura</p>
            <p className="text-orange-400 text-xs font-medium">Comida cercana</p>
          </button>
        </section>
      </div>

      {/* Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center pb-safe pt-2 z-40 px-1">
        <button onClick={() => toggleModal('crear')} className="flex flex-col items-center gap-1 w-14 py-2 text-gray-600 hover:text-domi-blue transition-colors btn-active">
          <Plus size={22} />
          <span className="text-[9px] font-black uppercase">Crear</span>
        </button>
        <button onClick={() => toggleModal('tv')} className="flex flex-col items-center gap-1 w-14 py-2 text-gray-600 hover:text-gray-400 transition-colors btn-active">
          <Tv size={22} />
          <span className="text-[9px] font-black uppercase">TV</span>
        </button>
        <button onClick={() => setActiveTab('feed')} className={`flex flex-col items-center gap-1 w-14 py-2 transition-colors btn-active ${activeTab === 'feed' ? 'text-domi-red' : 'text-gray-600 hover:text-domi-red/70'}`}>
          <Grid size={22} strokeWidth={activeTab === 'feed' ? 3 : 2} />
          <span className="text-[9px] font-black uppercase">Coro</span>
        </button>
        <button onClick={() => toggleModal('jartura')} className="flex flex-col items-center gap-1 w-14 py-2 text-gray-600 hover:text-orange-500 transition-colors btn-active">
          <span className="text-xl">🍗</span>
          <span className="text-[9px] font-black uppercase text-orange-400">Jartura</span>
        </button>
        <button onClick={() => toggleModal('vip')} className="flex flex-col items-center gap-1 w-14 py-2 text-gray-600 hover:text-yellow-400 transition-colors btn-active">
          <Crown size={22} />
          <span className="text-[9px] font-black uppercase text-yellow-400">VIP</span>
        </button>
        <button onClick={() => toggleModal('fantasma')} className="flex flex-col items-center gap-1 w-14 py-2 text-gray-600 hover:text-green-400 transition-colors btn-active">
          <Ghost size={22} />
          <span className="text-[9px] font-black uppercase text-green-400">Fantasma</span>
        </button>
        <button onClick={() => toggleModal('perfil')} className={`flex flex-col items-center gap-1 w-14 py-2 transition-colors btn-active ${activeTab === 'profile' ? 'text-blue-500' : 'text-gray-600 hover:text-blue-400'}`}>
          <User size={22} />
          <span className="text-[9px] font-black uppercase">Yo</span>
        </button>
      </div>
    </div>
  );
}
