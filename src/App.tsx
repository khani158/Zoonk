import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { AboutScreen } from './components/AboutScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState<'home' | 'about'>('home');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="bg-bg min-h-screen text-text font-sans flex justify-center w-full transition-colors duration-300">
      <div className="w-full max-w-md bg-bg relative min-h-[100dvh] overflow-hidden flex flex-col md:border-x md:border-border transition-colors duration-300 shadow-[0_0_80px_-20px_rgba(37,211,102,0.15)] shadow-primary/20">
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <>
            <div className="absolute top-0 right-0 p-6 z-50">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text shadow-xl"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-24 relative z-10 w-full h-full pt-10">
              <AnimatePresence mode="wait">
                 {currentTab === 'home' && (
                   <motion.div key="home" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="h-full">
                     <HomeScreen />
                   </motion.div>
                 )}
                 {currentTab === 'about' && (
                   <motion.div key="about" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full">
                     <AboutScreen />
                   </motion.div>
                 )}
              </AnimatePresence>
            </div>
            <BottomNavigation currentTab={currentTab} onChange={setCurrentTab} />
          </>
        )}
      </div>
    </div>
  );
}
