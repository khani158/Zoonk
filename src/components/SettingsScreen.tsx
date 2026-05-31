import { motion } from 'motion/react';
import { Moon, Sun, MonitorSmartphone, Globe, Quote, User, Info, Code2, Users, Bell } from 'lucide-react';
import { useSettings, AppSelection } from '../hooks/useSettings';

export function SettingsScreen() {
  const { settings, updateSettings } = useSettings();

  const handleAppSelection = (app: AppSelection) => {
    updateSettings({ defaultApp: app });
  };

  return (
    <div className="p-6 pt-6 flex flex-col items-center w-full min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-6"
      >
        <h2 className="text-3xl font-display font-bold text-text mb-2">Settings</h2>
        <p className="text-muted text-sm tracking-wide font-medium">Manage your preferences</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full space-y-6 flex-1"
      >
        {/* Appearance Section */}
        <div className="w-full bg-surface border border-border rounded-3xl p-5 shadow-sm">
           <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 ml-1">Appearance</h3>
           
           <div className="flex items-center justify-between p-3 rounded-2xl bg-bg border border-border mb-3">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {settings.theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                 </div>
                 <div>
                    <p className="font-bold text-text text-sm">Theme</p>
                    <p className="text-xs text-muted">{settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                 </div>
              </div>
              <button 
                onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
                className="w-12 h-7 bg-bg border border-primary rounded-full relative transition-colors focus:outline-none"
              >
                  <motion.div 
                     layout
                     animate={{ x: settings.theme === 'dark' ? 22 : 4 }}
                     className="w-5 h-5 bg-primary rounded-full absolute top-0.5 shadow-md"
                  />
              </button>
           </div>
        </div>

        {/* Behavior Section */}
        <div className="w-full bg-surface border border-border rounded-3xl p-5 shadow-sm">
           <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 ml-1">Behavior</h3>
                      <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-bg border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <MonitorSmartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-text text-sm">WhatsApp App</p>
                    <p className="text-xs text-muted">{settings.defaultApp === 'ask' ? 'Ask Before Opening' : settings.defaultApp === 'whatsapp' ? 'WhatsApp Messenger' : 'WhatsApp Business'}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleAppSelection('ask')}
                  disabled={settings.defaultApp === 'ask'}
                  className="px-4 py-2 bg-surface text-xs font-bold rounded-lg border border-border text-text hover:bg-primary/5 hover:border-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-bg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-text text-sm">Language</p>
                    <p className="text-xs text-muted">App interface language</p>
                  </div>
                </div>
                <select 
                  className="bg-surface border border-border text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-text appearance-none cursor-not-allowed opacity-70"
                  value={settings.language}
                  disabled
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
           </div>
        </div>

        {/* About Section */}
        <div className="w-full bg-surface border border-border rounded-3xl p-5 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Quote className="w-32 h-32" />
           </div>
           <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 ml-1 relative z-10">About Developer</h3>

           <div className="flex items-center gap-4 mb-5 relative z-10">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
               <User className="w-6 h-6" />
             </div>
             <div>
               <h4 className="font-display font-bold text-text text-lg">Syed Zeeshan</h4>
               <p className="text-primary text-[9px] font-bold uppercase tracking-widest mt-0.5">CEO & Founder — Mafia Developer</p>
             </div>
           </div>
           
           <div className="relative z-10 space-y-3">
             <p className="text-muted text-xs leading-relaxed">
               Syed Zeeshan is a visionary developer, designer, and entrepreneur. He founded <strong className="text-text font-medium">Mafia Developer</strong> with one mission — to build smart, clean, and purposeful digital products that make everyday life easier.
             </p>
             <p className="text-muted text-xs leading-relaxed">
               <strong className="text-text font-medium">WA Quick</strong> is one of his creations, born from the idea that technology should be fast, simple, and frustration-free.
             </p>
             <div className="border-l-2 border-primary pl-3 py-1.5 bg-primary/5 rounded-r-lg mt-2">
               <p className="text-text font-display italic font-medium text-sm leading-relaxed">"Build less. Impact more."</p>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
