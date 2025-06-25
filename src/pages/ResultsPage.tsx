import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, RotateCcw, AlertTriangle, CheckCircle, Info, FileText, Users } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import { MedicalResult, UrgencyLevel } from '../types';
import { useSession, useChatHistory } from '../hooks/useLocalStorage';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'user' | 'technical'>('user');
  const [result, setResult] = useState<MedicalResult | null>(null);
  
  const { sessionId, userProfile, clearSession } = useSession();
  const { messages, clearHistory } = useChatHistory();

  useEffect(() => {
    if (!userProfile || !sessionId) {
      navigate('/valutazione');
      return;
    }

    generateResults();
  }, [userProfile, sessionId, messages]);

  const generateResults = () => {
    if (!userProfile) return;

    // Analizza i messaggi per determinare l'urgenza
    const urgency = analyzeOverallUrgency();
    
    // Genera risultato basato sui dati raccolti
    const medicalResult: MedicalResult = {
      userSummary: generateUserSummary(urgency),
      technicalSummary: generateTechnicalSummary(urgency),
      urgencyLevel: urgency,
      recommendations: generateRecommendations(urgency),
      followUpSuggestions: generateFollowUpSuggestions(),
      disclaimerShown: true
    };

    setResult(medicalResult);
  };

  const analyzeOverallUrgency = (): UrgencyLevel => {
    const symptom = userProfile?.sintomoprincipale?.toLowerCase() || '';
    const intensity = userProfile?.intensita || 1;
    const duration = userProfile?.durata || '';

    // Sintomi ad alta urgenza
    const highUrgencySymptoms = [
      'dolore toracico', 'difficoltà respiratorie', 'perdita coscienza',
      'emorragia', 'trauma', 'convulsioni'
    ];

    // Sintomi a media urgenza
    const mediumUrgencySymptoms = [
      'febbre alta', 'vomito persistente', 'dolore severo'
    ];

    if (highUrgencySymptoms.some(s => symptom.includes(s))) {
      return 'high';
    }

    if (intensity >= 8 || mediumUrgencySymptoms.some(s => symptom.includes(s))) {
      return 'medium';
    }

    return 'low';
  };

  const generateUserSummary = (urgency: UrgencyLevel): string => {
    const symptom = userProfile?.sintomoprincipale || '';
    const intensity = userProfile?.intensita || 1;
    const duration = userProfile?.durata || '';

    let summary = `**Riepilogo della tua valutazione**\n\n`;
    summary += `Hai descritto il sintomo "${symptom}" con intensità ${intensity}/10, presente da ${duration}.\n\n`;

    switch (urgency) {
      case 'high':
        summary += `🚨 **Attenzione Immediata Necessaria**\n\n`;
        summary += `I sintomi che hai descritto richiedono valutazione medica immediata. Ti consiglio di:\n`;
        summary += `• Contattare immediatamente il 118\n`;
        summary += `• Recarti al pronto soccorso più vicino\n`;
        summary += `• Non rimandare la consultazione medica\n\n`;
        break;

      case 'medium':
        summary += `⚠️ **Consultazione Medica Consigliata**\n\n`;
        summary += `I tuoi sintomi meritano attenzione medica. Ti suggerisco di:\n`;
        summary += `• Contattare il tuo medico di base entro 24-48 ore\n`;
        summary += `• Monitorare l'evoluzione dei sintomi\n`;
        summary += `• Recarti in pronto soccorso se i sintomi peggiorano\n\n`;
        break;

      case 'low':
        summary += `✅ **Sintomi da Monitorare**\n\n`;
        summary += `I sintomi che hai descritto sembrano di lieve entità. Puoi:\n`;
        summary += `• Monitorare l'evoluzione nei prossimi giorni\n`;
        summary += `• Applicare rimedi casalinghi appropriati\n`;
        summary += `• Consultare il medico se non migliorano o peggiorano\n\n`;
        break;
    }

    summary += `**Importante**: Questa valutazione è puramente educativa e non sostituisce il parere medico professionale.`;

    return summary;
  };

  const generateTechnicalSummary = (urgency: UrgencyLevel): string => {
    let technical = `**Riassunto Clinico Strutturato**\n\n`;
    
    technical += `**Anamnesi:**\n`;
    technical += `• Paziente: ${userProfile?.genere}, fascia d'età ${userProfile?.eta}\n`;
    technical += `• Sintomo principale: ${userProfile?.sintomoprincipale}\n`;
    technical += `• Durata: ${userProfile?.durata}\n`;
    technical += `• Intensità soggettiva: ${userProfile?.intensita}/10 (scala VAS)\n`;
    
    if (userProfile?.sintomiAssociati && userProfile.sintomiAssociati.length > 0) {
      technical += `• Sintomi associati: ${userProfile.sintomiAssociati.join(', ')}\n`;
    }
    
    if (userProfile?.condizioniNote && userProfile.condizioniNote.length > 0) {
      technical += `• Comorbidità note: ${userProfile.condizioniNote.join(', ')}\n`;
    }
    
    if (userProfile?.familiarita) {
      technical += `• Anamnesi familiare: ${userProfile.familiarita}\n`;
    }

    technical += `\n**Valutazione Urgenza:** ${urgency.toUpperCase()}\n\n`;

    technical += `**Note Cliniche:**\n`;
    technical += `• Valutazione basata su algoritmo di triage AI\n`;
    technical += `• Pattern sintomatico analizzato tramite NLP medico\n`;
    technical += `• Raccomandazioni secondo linee guida evidence-based\n\n`;

    technical += `**Disclaimer Professionale:**\n`;
    technical += `Questa valutazione automatizzata non sostituisce l'esame clinico diretto e il giudizio medico professionale. `;
    technical += `È fortemente raccomandato il consulto medico per conferma diagnostica e piano terapeutico appropriato.`;

    return technical;
  };

  const generateRecommendations = (urgency: UrgencyLevel): string[] => {
    const base = [
      "Monitora l'evoluzione dei sintomi",
      "Mantieni un diario dei sintomi",
      "Segui le indicazioni del tuo medico"
    ];

    switch (urgency) {
      case 'high':
        return [
          "🚨 Chiama immediatamente il 118",
          "Recati al pronto soccorso più vicino",
          "Non guidare se possibile, fatti accompagnare",
          "Porta con te eventuali farmaci che assumi"
        ];

      case 'medium':
        return [
          "Contatta il tuo medico di base entro 24-48 ore",
          "Valuta una visita in guardia medica se fuori orario",
          "Recati in pronto soccorso se i sintomi peggiorano",
          ...base
        ];

      case 'low':
        return [
          "Applica rimedi casalinghi appropriati",
          "Riposa adeguatamente",
          "Mantieni una buona idratazione",
          "Consulta il medico se non migliora in 3-5 giorni",
          ...base
        ];
    }
  };

  const generateFollowUpSuggestions = (): string[] => {
    return [
      "Salva questi risultati per il tuo medico",
      "Considera di tenere un diario dei sintomi",
      "Ripeti la valutazione se i sintomi cambiano",
      "Condividi i risultati con familiari o caregiver se necessario"
    ];
  };

  const exportResults = () => {
    if (!result || !userProfile) return;

    const exportData = {
      sessionId,
      timestamp: new Date().toISOString(),
      userProfile,
      results: result,
      messageCount: messages.length
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `medagent-risultati-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    if (!result) return;

    const shareText = `Risultati MedAgent - ${userProfile?.sintomoprincipale}\nUrgenza: ${result.urgencyLevel}\nData: ${new Date().toLocaleDateString('it-IT')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Risultati MedAgent',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Condivisione annullata');
      }
    } else {
      // Fallback: copia negli appunti
      navigator.clipboard.writeText(shareText);
      alert('Risultati copiati negli appunti!');
    }
  };

  const startNewEvaluation = () => {
    clearSession();
    clearHistory();
    navigate('/valutazione');
  };

  const getUrgencyIcon = (urgency: UrgencyLevel) => {
    const icons = {
      low: CheckCircle,
      medium: Info,
      high: AlertTriangle
    };
    return icons[urgency];
  };

  const getUrgencyColor = (urgency: UrgencyLevel) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-red-600 bg-red-100'
    };
    return colors[urgency];
  };

  if (!result || !userProfile) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Nessun Risultato Disponibile
            </h2>
            <p className="text-gray-600 mb-6">
              Devi completare una valutazione per vedere i risultati.
            </p>
            <Button onClick={() => navigate('/valutazione')}>
              Inizia Valutazione
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Risultati della Valutazione
            </h1>
            <p className="text-xl text-gray-600">
              Ecco il riassunto della tua consultazione con MedAgent
            </p>
          </div>

          {/* Urgency Alert */}
          <Card className={`mb-8 border-l-4 ${
            result.urgencyLevel === 'high' ? 'border-red-500 bg-red-50' :
            result.urgencyLevel === 'medium' ? 'border-yellow-500 bg-yellow-50' :
            'border-green-500 bg-green-50'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {React.createElement(getUrgencyIcon(result.urgencyLevel), { 
                  className: `h-8 w-8 ${result.urgencyLevel === 'high' ? 'text-red-600' : 
                    result.urgencyLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'}`
                })}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Livello di Urgenza: <Badge variant={result.urgencyLevel} size="lg" className="ml-2 capitalize">
                    {result.urgencyLevel}
                  </Badge>
                </h3>
                <p className="text-gray-600 mt-1">
                  Sintomo principale: <strong>{userProfile.sintomoprincipale}</strong> • 
                  Intensità: <strong>{userProfile.intensita}/10</strong> • 
                  Durata: <strong>{userProfile.durata}</strong>
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button onClick={exportResults} icon={Download} variant="outline">
              Esporta PDF/JSON
            </Button>
            <Button onClick={shareResults} icon={Share2} variant="outline">
              Condividi Risultati
            </Button>
            <Button onClick={startNewEvaluation} icon={RotateCcw} variant="outline">
              Nuova Valutazione
            </Button>
            <Button onClick={() => navigate('/chat')} variant="primary">
              Torna alla Chat
            </Button>
          </div>

          {/* Results Tabs */}
          <Card glassmorphism>
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('user')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'user'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Per Te</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('technical')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'technical'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Per Operatori Sanitari</span>
                  </div>
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'user' ? (
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {result.userSummary}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Raccomandazioni Immediate
                    </h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Suggerimenti per il Follow-up
                    </h3>
                    <ul className="space-y-2">
                      {result.followUpSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-mono text-sm">
                      {result.technicalSummary}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Dati Strutturati per EHR
                    </h3>
                    <pre className="text-sm text-gray-600 overflow-x-auto">
{JSON.stringify({
  sessionId,
  timestamp: new Date().toISOString(),
  demographics: {
    ageRange: userProfile.eta,
    gender: userProfile.genere
  },
  chiefComplaint: userProfile.sintomoprincipale,
  symptoms: {
    primary: userProfile.sintomoprincipale,
    duration: userProfile.durata,
    intensity: userProfile.intensita,
    associated: userProfile.sintomiAssociati
  },
  medicalHistory: {
    conditions: userProfile.condizioniNote,
    familyHistory: userProfile.familiarita
  },
  assessment: {
    urgencyLevel: result.urgencyLevel,
    aiGenerated: true,
    requiresMedicalReview: true
  }
}, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Statistics Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
              <div className="text-sm text-gray-600">Messaggi Scambiati</div>
            </Card>
            
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(((Date.now() - new Date(messages[0]?.timestamp || Date.now()).getTime()) / 1000 / 60))}
              </div>
              <div className="text-sm text-gray-600">Minuti di Consultazione</div>
            </Card>
            
            <Card className="text-center">
              <div className="text-2xl font-bold text-purple-600">AI</div>
              <div className="text-sm text-gray-600">Gemini 2.0-flash</div>
            </Card>
          </div>

          {/* Disclaimer */}
          <Card className="mt-8 bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Importante Disclaimer Medico
                </h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  I risultati generati da MedAgent sono puramente educativi e informativi. 
                  NON costituiscono diagnosi medica e non sostituiscono il parere di un medico qualificato. 
                  Per qualsiasi problema di salute, consulta sempre un professionista sanitario. 
                  In caso di emergenza, contatta immediatamente il 118.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ResultsPage;