import { useState, useEffect } from 'react';

// Hook personalizzato per gestire localStorage con TypeScript
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State per memorizzare il valore
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Ottieni dal localStorage
      const item = window.localStorage.getItem(key);
      // Parsifica il JSON o ritorna il valore iniziale
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se errore, ritorna il valore iniziale
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Funzione per impostare il valore
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permetti alla funzione di sovrascrivere lo stato
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salva nello state
      setStoredValue(valueToStore);
      // Salva nel localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Rimuovi dal localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

// Hook per gestire la sessione utente
export function useSession() {
  const [sessionId, setSessionId, removeSessionId] = useLocalStorage<string | null>('medagent_session_id', null);
  const [userProfile, setUserProfile, removeUserProfile] = useLocalStorage<any>('medagent_user_profile', null);

  const clearSession = () => {
    removeSessionId();
    removeUserProfile();
  };

  useEffect(() => {
    // Genera un nuovo session ID se non esiste
    if (!sessionId) {
      const newSessionId = crypto.randomUUID();
      setSessionId(newSessionId);
    }
  }, [sessionId, setSessionId]);

  return {
    sessionId,
    userProfile,
    setUserProfile,
    clearSession,
    isSessionActive: !!sessionId
  };
}

// Hook per gestire la cronologia chat
export function useChatHistory() {
  const [messages, setMessages, clearMessages] = useLocalStorage<any[]>('medagent_chat_history', []);

  const addMessage = (message: any) => {
    setMessages(prev => [...prev, { ...message, timestamp: new Date().toISOString() }]);
  };

  const clearHistory = () => {
    clearMessages();
  };

  return {
    messages,
    addMessage,
    clearHistory,
    messageCount: messages.length
  };
}