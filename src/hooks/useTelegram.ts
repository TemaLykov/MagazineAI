import { useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        close: () => void;
        expand: () => void;
        initDataUnsafe: {
          user?: TelegramUser;
          theme_params?: {
            bg_color: string;
            text_color: string;
            hint_color: string;
            button_color: string;
            button_text_color: string;
          };
        };
        colorScheme: 'light' | 'dark';
      };
    };
  }
}

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if running in Telegram environment
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Initialize Telegram WebApp
      tg.ready();
      tg.expand();

      // Set user data if available
      if (tg.initDataUnsafe.user) {
        setUser(tg.initDataUnsafe.user);
        
        // Set language based on user's Telegram settings
        if (tg.initDataUnsafe.user.language_code) {
          setLanguage(tg.initDataUnsafe.user.language_code.startsWith('ru') ? 'ru' : 'en');
        }
      }

      // Set theme based on Telegram's color scheme
      setIsDark(tg.colorScheme === 'dark');
    } else {
      // Create anonymous user if not in Telegram
      setUser({
        id: Math.floor(Math.random() * 1000000), // Generate random ID for anonymous users
        first_name: 'Anonymous',
      });
    }
    
    setIsInitialized(true);
  }, []);

  return {
    user,
    isDark,
    setIsDark,
    language,
    setLanguage,
    isInitialized
  };
}