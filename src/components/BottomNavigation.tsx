import { Home, Info } from 'lucide-react';
import { motion } from 'motion/react';

export function BottomNavigation({ currentTab, onChange }: { currentTab: 'home' | 'about', onChange: (t: 'home' | 'about') => void }) {
  return (
    <div className="absolute bottom-0 inset-x-0 h-24 bg-surface/80 backdrop-blur-2xl border-t border-border flex items-center justify-around px-6 z-40 pb-4">
      <NavItem 
        active={currentTab === 'home'} 
        icon={<Home className="w-6 h-6" />} 
        label="Home" 
        onClick={() => onChange('home')} 
      />
      <NavItem 
        active={currentTab === 'about'} 
        icon={<Info className="w-6 h-6" />} 
        label="About" 
        onClick={() => onChange('about')} 
      />
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-20 h-full relative transition-colors ${active ? 'text-primary' : 'text-muted hover:text-text'}`}
    >
      {active && (
        <motion.div layoutId="nav-indicator" className="absolute top-0 w-12 h-1 bg-primary rounded-b-full shadow-[0_4px_12px_rgba(37,211,102,0.6)]" />
      )}
      <div className={`mb-1.5 transition-transform duration-300 ${active ? '-translate-y-1' : ''}`}>
        {icon}
      </div>
      <span className={`text-[11px] font-bold tracking-wide transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}>
        {label}
      </span>
    </button>
  );
}
