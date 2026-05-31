import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Briefcase, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (app: 'whatsapp' | 'business', remember: boolean) => void;
}

export function AppSelectorModal({ isOpen, onClose, onSelect }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 inset-x-0 w-full max-w-md mx-auto bg-surface border-t border-border rounded-t-[32px] p-6 z-50 shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6" />
            
            <h3 className="text-xl font-display font-bold text-text mb-2text-center">Choose App</h3>
            <p className="text-muted text-sm mb-6 text-center">Which WhatsApp do you want to use?</p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => onSelect('whatsapp', false)}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-border bg-bg hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-text">WhatsApp Messenger</h4>
                    <p className="text-xs text-muted">Standard account</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelect('business', false)}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-border bg-bg hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1EA1F2]/10 text-[#1EA1F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 fill-current" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-text">WhatsApp Business</h4>
                    <p className="text-xs text-muted">Business account</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex gap-3">
               <button
                  onClick={() => onSelect('whatsapp', true)}
                  className="flex-1 py-3 px-4 bg-bg border border-border rounded-xl text-xs font-bold text-muted hover:text-text transition-colors flex items-center justify-center gap-2"
               >
                 <CheckCircle2 className="w-4 h-4" /> Remember choice
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
