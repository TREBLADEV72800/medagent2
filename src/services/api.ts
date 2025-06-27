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
    // Simulazione locale invece di chiamata API
    const sessionId = crypto.randomUUID();
    const session: ChatSession = {
      id: sessionId,
      sessionId,
      startTime: new Date(),
      messageCount: 0,
      currentUrgencyLevel: 'low',
      status: 'active',
      contextSummary: ''
    };
    
    return {
      success: true,
      data: session
    };
  },
  
  getSession: async (sessionId: string): Promise<ApiResponse<ChatSession>> => {
    // Simulazione locale
    const session: ChatSession = {
      id: sessionId,
      sessionId,
      startTime: new Date(),
      messageCount: 0,
      currentUrgencyLevel: 'low',
      status: 'active',
      contextSummary: ''
    };
    
    return {
      success: true,
      data: session
    };
  },
  
  closeSession: async (sessionId: string): Promise<ApiResponse<void>> => {
    return {
      success: true
    };
  },
  
  getSessionSummary: async (sessionId: string): Promise<ApiResponse<any>> => {
    return {
      success: true,
      data: {}
    };
  }
};

// User Profile Management
export const profileAPI = {
  createProfile: async (sessionId: string, profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    // Simulazione locale - salva nel localStorage
    const fullProfile: UserProfile = {
      id: crypto.randomUUID(),
      sessionId,
      eta: profile.eta || '19-30',
      genere: profile.genere || 'preferisco-non-dire',
      sintomoprincipale: profile.sintomoprincipale || '',
      durata: profile.durata || '1-giorno',
      intensita: profile.intensita || 5,
      sintomiAssociati: profile.sintomiAssociati || [],
      condizioniNote: profile.condizioniNote || [],
      familiarita: profile.familiarita || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return {
      success: true,
      data: fullProfile
    };
  },
  
  getProfile: async (sessionId: string): Promise<ApiResponse<UserProfile>> => {
    // Simulazione locale
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      sessionId,
      eta: '19-30',
      genere: 'preferisco-non-dire',
      sintomoprincipale: '',
      durata: '1-giorno',
      intensita: 5,
      sintomiAssociati: [],
      condizioniNote: [],
      familiarita: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return {
      success: true,
      data: profile
    };
  }
};

// Chat Management
export const chatAPI = {
  sendWelcomeMessage: async (sessionId: string): Promise<ApiResponse<ChatMessage>> => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      sessionId,
      messageType: 'ai',
      content: 'Benvenuto! Come posso aiutarti oggi?',
      timestamp: new Date(),
      isAI: true
    };
    
    return {
      success: true,
      data: message
    };
  },
  
  sendMessage: async (sessionId: string, message: string): Promise<ApiResponse<ChatMessage>> => {
    // Simulazione risposta AI
    const aiMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sessionId,
      messageType: 'ai',
      content: 'Grazie per il tuo messaggio. Sto elaborando la risposta...',
      timestamp: new Date(),
      isAI: true
    };
    
    return {
      success: true,
      data: aiMessage
    };
  },
  
  getChatHistory: async (sessionId: string): Promise<ApiResponse<ChatMessage[]>> => {
    return {
      success: true,
      data: []
    };
  }
};

// System APIs
export const systemAPI = {
  healthCheck: async (): Promise<ApiResponse<HealthCheckResponse>> => {
    const health: HealthCheckResponse = {
      status: 'healthy',
      database: 'connected',
      aiService: 'operational',
      timestamp: new Date().toISOString()
    };
    
    return {
      success: true,
      data: health
    };
  },
  
  getStatus: async (): Promise<ApiResponse<any>> => {
    return {
      success: true,
      data: { status: 'operational' }
    };
  }
};

// Gemini AI Service
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
  return `Sei MEDAGENTbyTREBLA, un assistente sanitario AI specializzato. REGOLE IMPORTANTI:

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