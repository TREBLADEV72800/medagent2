import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Heart, Shield, Users, CheckCircle, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t('home.features.adaptive_intelligence.title'),
      description: t('home.features.adaptive_intelligence.description'),
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Heart,
      title: t('home.features.empathetic_approach.title'),
      description: t('home.features.empathetic_approach.description'),
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Shield,
      title: t('home.features.guaranteed_privacy.title'),
      description: t('home.features.guaranteed_privacy.description'),
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Users,
      title: t('home.features.dual_output.title'),
      description: t('home.features.dual_output.description'),
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const benefits = t('home.benefits.list', { returnObjects: true }) as string[];

  const testimonials = [
    {
      name: t('home.testimonials.dr_maria.name'),
      role: t('home.testimonials.dr_maria.role'),
      content: t('home.testimonials.dr_maria.content'),
      rating: 5
    },
    {
      name: t('home.testimonials.giuseppe.name'),
      role: t('home.testimonials.giuseppe.role'),
      content: t('home.testimonials.giuseppe.content'),
      rating: 5
    },
    {
      name: t('home.testimonials.prof_laura.name'),
      role: t('home.testimonials.prof_laura.role'),
      content: t('home.testimonials.prof_laura.content'),
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
                {t('home.hero.title')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
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
                {t('home.hero.cta_primary')}
              </Button>
              
              <Button 
                as={Link} 
                to="/about" 
                variant="outline" 
                size="xl"
                className="min-w-64"
              >
                {t('home.hero.cta_secondary')}
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
                <span>Medical Disclaimer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Ethical & Safe AI</span>
              </div>
            </div>

            {/* Powered by bolt.new */}
            <div className="mt-8">
              <p className="text-sm text-gray-400">
                {t('common.powered_by')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
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
                {t('home.benefits.title')}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t('home.benefits.subtitle')}
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
                  Explore All Features
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card glassmorphism className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Active Session</span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>MEDAGENTbyTREBLA:</strong> Hello! I'm here to help you better understand your symptoms. 
                      Can you describe how you're feeling today?
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 ml-8">
                    <p className="text-sm text-gray-700">
                      <strong>You:</strong> I've had a headache for two days and some fever...
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>MEDAGENTbyTREBLA:</strong> I understand your concern. To help you better, 
                      can you tell me the intensity of the headache from 1 to 10?
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
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.testimonials.subtitle')}
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
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('home.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              to="/valutazione" 
              variant="secondary"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              {t('home.cta.primary')}
            </Button>
            
            <Button 
              as={Link} 
              to="/about" 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              {t('home.cta.secondary')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;