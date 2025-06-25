import React, { useState } from 'react';
import { Book, Code, Shield, Zap, Users, Settings, ExternalLink, Copy, Check } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const DocsPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const sections = [
    {
      id: 'overview',
      title: 'Panoramica',
      icon: Book,
      content: `
# MedAgent - Documentazione Tecnica

MedAgent è un assistente sanitario AI-powered che fornisce valutazioni sintomatiche intelligenti attraverso conversazioni naturali. Costruito con React, TypeScript e Gemini 2.0-flash.

## Caratteristiche Principali

- **AI Conversazionale**: Powered by Gemini 2.0-flash con prompt engineering medico
- **Privacy by Design**: GDPR compliant con crittografia end-to-end
- **Responsive Design**: Ottimizzato per desktop, tablet e mobile
- **Accessibilità**: WCAG 2.1 AA compliant
- **Multilingua**: Supporto per italiano (altre lingue in sviluppo)
      `
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: Code,
      content: `
# API Endpoints

## Session Management

### POST /api/chat/session
Crea una nuova sessione di chat.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "uuid",
    "sessionId": "uuid",
    "startTime": "2025-01-27T10:00:00Z",
    "status": "active"
  }
}
\`\`\`

### GET /api/chat/session/{id}
Recupera una sessione esistente.

### POST /api/chat/close/{id}
Chiude una sessione attiva.

## User Profile

### POST /api/chat/profile/{sessionId}
Crea o aggiorna il profilo utente.

**Request Body:**
\`\`\`json
{
  "eta": "19-30",
  "genere": "maschio",
  "sintomoprincipale": "mal di testa",
  "durata": "2-3-giorni",
  "intensita": 7,
  "sintomiAssociati": ["nausea", "stanchezza"],
  "condizioniNote": ["emicrania"],
  "familiarita": "emicrania in famiglia"
}
\`\`\`

## Chat Management

### POST /api/chat/message
Invia un messaggio e ricevi risposta AI.

**Request Body:**
\`\`\`json
{
  "session_id": "uuid",
  "message": "Ho mal di testa da due giorni"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "Risposta AI...",
    "urgencyLevel": "medium",
    "nextQuestions": ["Domanda 1", "Domanda 2"],
    "timestamp": "2025-01-27T10:00:00Z"
  }
}
\`\`\`
      `
    },
    {
      id: 'security',
      title: 'Sicurezza & Privacy',
      icon: Shield,
      content: `
# Sicurezza e Privacy

## GDPR Compliance

MedAgent è completamente conforme al GDPR europeo:

- **Pseudonimizzazione**: Tutti i dati sono pseudonimizzati con UUID temporanei
- **Crittografia**: AES-256 per dati a riposo, TLS 1.3 per dati in transito
- **Retention**: Cancellazione automatica dopo 30 giorni
- **Consenso**: Consenso esplicito per ogni trattamento
- **Diritti**: Accesso, rettifica, cancellazione, portabilità

## Sicurezza Tecnica

### API Key Management
\`\`\`javascript
// ❌ MAI fare questo
const API_KEY = "AIzaSyALwaJSsK0CT_CHkP6eT5rTR5EqTSHSIbs";

// ✅ Usa variabili d'ambiente
const API_KEY = process.env.GEMINI_API_KEY;
\`\`\`

### Headers di Sicurezza
\`\`\`javascript
{
  "Content-Security-Policy": "default-src 'self'",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
\`\`\`

## Audit e Monitoring

- Logging strutturato per compliance
- Monitoring real-time delle performance
- Alert automatici per anomalie di sicurezza
- Backup crittografati con rotazione automatica
      `
    },
    {
      id: 'integration',
      title: 'Integrazione',
      icon: Zap,
      content: `
# Guida all'Integrazione

## Setup Locale

### Prerequisiti
- Node.js 18+
- npm o yarn
- API Key Gemini

### Installazione
\`\`\`bash
# Clone del repository
git clone https://github.com/medagent/medagent.git
cd medagent

# Installazione dipendenze
npm install

# Setup environment
cp .env.example .env
# Modifica .env con le tue credenziali

# Avvio sviluppo
npm run dev
\`\`\`

### Variabili d'Ambiente
\`\`\`env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_MONGODB_URI=mongodb://localhost:27017/medagent
VITE_APP_ENV=development
VITE_API_BASE_URL=http://localhost:3000/api
\`\`\`

## Integrazione con Sistemi Esistenti

### EHR Integration
\`\`\`javascript
// Esporta dati per EHR
const exportToEHR = async (sessionId) => {
  const session = await getSessionSummary(sessionId);
  return {
    patientId: session.pseudonymizedId,
    chiefComplaint: session.symptoms.primary,
    assessment: session.aiAssessment,
    urgencyLevel: session.urgencyLevel,
    timestamp: session.createdAt
  };
};
\`\`\`

### Webhook Integration
\`\`\`javascript
// Ricevi notifiche per urgenze alte
app.post('/webhook/high-urgency', (req, res) => {
  const { sessionId, urgencyLevel, symptoms } = req.body;
  
  if (urgencyLevel === 'high') {
    // Notifica team medico
    notifyMedicalTeam({
      sessionId,
      symptoms,
      timestamp: new Date()
    });
  }
  
  res.status(200).send('OK');
});
\`\`\`
      `
    },
    {
      id: 'deployment',
      title: 'Deployment',
      icon: Settings,
      content: `
# Deployment e Scalabilità

## Docker Deployment

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'
services:
  medagent:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
      - MONGODB_URI=mongodb://mongo:27017/medagent
    depends_on:
      - mongo
      
  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
      
volumes:
  mongo_data:
\`\`\`

## Kubernetes Deployment

### Deployment YAML
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: medagent
spec:
  replicas: 3
  selector:
    matchLabels:
      app: medagent
  template:
    metadata:
      labels:
        app: medagent
    spec:
      containers:
      - name: medagent
        image: medagent:latest
        ports:
        - containerPort: 3000
        env:
        - name: GEMINI_API_KEY
          valueFrom:
            secretKeyRef:
              name: medagent-secrets
              key: gemini-api-key
\`\`\`

## Performance Optimization

### Caching Strategy
- Redis per sessioni attive
- CDN per assets statici
- Service Worker per offline capability

### Monitoring
- Prometheus metrics
- Grafana dashboards
- ELK stack per logging
      `
    },
    {
      id: 'contributing',
      title: 'Contribuire',
      icon: Users,
      content: `
# Come Contribuire

## Linee Guida per Sviluppatori

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Conventional Commits
- Test coverage > 80%

### Workflow
1. Fork del repository
2. Crea feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit: \`git commit -m 'feat: add amazing feature'\`
4. Push: \`git push origin feature/amazing-feature\`
5. Apri Pull Request

### Testing
\`\`\`bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
\`\`\`

## Contributi Medici

### Validazione Clinica
- Review di prompt medici
- Validazione algoritmi di triage
- Testing con casi clinici reali

### Linee Guida
- Seguire evidence-based medicine
- Riferimenti a linee guida internazionali
- Peer review obbligatoria

## Community

- **Discord**: [discord.gg/medagent](https://discord.gg/medagent)
- **GitHub**: [github.com/medagent/medagent](https://github.com/medagent/medagent)
- **Email**: developers@medagent.ai

### Riconoscimenti
Tutti i contributori sono riconosciuti nel file CONTRIBUTORS.md e nella sezione About dell'applicazione.
      `
    }
  ];

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderContent = (content: string, sectionId: string) => {
    const lines = content.trim().split('\n');
    let inCodeBlock = false;
    let codeBlockContent = '';
    let codeBlockId = '';

    return lines.map((line, index) => {
      // Detect code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End of code block
          inCodeBlock = false;
          const blockId = `${sectionId}-code-${index}`;
          const result = (
            <div key={index} className="relative mb-4">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                  <span className="text-sm text-gray-300">Code</span>
                  <button
                    onClick={() => copyToClipboard(codeBlockContent, blockId)}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                  >
                    {copiedCode === blockId ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="text-xs">
                      {copiedCode === blockId ? 'Copiato!' : 'Copia'}
                    </span>
                  </button>
                </div>
                <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                  <code>{codeBlockContent}</code>
                </pre>
              </div>
            </div>
          );
          codeBlockContent = '';
          return result;
        } else {
          // Start of code block
          inCodeBlock = true;
          codeBlockId = `${sectionId}-code-${index}`;
          return null;
        }
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n';
        return null;
      }

      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-gray-900 mb-4 mt-6">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-900 mb-3 mt-4">
            {line.substring(4)}
          </h3>
        );
      }

      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 mb-1 text-gray-700">
            {line.substring(2)}
          </li>
        );
      }

      // Bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="mb-3 text-gray-700">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      }

      // Regular paragraphs
      if (line.trim()) {
        return (
          <p key={index} className="mb-3 text-gray-700 leading-relaxed">
            {line}
          </p>
        );
      }

      return <br key={index} />;
    });
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Documentazione
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tutto quello che devi sapere per integrare, personalizzare e contribuire a MedAgent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Sezioni</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <section.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </a>
                    ))}
                  </nav>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Link Utili</h4>
                    <div className="space-y-2">
                      <a
                        href="https://github.com/medagent/medagent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>GitHub Repository</span>
                      </a>
                      <a
                        href="https://discord.gg/medagent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Discord Community</span>
                      </a>
                      <a
                        href="mailto:developers@medagent.ai"
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Contatta il Team</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {sections.map((section) => (
                  <Card key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                          <section.icon className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {section.title}
                        </h2>
                      </div>
                      
                      <div className="prose max-w-none">
                        {renderContent(section.content, section.id)}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Start Card */}
              <Card className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Pronto per Iniziare?
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Prova MedAgent in azione o contribuisci al progetto open source.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => window.location.href = '/valutazione'}
                      variant="secondary"
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-50"
                    >
                      Prova MedAgent
                    </Button>
                    <Button
                      onClick={() => window.open('https://github.com/medagent/medagent', '_blank')}
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      Contribuisci su GitHub
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DocsPage;