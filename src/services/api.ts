import axios from 'axios';
import { UserProfile, ChatMessage, ChatSession, ApiResponse, HealthCheckResponse } from '../types';

// Configurazione axios con base URL e timeout
const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor per gestione errori globale
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Session Management
export const sessionAPI = {
  createSession: async (): Promise<ApiResponse<ChatSession>> => {
    const response = await api.post('/chat/session');
    return response.data;
  },
  
  getSession: async (sessionId: string): Promise<ApiResponse<ChatSession>> => {
    const response = await api.get(`/chat/session/${sessionId}`);
    return response.data;
  },
  
  closeSession: async (sessionId: string): Promise<ApiResponse<void>> => {
    const response = await api.post(`/chat/close/${sessionId}`);
    return response.data;
  },
  
  getSessionSummary: async (sessionId: string): Promise<ApiResponse<any>> => {
    const response = await api.get(`/chat/summary/${sessionId}`);
    return response.data;
  }
};

// User Profile Management
export const profileAPI = {
  createProfile: async (sessionId: string, profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    const response = await api.post(`/chat/profile/${sessionId}`, profile);
    return response.data;
  },
  
  getProfile: async (sessionId: string): Promise<ApiResponse<UserProfile>> => {
    const response = await api.get(`/chat/profile/${sessionId}`);
    return response.data;
  }
};

// Chat Management
export const chatAPI = {
  sendWelcomeMessage: async (sessionId: string): Promise<ApiResponse<ChatMessage>> => {
    const response = await api.post(`/chat/welcome/${sessionId}`);
    return response.data;
  },
  
  sendMessage: async (sessionId: string, message: string): Promise<ApiResponse<ChatMessage>> => {
    const response = await api.post('/chat/message', {
      session_id: sessionId,
      message: message
    });
    return response.data;
  },
  
  getChatHistory: async (sessionId: string): Promise<ApiResponse<ChatMessage[]>> => {
    const response = await api.get(`/chat/history/${sessionId}`);
    return response.data;
  }
};

// System APIs
export const systemAPI = {
  healthCheck: async (): Promise<ApiResponse<HealthCheckResponse>> => {
    const response = await api.get('/health');
    return response.data;
  },
  
  getStatus: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/');
    return response.data;
  }
};

// Gemini AI Service (Fallback locale)
export const geminiAPI = {
  generateResponse: async (prompt: string, context?: any): Promise<string> => {
    try {
      const API_KEY = 'AIzaSyALwaJSsK0CT_CHkP6eT5rTR5EqTSHSIbs';
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `${getSystemPrompt()}\n\nContesto utente: ${JSON.stringify(context)}\n\nUtente: ${prompt}`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 1500,
            temperature: 0.7
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return getFallbackResponse();
    }
  }
};

// System prompt per Gemini
function getSystemPrompt(): string {
  return `Sei MedAgent, un assistente sanitario AI specializzato. REGOLE IMPORTANTI:

1. NON formulare mai diagnosi mediche specifiche
2. Mantieni sempre un approccio empatico e non allarmistico  
3. Per emergenze (dolore toracico, difficoltà respiratorie) raccomanda immediatamente il 118
4. Fornisci educazione sanitaria in linguaggio accessibile
5. Classifica l'urgenza come: low/medium/high
6. Suggerisci sempre 2-3 domande di follow-up pertinenti
7. Rispondi sempre in italiano
8. Includi disclaimer che non sostituisci il parere medico

Struttura le tue risposte così:
- Risposta empatica e informativa
- Classificazione urgenza
- Raccomandazioni pratiche
- 2-3 domande per approfondire`;
}

// Risposta di fallback in caso di errore API
function getFallbackResponse(): string {
  return `Grazie per avermi contattato. Al momento sto riscontrando difficoltà tecniche nel processare la tua richiesta. 

Per sintomi che ritieni urgenti, ti consiglio di:
- Contattare il 118 per emergenze
- Rivolgerti al tuo medico di base
- Visitare il pronto soccorso se necessario

Riprova tra qualche minuto. La tua salute è la priorità!

**Disclaimer**: Questo servizio non sostituisce il parere medico professionale.`;
}

export default api;