import { useState, useEffect } from 'react';

export interface RecentNumber {
  id: string;
  code: string;
  number: string;
  timestamp: number;
}

export function useRecentNumbers() {
  const [recents, setRecents] = useState<RecentNumber[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wa_quick_recents');
    if (stored) {
      try {
        setRecents(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recent numbers', e);
      }
    }
  }, []);

  const addRecent = (code: string, number: string) => {
    const newRecent: RecentNumber = {
      id: Date.now().toString(),
      code,
      number,
      timestamp: Date.now()
    };
    
    // Remove if exactly the same number already exists to avoid duplicates
    const filtered = recents.filter(r => !(r.code === code && r.number === number));
    
    // Keep only the last 5
    const newRecents = [newRecent, ...filtered].slice(0, 5);
    
    setRecents(newRecents);
    localStorage.setItem('wa_quick_recents', JSON.stringify(newRecents));
  };

  const removeRecent = (id: string) => {
    const newRecents = recents.filter(r => r.id !== id);
    setRecents(newRecents);
    localStorage.setItem('wa_quick_recents', JSON.stringify(newRecents));
  };

  return { recents, addRecent, removeRecent };
}
