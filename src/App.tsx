import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from './hooks/useSettings';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'settings'>('home');
  const { settings } = useSettings(); // Initializes theme class automatically

  return (
    <div className="bg-bg min-h-screen text-text font-sans flex justify-center w-full transition-colors duration-300">
      <div className="w-full max-w-md bg-bg relative min-h-[100dvh] overflow-hidden flex flex-col md:border-x md:border-border transition-colors duration-300 shadow-[0_0_80px_-20px_rgba(37,211,102,0.15)] shadow-primary/20">
        <div className="flex-1 overflow-y-auto pb-24 relative z-10 w-full h-full pt-6">
          <AnimatePresence mode="wait">
             {currentTab === 'home' && (
               <motion.div key="home" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="h-full">
                 <HomeScreen />
               </motion.div>
             )}
             {currentTab === 'settings' && (
               <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="h-full">
                 <SettingsScreen />
               </motion.div>
             )}
          </AnimatePresence>
        </div>
        <BottomNavigation currentTab={currentTab} onChange={setCurrentTab} />
      </div>
    </div>
  );
}
