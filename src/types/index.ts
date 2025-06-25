// Tipi principali dell'applicazione MedAgent

export interface UserProfile {
  id?: string;
  sessionId: string;
  eta: AgeRange;
  genere: Gender;
  sintomoprincipale: string;
  durata: SymptomDuration;
  intensita: number;
  sintomiAssociati: string[];
  condizioniNote: string[];
  familiarita: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChatSession {
  id: string;
  sessionId: string;
  userProfileId?: string;
  startTime: Date;
  endTime?: Date;
  messageCount: number;
  currentUrgencyLevel: UrgencyLevel;
  status: SessionStatus;
  contextSummary: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  messageType: MessageType;
  content: string;
  urgencyLevel?: UrgencyLevel;
  nextQuestions?: string[];
  metadata?: Record<string, any>;
  timestamp: Date;
  isAI?: boolean;
}

export interface MedicalResult {
  userSummary: string;
  technicalSummary: string;
  urgencyLevel: UrgencyLevel;
  recommendations: string[];
  followUpSuggestions: string[];
  disclaimerShown: boolean;
}

// Enums e tipi di base
export type AgeRange = '<12' | '12-18' | '19-30' | '31-50' | '51-70' | '>70';
export type Gender = 'maschio' | 'femmina' | 'altro' | 'preferisco-non-dire';
export type SymptomDuration = '1-giorno' | '2-3-giorni' | 'piu-3-giorni' | 'cronico';
export type UrgencyLevel = 'low' | 'medium' | 'high';
export type SessionStatus = 'active' | 'completed' | 'abandoned';
export type MessageType = 'user' | 'ai' | 'system';

// Form validation schemas
export interface EvaluationFormData {
  eta: AgeRange;
  genere: Gender;
  sintomoprincipale: string;
  durata: SymptomDuration;
  intensita: number;
  sintomiAssociati: string[];
  condizioniNote: string[];
  familiarita: string;
  consensoInformato: boolean;
  consensoPrivacy: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthCheckResponse {
  status: string;
  database: string;
  aiService: string;
  timestamp: string;
}

// Costanti per l'applicazione
export const SYMPTOM_OPTIONS = [
  'febbre', 'mal di testa', 'dolore toracico', 'difficoltà respiratorie',
  'nausea', 'vomito', 'diarrea', 'stitichezza', 'dolore addominale',
  'eruzioni cutanee', 'prurito', 'stanchezza', 'insonnia', 'ansia',
  'depressione', 'vertigini', 'svenimenti', 'palpitazioni', 'tosse'
] as const;

export const MEDICAL_CONDITIONS = [
  'asma', 'diabete', 'ipertensione', 'ipotiroidismo', 'artrite',
  'allergie', 'emicrania', 'ansia', 'depressione', 'nessuna'
] as const;

export const URGENCY_COLORS = {
  low: 'text-green-600 bg-green-100',
  medium: 'text-yellow-600 bg-yellow-100', 
  high: 'text-red-600 bg-red-100'
} as const;

export const EMERGENCY_KEYWORDS = [
  'dolore toracico', 'difficoltà respiratorie', 'perdita coscienza',
  'svenimento', 'sangue', 'emorragia', 'incidente', 'trauma'
] as const;