import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, Users, Target, Lightbulb, Award, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. Alessandro Medici',
      role: 'Medical Director & AI Ethics',
      bio: 'Medico specialista in medicina interna con 15 anni di esperienza clinica. PhD in AI applicata alla medicina.',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Sofia Technologia',
      role: 'Lead AI Engineer',
      bio: 'Esperta in NLP e machine learning con focus su applicazioni medicali. Ex-Google, specializzata in LLM.',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Marco Privacy',
      role: 'Privacy & Compliance Officer',
      bio: 'Avvocato specializzato in GDPR e privacy sanitaria. Consulente per startup healthtech europee.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Empatia Digitale',
      description: 'Creiamo tecnologia che comprende e rispetta le emozioni umane, offrendo supporto compassionevole in momenti di vulnerabilità.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Privacy by Design',
      description: 'La protezione dei dati sanitari è integrata in ogni aspetto del nostro sistema, non aggiunta come ripensamento.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Brain,
      title: 'AI Responsabile',
      description: 'Utilizziamo l\'intelligenza artificiale in modo etico, trasparente e sempre sotto supervisione umana qualificata.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Accessibilità Universale',
      description: 'Progettiamo per tutti: anziani, giovani, persone con disabilità, migranti, famiglie con diversi livelli di alfabetizzazione digitale.',
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Ricerca e Sviluppo',
      description: 'Inizio del progetto con team multidisciplinare di medici, ingegneri AI e esperti di privacy.'
    },
    {
      year: '2024',
      title: 'Prototipo e Testing',
      description: 'Sviluppo del primo prototipo e testing con 500+ utenti in collaborazione con ASL lombarde.'
    },
    {
      year: '2025',
      title: 'Lancio Pubblico',
      description: 'Rilascio ufficiale di MedAgent con supporto per italiano e integrazione Gemini 2.0-flash.'
    },
    {
      year: 'Future',
      title: 'Espansione Europea',
      description: 'Pianificazione supporto multilingua e partnership con sistemi sanitari europei.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Chi Siamo
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Siamo un team di medici, ingegneri e ricercatori che crede nel potere della tecnologia 
              per <strong>democratizzare l'accesso all'orientamento sanitario</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                La Nostra Missione
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  In un mondo dove l'accesso alle cure mediche può essere complesso e costoso, 
                  MedAgent nasce per <strong>colmare il gap informativo</strong> tra cittadini e sistema sanitario.
                </p>
                <p>
                  Non sostituiamo i medici, ma li <strong>completiamo</strong>, offrendo strumenti 
                  di prima valutazione che aiutano le persone a comprendere quando e come cercare aiuto professionale.
                </p>
                <p>
                  La nostra visione è un futuro dove ogni persona, indipendentemente dal background 
                  socio-economico o dalla località geografica, ha accesso a <strong>orientamento sanitario intelligente, 
                  empatico e scientificamente fondato</strong>.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <Card glassmorphism className="p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                    <div className="text-sm text-gray-600">Consultazioni Completate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                    <div className="text-sm text-gray-600">Soddisfazione Utenti</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Disponibilità</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                    <div className="text-sm text-gray-600">Lingue Supportate</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              I Nostri Valori
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ogni linea di codice che scriviamo è guidata da principi etici solidi e dalla 
              convinzione che la tecnologia debba servire l'umanità.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} hover glassmorphism className="text-center group">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Il Nostro Team
            </h2>
            <p className="text-xl text-gray-600">
              Professionisti appassionati che uniscono expertise medica, competenze tecniche e visione etica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} hover className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Il Nostro Percorso
            </h2>
            <p className="text-xl text-gray-600">
              Dalla ricerca iniziale al prodotto che usi oggi: una timeline del nostro sviluppo.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-green-500"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <Card className={`w-full max-w-md ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`} hover>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {milestone.year.slice(-2)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </Card>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tecnologia All'Avanguardia
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relax">
                <p>
                  MedAgent utilizza <strong>Gemini 2.0-flash</strong>, il modello linguistico più avanzato 
                  di Google, specializzato per applicazioni mediche attraverso fine-tuning su dataset clinici validati.
                </p>
                <p>
                  La nostra architettura cloud-native garantisce <strong>scalabilità, sicurezza e performance</strong>, 
                  mentre algoritmi di machine learning analizzano pattern sintomatici per fornire 
                  valutazioni sempre più precise.
                </p>
                <p>
                  Ogni interazione è protetta da <strong>crittografia end-to-end</strong> e i dati sono 
                  processati secondo i più rigorosi standard GDPR europei.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">🤖 AI Conversazionale</h3>
                <p className="text-gray-600">Gemini 2.0-flash con prompt engineering medico specializzato</p>
              </Card>
              
              <Card className="p-6 border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">🔒 Privacy & Security</h3>
                <p className="text-gray-600">GDPR compliant, crittografia AES-256, pseudonimizzazione automatica</p>
              </Card>
              
              <Card className="p-6 border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">⚡ Performance</h3>
                <p className="text-gray-600">Risposta &lt; 2s, 99.9% uptime, CDN globale per bassa latenza</p>
              </Card>
              
              <Card className="p-6 border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">📱 Accessibilità</h3>
                <p className="text-gray-600">WCAG 2.1 AA, responsive design, supporto screen reader</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Unisciti alla Rivoluzione della Salute Digitale
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Prova MedAgent oggi stesso e scopri come l'intelligenza artificiale può supportare 
            il tuo benessere in modo sicuro, empatico e scientificamente fondato.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              to="/valutazione" 
              variant="secondary"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-50"
              icon={ArrowRight}
              iconPosition="right"
            >
              Inizia la Tua Prima Valutazione
            </Button>
            
            <Button 
              as={Link} 
              to="/docs" 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Esplora la Documentazione
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;