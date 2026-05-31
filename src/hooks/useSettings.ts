import { useState, useEffect } from 'react';

export type ThemeType = 'dark' | 'light';
export type AppSelection = 'ask' | 'whatsapp' | 'business';

export interface AppSettings {
  theme: ThemeType;
  defaultApp: AppSelection;
  language: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  defaultApp: 'ask',
  language: 'English',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('wa_quick_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial };
      localStorage.setItem('wa_quick_settings', JSON.stringify(next));
      if (partial.theme) {
        if (partial.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  };

  // Sync initial theme
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return { settings, updateSettings };
}
