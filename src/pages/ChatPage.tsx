import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { ChatMessage, UrgencyLevel } from '../types';
import { chatAPI, geminiAPI } from '../services/api';
import { useSession, useChatHistory } from '../hooks/useLocalStorage';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUrgency, setCurrentUrgency] = useState<UrgencyLevel>('low');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { sessionId, userProfile } = useSession();
  const { addMessage } = useChatHistory();

  // Redirect se non c'è profilo utente
  useEffect(() => {
    if (!userProfile || !sessionId) {
      navigate('/valutazione');
      return;
    }
  }, [userProfile, sessionId, navigate]);

  // Messaggio di benvenuto iniziale
  useEffect(() => {
    if (sessionId && userProfile && messages.length === 0) {
      sendWelcomeMessage();
    }
  }, [sessionId, userProfile]);

  // Auto-scroll ai nuovi messaggi
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendWelcomeMessage = async () => {
    const welcomeMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sessionId: sessionId!,
      messageType: 'ai',
      isAI: true,
      content: `Ciao! Sono MedAgent, il tuo assistente sanitario personale. 

Ho visto che hai menzionato "${userProfile.sintomoprincipale}" come sintomo principale. Sono qui per aiutarti a capire meglio la situazione e orientarti verso le scelte più appropriate.

Prima di iniziare, ricorda che:
🏥 Per emergenze, chiama subito il 118
⚕️ Le mie risposte sono educative, non sostituiscono il parere medico
🔒 La tua privacy è completamente protetta

Dimmi: come ti senti in questo momento? Puoi descrivermi meglio il tuo "${userProfile.sintomoprincipale}"?`,
      urgencyLevel: 'low',
      nextQuestions: [
        "Come descriveresti il dolore/disagio?",
        "È peggiorato nelle ultime ore?",
        "Hai altri sintomi associati?"
      ],
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
    addMessage(welcomeMessage);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !sessionId) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sessionId,
      messageType: 'user',
      isAI: false,
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    addMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Simula typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Prepara il contesto per l'AI
      const context = {
        userProfile,
        recentMessages: messages.slice(-6), // Ultimi 6 messaggi per contesto
        currentSymptom: userProfile.sintomoprincipale,
        duration: userProfile.durata,
        intensity: userProfile.intensita
      };

      // Chiamata all'API Gemini
      const aiResponse = await geminiAPI.generateResponse(inputMessage, context);
      
      // Analizza la risposta per l'urgenza
      const urgency = analyzeUrgency(inputMessage, aiResponse);
      
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sessionId,
        messageType: 'ai',
        isAI: true,
        content: aiResponse,
        urgencyLevel: urgency,
        nextQuestions: generateFollowUpQuestions(inputMessage, aiResponse),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      addMessage(aiMessage);
      setCurrentUrgency(urgency);

    } catch (error) {
      console.error('Errore nell\'invio del messaggio:', error);
      
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sessionId,
        messageType: 'ai',
        isAI: true,
        content: `Mi dispiace, sto riscontrando difficoltà tecniche. Per sintomi urgenti, ti consiglio di:

🚨 Contattare il 118 per emergenze
👨‍⚕️ Rivolgerti al tuo medico di base
🏥 Visitare il pronto soccorso se necessario

Riprova tra qualche minuto.`,
        urgencyLevel: 'medium',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const analyzeUrgency = (userInput: string, aiResponse: string): UrgencyLevel => {
    const highUrgencyKeywords = [
      'dolore toracico', 'difficoltà respiratorie', 'perdita coscienza', 
      'svenimento', 'sangue', 'emorragia', '118'
    ];
    
    const mediumUrgencyKeywords = [
      'febbre alta', 'vomito persistente', 'dolore severo', 
      'peggioramento', 'pronto soccorso'
    ];

    const combinedText = (userInput + ' ' + aiResponse).toLowerCase();

    if (highUrgencyKeywords.some(keyword => combinedText.includes(keyword))) {
      return 'high';
    } else if (mediumUrgencyKeywords.some(keyword => combinedText.includes(keyword))) {
      return 'medium';
    }
    
    return 'low';
  };

  const generateFollowUpQuestions = (userInput: string, aiResponse: string): string[] => {
    // Logica semplificata per generare domande di follow-up
    const questions = [
      "Puoi descrivere meglio l'intensità?",
      "Ci sono fattori che migliorano o peggiorano la situazione?",
      "Hai notato altri cambiamenti recenti?"
    ];

    return questions.slice(0, 2); // Restituisce le prime 2 domande
  };

  const handleQuickReply = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      sendMessage();
    }
  };

  const getUrgencyColor = (urgency: UrgencyLevel) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-red-600 bg-red-100 animate-pulse'
    };
    return colors[urgency];
  };

  const getUrgencyIcon = (urgency: UrgencyLevel) => {
    const icons = {
      low: CheckCircle,
      medium: Info,
      high: AlertCircle
    };
    return icons[urgency];
  };

  if (!userProfile || !sessionId) {
    return <LoadingSpinner size="lg" text="Caricamento sessione..." />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
            
            {/* Sidebar Profilo */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Profilo Sessione</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Età:</span>
                      <span className="ml-2 font-medium">{userProfile.eta}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">Sintomo:</span>
                      <span className="ml-2 font-medium capitalize">{userProfile.sintomoprincipale}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">Durata:</span>
                      <span className="ml-2 font-medium">{userProfile.durata}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">Intensità:</span>
                      <span className="ml-2 font-medium">{userProfile.intensita}/10</span>
                    </div>

                    {userProfile.sintomiAssociati?.length > 0 && (
                      <div>
                        <span className="text-gray-600">Altri sintomi:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {userProfile.sintomiAssociati.map((symptom, index) => (
                            <Badge key={index} size="sm" className="capitalize">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Indicatore Urgenza */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Livello urgenza:</span>
                      <Badge variant={currentUrgency} className="flex items-center space-x-1">
                        {React.createElement(getUrgencyIcon(currentUrgency), { className: 'h-3 w-3' })}
                        <span className="capitalize">{currentUrgency}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Azioni */}
                  <div className="mt-6 space-y-2">
                    <Button 
                      onClick={() => navigate('/risultato')} 
                      size="sm" 
                      fullWidth
                      variant="outline"
                    >
                      Vedi Risultati
                    </Button>
                    <Button 
                      onClick={() => navigate('/valutazione')} 
                      size="sm" 
                      fullWidth
                      variant="ghost"
                    >
                      Nuova Valutazione
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Area Chat Principale */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col">
                
                {/* Header Chat */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900">MedAgent</h2>
                        <p className="text-sm text-gray-600">Assistente Sanitario AI</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Online</span>
                    </div>
                  </div>
                </div>

                {/* Messaggi */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-3xl ${message.isAI ? '' : 'flex-row-reverse space-x-reverse'}`}>
                        
                        {/* Avatar */}
                        <div className={`p-2 rounded-xl flex-shrink-0 ${
                          message.isAI 
                            ? 'bg-gradient-to-r from-blue-500 to-green-500' 
                            : 'bg-gray-600'
                        }`}>
                          {message.isAI ? (
                            <Bot className="h-4 w-4 text-white" />
                          ) : (
                            <User className="h-4 w-4 text-white" />
                          )}
                        </div>

                        {/* Messaggio */}
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.isAI 
                            ? 'bg-white border border-gray-200' 
                            : 'bg-blue-600 text-white'
                        }`}>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          
                          {/* Timestamp */}
                          <div className={`flex items-center mt-2 text-xs ${
                            message.isAI ? 'text-gray-500' : 'text-blue-200'
                          }`}>
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(message.timestamp).toLocaleTimeString('it-IT', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>

                          {/* Domande Quick Reply */}
                          {message.isAI && message.nextQuestions && message.nextQuestions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs text-gray-600 font-medium">Suggerimenti:</p>
                              {message.nextQuestions.map((question, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleQuickReply(question)}
                                  className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  {question}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Scrivi il tuo messaggio... (Ctrl+Invio per inviare)"
                        className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        disabled={isTyping}
                      />
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      icon={Send}
                      className="px-4 py-3"
                    >
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    ⚠️ Le risposte sono educative e non sostituiscono il parere medico professionale
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;