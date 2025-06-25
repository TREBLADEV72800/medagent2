import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Heart, Shield, Users, CheckCircle, Star } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Intelligenza Adattiva',
      description: 'AI conversazionale che si adatta al tuo profilo e sintomi specifici per un supporto personalizzato.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'Approccio Empatico',
      description: 'Interazioni umane e comprensive che non giudicano, ma guidano con sensibilità verso la soluzione.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Privacy Garantita',
      description: 'GDPR compliant con crittografia end-to-end. I tuoi dati sanitari sono protetti e mai condivisi.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Output Duale',
      description: 'Risposte sia per te che per operatori sanitari, con linguaggio appropriato per ogni destinatario.',
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const benefits = [
    'Valutazione sintomi in tempo reale',
    'Raccomandazioni personalizzate',
    'Supporto multilingua',
    'Interfaccia intuitiva e accessibile',
    'Disclaimer medico trasparente',
    'Cronologia consultazioni sicura'
  ];

  const testimonials = [
    {
      name: 'Dr. Maria Rossi',
      role: 'Medico di Base, Milano',
      content: 'MedAgent aiuta i miei pazienti a comprendere meglio i loro sintomi prima della visita, rendendo le consultazioni più efficaci.',
      rating: 5
    },
    {
      name: 'Giuseppe Bianchi',
      role: 'Genitore',
      content: 'Finalmente un assistente che non mi fa entrare nel panico quando mio figlio ha qualche sintomo. Molto utile per orientarsi.',
      rating: 5
    },
    {
      name: 'Prof. Laura Verdi',
      role: 'Università Statale',
      content: 'Uso MedAgent per insegnare ai miei studenti di medicina come strutturare un approccio diagnostico centrato sul paziente.',
      rating: 5
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Un assistente digitale
              </span>
              <br />
              <span className="text-gray-900">
                per capire meglio
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                come stai
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              MedAgent ti guida attraverso <strong>valutazioni sintomatiche intelligenti</strong>, 
              fornendo supporto empatico e orientamento medico responsabile con 
              <strong> IA conversazionale avanzata</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                as={Link} 
                to="/valutazione" 
                size="xl"
                icon={ArrowRight}
                iconPosition="right"
                className="min-w-64"
              >
                Inizia la Valutazione Gratuita
              </Button>
              
              <Button 
                as={Link} 
                to="/about" 
                variant="outline" 
                size="xl"
                className="min-w-64"
              >
                Scopri Come Funziona
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span>Disclaimer Medico</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>AI Etica e Sicura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perché Scegliere MedAgent
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un approccio rivoluzionario alla valutazione sintomatica che unisce intelligenza artificiale, 
              empatia umana e rigore scientifico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover glassmorphism className="text-center group">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tutto Quello Che Ti Serve
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                MedAgent non è solo un chatbot medico, ma un ecosistema completo 
                per la gestione intelligente della tua salute digitale.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button as={Link} to="/docs" variant="outline" size="lg">
                  Esplora Tutte le Funzionalità
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card glassmorphism className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Sessione Attiva</span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>MedAgent:</strong> Ciao! Sono qui per aiutarti a comprendere meglio i tuoi sintomi. 
                      Puoi descrivermi come ti senti oggi?
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 ml-8">
                    <p className="text-sm text-gray-700">
                      <strong>Tu:</strong> Ho mal di testa da due giorni e un po' di febbre...
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>MedAgent:</strong> Capisco la tua preoccupazione. Per aiutarti meglio, 
                      puoi dirmi l'intensità del mal di testa da 1 a 10?
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cosa Dicono i Professionisti
            </h2>
            <p className="text-xl text-gray-600">
              MedAgent è già utilizzato da medici, educatori e famiglie in tutta Italia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} hover className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div>
                  <cite className="font-semibold text-gray-900 not-italic">
                    {testimonial.name}
                  </cite>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto a Prenderti Cura della Tua Salute?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Inizia subito la tua prima valutazione gratuita con MedAgent. 
            Nessuna registrazione richiesta, massima privacy garantita.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              to="/valutazione" 
              variant="secondary"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              Inizia Ora - È Gratuito
            </Button>
            
            <Button 
              as={Link} 
              to="/about" 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Scopri di Più
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;