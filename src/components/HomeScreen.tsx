import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Send, Trash2, ChevronDown, History, MessageCircle, AlertCircle } from 'lucide-react';
import { countries } from '../lib/countryCodes';
import { useRecentNumbers, RecentNumber } from '../hooks/useRecentNumbers';
import { useSettings, AppSelection } from '../hooks/useSettings';
import { AppSelectorModal } from './AppSelectorModal';

const RecentItem: React.FC<{ item: RecentNumber, onDelete: () => void, onLaunch: () => void }> = ({ item, onDelete, onLaunch }) => {
  const triggerHaptic = () => { if (navigator.vibrate) navigator.vibrate(50); };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
      className="relative group w-full mb-3"
    >
      <motion.div
         drag="x"
         dragConstraints={{ left: -70, right: 0 }}
         dragElastic={0.1}
         onDragEnd={(e, info) => {
           if (info.offset.x < -40) {
             triggerHaptic();
             onDelete();
           }
         }}
         className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-between shadow-sm relative z-10 w-full active:scale-[0.98] transition-all hover:shadow-md hover:border-primary/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <MessageCircle className="w-5 h-5 fill-current opacity-20 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
             <span className="text-[10px] text-muted font-bold uppercase tracking-widest mb-0.5">Recent Contact</span>
             <span className="text-lg font-display font-bold tracking-wide text-text">{item.code} {item.number}</span>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerHaptic(); onLaunch(); }}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 hover:scale-105 transition-transform"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </motion.div>
      <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-end pr-5 bg-red-500 rounded-2xl z-0 shadow-inner">
         <Trash2 className="w-5 h-5 text-white" />
      </div>
    </motion.div>
  );
}

export function HomeScreen() {
  const [code, setCode] = useState('+92');
  const [number, setNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const { recents, addRecent, removeRecent } = useRecentNumbers();
  const { settings, updateSettings } = useSettings();

  // Clear error when typing
  useEffect(() => {
    if (error) setError(null);
  }, [number, code]);

  const validateNumber = (n: string) => {
    const cleanNumber = n.replace(/\D/g, '');
    if (cleanNumber.length < 7) {
      setError("This number is not registered on WhatsApp.");
      return false;
    }
    return true;
  };

  const executeLaunch = (c: string, n: string, app: 'whatsapp' | 'business') => {
    if (navigator.vibrate) navigator.vibrate(50);
    const cleanNumber = n.replace(/\D/g, '');
    const cleanCode = c.replace(/\D/g, '');
    const fullNumber = `${cleanCode}${cleanNumber}`;
    addRecent(c, n);

    const isAndroid = /android/i.test(navigator.userAgent || navigator.vendor || (window as any).opera);
    
    if (isAndroid) {
      const pkg = app === 'business' ? 'com.whatsapp.w4b' : 'com.whatsapp';
      window.location.href = `intent://send?phone=${fullNumber}#Intent;package=${pkg};scheme=whatsapp;end;`;
    } else {
      window.open(`https://wa.me/${fullNumber}`, '_blank');
    }
  };

  const handleLaunchRequest = (c: string, n: string) => {
    if (!n.trim()) return;
    if (!validateNumber(n)) return;

    if (settings.defaultApp === 'ask') {
      setShowModal(true);
    } else {
      executeLaunch(c, n, settings.defaultApp as 'whatsapp' | 'business');
    }
  };

  const handleMainLaunch = () => handleLaunchRequest(code, number);

  const onModalSelect = (app: 'whatsapp' | 'business', remember: boolean) => {
    setShowModal(false);
    if (remember) {
      updateSettings({ defaultApp: app });
    }
    executeLaunch(code, number, app);
  };

  return (
    <div className="p-6 pt-6 flex flex-col items-center">
      <AppSelectorModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSelect={onModalSelect}
      />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full mb-8">
        <h2 className="text-3xl font-display font-bold text-text mb-2">New Chat</h2>
        <p className="text-muted text-sm tracking-wide font-medium">Direct message without saving contact</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className={`w-full bg-surface border rounded-3xl p-6 shadow-xl backdrop-blur-md mb-8 relative overflow-hidden transition-all duration-300 ${isFocused ? 'border-primary/50 shadow-[0_10px_30px_rgba(37,211,102,0.15)]' : error ? 'border-red-500/50 shadow-[0_10px_30px_rgba(239,68,68,0.1)]' : 'border-border'}`}>
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 transition-opacity duration-500 ${isFocused && !error ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 transition-opacity duration-500 ${error ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="flex justify-between items-end mb-4 block ml-1">
          <label className="text-[11px] font-bold text-muted uppercase tracking-widest transition-colors duration-300">Phone Number</label>
        </div>
        
        <div className="flex gap-3 mb-2 relative z-10">
           <div className="relative w-[35%] group">
             <select 
               value={code} 
               onChange={(e) => setCode(e.target.value)}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               className={`w-full bg-bg border rounded-2xl h-14 pl-4 pr-8 appearance-none text-text text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner hover:border-primary/30 ${error ? 'border-red-500/50 focus:ring-red-500/50' : 'border-border focus:border-primary'}`}
             >
               {countries.map(c => (
                 <option key={c.code + c.name} value={c.code}>{c.flag} {c.code}</option>
               ))}
             </select>
             <ChevronDown className="w-4 h-4 absolute right-3 top-5 text-muted pointer-events-none group-hover:text-text transition-colors" />
           </div>
           
           <div className="relative flex-1">
             <input
               type="tel"
               value={number}
               onChange={(e) => setNumber(e.target.value)}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               placeholder="300 1234567"
               className={`w-full bg-bg border rounded-2xl h-14 px-4 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 transition-all font-display text-lg font-bold shadow-inner hover:border-primary/30 ${error ? 'border-red-500/50 focus:ring-red-500/50' : 'border-border focus:ring-primary/50 focus:border-primary'}`}
             />
           </div>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
               initial={{ opacity: 0, height: 0 }} 
               animate={{ opacity: 1, height: 'auto', marginBottom: 16 }} 
               exit={{ opacity: 0, height: 0, marginBottom: 0 }}
               className="flex items-center gap-2 overflow-hidden mt-2"
            >
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-red-500 text-xs font-medium">{error}</p>
            </motion.div>
          )}
          {!error && <div className="mb-6"></div>}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleMainLaunch}
          disabled={!number.trim()}
          className="w-full h-14 bg-primary text-white font-bold font-display tracking-wider rounded-2xl flex items-center justify-center gap-3 hover:bg-primary-hover transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(37,211,102,0.3)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          <Phone className="w-5 h-5 fill-current relative z-10" />
          <span className="text-[15px] relative z-10">Open WhatsApp</span>
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full">
        <div className="flex items-center justify-between mb-5 px-1">
           <div className="flex items-center gap-2">
             <History className="w-4 h-4 text-primary" />
             <h3 className="font-display font-bold text-text tracking-wide text-lg">History</h3>
           </div>
        </div>
        
        <div className="w-full">
          {recents.length === 0 ? (
            <div className="border border-border rounded-3xl p-10 flex flex-col items-center justify-center bg-surface/50 border-dashed mt-2">
               <div className="w-12 h-12 bg-bg rounded-full flex items-center justify-center mb-4">
                 <History className="w-6 h-6 text-muted" />
               </div>
               <p className="text-muted text-sm text-center font-medium">No recent chats to display.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {recents.map(r => (
                 <RecentItem 
                   key={r.id} 
                   item={r} 
                   onDelete={() => removeRecent(r.id)} 
                   onLaunch={() => handleLaunchRequest(r.code, r.number)}
                 />
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}
