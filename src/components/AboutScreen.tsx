import { motion } from 'motion/react';
import { Info, Code2, MessageCircle, User, Users, Quote } from 'lucide-react';

export function AboutScreen() {
  return (
    <div className="p-6 pt-12 flex flex-col items-center w-full min-h-[80vh]">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        className="flex flex-col items-center justify-center w-full flex-1 mb-10"
      >
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: "spring" } } }} className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-[0_10px_40px_rgba(37,211,102,0.4)] relative">
          <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20"></div>
          <MessageCircle className="w-12 h-12 text-white relative z-10" />
        </motion.div>
        
        <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-3xl font-display font-bold text-text mb-2">WA Quick</motion.h2>
        <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-primary tracking-widest text-xs uppercase mb-8 font-bold bg-primary/10 px-4 py-1.5 rounded-full">Version 1.0.0</motion.p>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="w-full bg-surface border border-border rounded-3xl p-6 shadow-xl backdrop-blur-md mb-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:scale-110 transform">
             <Quote className="w-32 h-32" />
           </div>
           
           <div className="flex items-center gap-4 mb-6 relative z-10">
             <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
               <User className="w-7 h-7" />
             </div>
             <div>
               <h3 className="font-display font-bold text-text text-xl">Syed Zeeshan</h3>
               <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">CEO & Founder — Mafia Developer</p>
             </div>
           </div>
           
           <div className="relative z-10">
             <p className="text-muted text-sm leading-relaxed mb-4">
               Syed Zeeshan is a visionary developer, designer, and entrepreneur. He founded <strong className="text-text font-medium">Mafia Developer</strong> with one mission — to build smart, clean, and purposeful digital products that make everyday life easier.
             </p>
             <p className="text-muted text-sm leading-relaxed mb-6">
               <strong className="text-text font-medium">WA Quick</strong> is one of his creations, born from the idea that technology should be fast, simple, and frustration-free.
             </p>
             <div className="border-l-2 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg">
               <p className="text-text font-display italic font-medium leading-relaxed">"Build less. Impact more."</p>
             </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
