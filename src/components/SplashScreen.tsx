import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-[0_10px_40px_rgba(37,211,102,0.4)]">
          <MessageCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-display font-bold text-text tracking-tight mb-2">WA Quick</h1>
        <p className="text-muted tracking-widest text-sm uppercase font-medium">Connect Instantly</p>
      </motion.div>
    </motion.div>
  );
}
