import { useState, useEffect } from 'react';
import { checkUserExists } from '../services/userService';

// Key for storing registration state in localStorage
const REGISTRATION_KEY = 'magazinepro_registered_users';

export function useUserRegistration(telegramId: number | null) {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkRegistration() {
      if (!telegramId) {
        setIsLoading(false);
        return;
      }

      try {
        // First check localStorage
        const registeredUsers = JSON.parse(localStorage.getItem(REGISTRATION_KEY) || '[]');
        if (registeredUsers.includes(telegramId)) {
          setIsRegistered(true);
          setIsLoading(false);
          return;
        }

        // If not in localStorage, check with API
        const exists = await checkUserExists(telegramId);
        if (exists) {
          // Add to localStorage if registered
          localStorage.setItem(
            REGISTRATION_KEY,
            JSON.stringify([...registeredUsers, telegramId])
          );
        }
        setIsRegistered(exists);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to check registration');
        // Fallback to localStorage on API error
        const registeredUsers = JSON.parse(localStorage.getItem(REGISTRATION_KEY) || '[]');
        setIsRegistered(registeredUsers.includes(telegramId));
      } finally {
        setIsLoading(false);
      }
    }

    checkRegistration();
  }, [telegramId]);

  // Function to mark user as registered
  const markAsRegistered = (userId: number) => {
    const registeredUsers = JSON.parse(localStorage.getItem(REGISTRATION_KEY) || '[]');
    if (!registeredUsers.includes(userId)) {
      localStorage.setItem(
        REGISTRATION_KEY,
        JSON.stringify([...registeredUsers, userId])
      );
    }
    setIsRegistered(true);
  };

  return { isRegistered, isLoading, error, markAsRegistered };
}